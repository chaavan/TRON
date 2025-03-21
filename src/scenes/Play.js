class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        // Pause music
        this.sound.stopByKey("BGMusic");

        //Background
        let backgroundIMG = this.add.image(width/2, height/2, 'background')
        backgroundIMG.setOrigin(0.5);
        backgroundIMG.setScale(1.2)
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.2).setOrigin(0.5);

        // Adjust world boundries to image boundries
        this.physics.world.setBounds(82, 125, 855, 350)

        this.countdownActive = true

        this.collisionOccurred = false
        
        new Countdown(this, this.scale.width / 2, this.scale.height / 2, () =>{
            this.countdownActive = false
            this.startTime = Date.now();
        })

        // Check if background music is already playing.
        let bgMusic = this.sound.get("IGMusic");
        if (!bgMusic) {
            this.backgroundMusic = this.sound.add("IGMusic", {
                loop: true,
                volume: 0.3
            });
            this.backgroundMusic.play();
        } else if (!bgMusic.isPlaying) {
            bgMusic.play();
        }

        let gameMode = this.registry.get("gameMode");
        this.add.rectangle(this.game.config.width - 120, 35, 250, 50, 0x000000, 0.7)
        this.elapsedText = this.add.bitmapText(this.game.config.width - 200, 20, 'content', 'Time: 0:00', 32).setOrigin(0, 0);

        
        //Add bikes
        this.bike = new Bike(this, width - 100, height / 2, 'bike-idle', 0, 'left', this.input.keyboard.createCursorKeys()).setAngle(270);

        if (gameMode === "AI") {
            // AI-controlled bike
            this.bike2 = new BikeAI(this, 100, this.scale.height / 2, 'bike-idle', 0, 'right').setAngle(90);
        } else {
            // Player-controlled bike
            this.bike2 = new Bike(this, 100, this.scale.height / 2, 'bike-idle', 0, 'right', this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                right: Phaser.Input.Keyboard.KeyCodes.D
            })).setAngle(90);
        }
        this.bike2.setTint(0xff0000)

        // Trail Management
        // Physics Groups for Trails
        this.trailGroup1 = this.physics.add.group();
        this.trailGroup2 = this.physics.add.group();

        this.bike.body.onWorldBounds = true;

        // Prevent instant self-collision
        this.ignoreSelfCollisionFrames = 15;
        this.framesSinceStart = 0;
 
        // **Collision Detection (Disabled Initially)**
        this.physics.add.collider(this.bike, this.trailGroup2, () => {
            this.handleCollision("Player 2 Wins!", this.bike);
        }, null, this);

        this.physics.add.collider(this.bike2, this.trailGroup1, () => {
            this.handleCollision("Player 1 Wins!", this.bike2);
        }, null, this);

        this.physics.add.collider(this.bike, this.trailGroup1, () => {
            this.handleCollision("Player 2 Wins! (P1 crashed)", this.bike);
        }, null, this);

        this.physics.add.collider(this.bike2, this.trailGroup2, () => {
            this.handleCollision("Player 1 Wins! (P2 crashed)", this.bike2);
        }, null, this);

        // **Detect Direct Bike Collision**
        this.physics.add.collider(this.bike, this.bike2, () => {
            this.handleCollision("Both Players Crashed!", this.bike, this.bike2);
        }, null, this);

        // Game over flag
        this.gameOver = false;

        // debug key listener (assigned to C key)
        this.input.keyboard.on('keydown-C', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this) 
        
        this.powerUpTypes = ["speedBoost", "trailInvincibility", "trailElongation", "opponentTrailDisable"];

        // Power-up group
        this.powerUpGroup = this.physics.add.group();

        // Spawn power-ups every 10 seconds
        this.time.addEvent({
            delay: 10000,
            callback: this.spawnPowerUp,
            callbackScope: this,
            loop: true
        });

        // Handle power-up collection
        this.physics.add.overlap(this.bike, this.powerUpGroup, (bike, powerUp) => {
            this.sound.play("collect")
            powerUp.applyEffect(this.bike);
        });

        this.physics.add.overlap(this.bike2, this.powerUpGroup, (bike, powerUp) => {
            this.sound.play("collect")
            powerUp.applyEffect(this.bike2);
        });
    }

    update(time, delta){
        if (this.gameOver) return;

        this.bike.update(time, delta);
        this.bike2.update(time, delta);

        if (!this.countdownActive && this.startTime) {
            let elapsed = Date.now() - this.startTime;
            let totalSeconds = Math.floor(elapsed / 1000);
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let formattedTime = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
            this.elapsedText.setText("Time: " + formattedTime);
        }

        this.addTrailSegment(this.trailGroup1, this.bike.x, this.bike.y); // Blue Trail (Player 1)
        this.addTrailSegment(this.trailGroup2, this.bike2.x, this.bike2.y, 0xff0303); // Green Trail (Player 2)

        // Delay self-collision checks
        this.framesSinceStart++;
    }

    spawnPowerUp() {
        // Random coordinates generation
        let x = Phaser.Math.Between(102, 82 + 835);
        let y = Phaser.Math.Between(145, 125 + 330);
        let type = Phaser.Utils.Array.GetRandom(this.powerUpTypes);
    
        let powerUp = new PowerUp(this, x, y, type);
        // console.log(type)
        this.powerUpGroup.add(powerUp);
    }

    handleCollision(message, player, opponent = null) {
        if (this.collisionOccurred || this.countdownActive || player.invincible ) return; // Ignore if collision already happened
        this.collisionOccurred = true; // Mark collision as occurred

        player.bikeFSM.transition("explode")
        
        if (opponent) {
            opponent.bikeFSM.transition("explode");
        }

        this.sound.play("explosion")
        this.time.delayedCall(1000, () => {
            this.endGame(message);
        });
    }

    addTrailSegment(trailGroup, x, y, color = null) {
        let trailSegment = this.add.image(x, y, "trail")
        if(color != null){
            trailSegment.setTint(color)
        }

        // Hide the new trail segments  
        trailSegment.setAlpha(0);

        this.physics.add.existing(trailSegment);
        trailSegment.body.setImmovable(true);
        
        // Disable collision initially
        trailSegment.body.checkCollision.none = true;
    
        // Enable collision after 200ms
        this.time.delayedCall(350, () => {
            if (!this.countdownActive && trailSegment.body) {
                trailSegment.body.checkCollision.none = false;
                trailSegment.setAlpha(1);
            }
        });
    
        // Add to trail group
        trailGroup.add(trailSegment);
    
        // Remove older trail segments for performance
        if (trailGroup.getChildren().length > 100) {
            let oldestSegment = trailGroup.getFirstAlive();
            if (oldestSegment) {
                oldestSegment.destroy();
            }
        }
    }
    
    endGame(message) {
        this.cameras.main.flash(500); // Quick white flash effect

        this.gameOver = true;
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.8).setOrigin(0.5);
        this.add.bitmapText(this.game.config.width / 2, this.game.config.height / 2, 'Tron',  message, 32).setOrigin(0.5);

        let duration = Date.now() - this.startTime;

        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1000); // Fade out before restarting
            this.time.delayedCall(1000, () => {
                this.scene.start("gameOverScene", {duration: duration});
            });
        });
    }
}