class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Stop all music
        // this.sound.stopAll()
        
        //Background
        this.add.image(400, 215, 'background').setScale(1.6)

        this.countdownActive = true

        this.collisionOccurred = false
        
        new Countdown(this, this.scale.width / 2, this.scale.height / 2, () =>{
            this.countdownActive = false
        })

        // Check if background music is already playing.
        let bgMusic = this.sound.get('BGMusic');
        if (!bgMusic) {
            // If not found, add and start the background music.
            this.backgroundMusic = this.sound.add('BGMusic', {
                loop: true,
                volume: 0.2
            });
            this.backgroundMusic.play();
        } else if (!bgMusic.isPlaying) {
            // If found but not playing, start it.
            bgMusic.play();
            this.backgroundMusic = bgMusic;
        } else {
            // Otherwise, use the existing background music.
            this.backgroundMusic = bgMusic;
        }
        
        //Add bikes
        this.bike = new Bike(this, width - 100, height / 2, 'bike-idle', 0, 'left', this.input.keyboard.createCursorKeys()).setAngle(270);
        this.bike2 = new Bike(this, 100, height / 2, 'bike-idle', 0, 'right', this.keysWASD = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          right: Phaser.Input.Keyboard.KeyCodes.D
        })).setAngle(90);
        this.bike.setTint(0xff0000)


        // Trail Management
        // **Physics Groups for Trails**
        this.trailGroup1 = this.physics.add.group();
        this.trailGroup2 = this.physics.add.group();

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
            this.handleCollision("Both Players Crashed!", this.bike);
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
            powerUp.applyEffect(this.bike);
        });

        this.physics.add.overlap(this.bike2, this.powerUpGroup, (bike, powerUp) => {
            powerUp.applyEffect(this.bike2);
        });
    }

    update(time, delta){
        if (this.gameOver) return;

        this.bike.update(time, delta);
        this.bike2.update(time, delta);

        this.addTrailSegment(this.trailGroup1, this.bike.x, this.bike.y, 0xff0000); // Red Trail (Player 1)
        this.addTrailSegment(this.trailGroup2, this.bike2.x, this.bike2.y, 0x00ff00); // Green Trail (Player 2)

        // Delay self-collision checks
        this.framesSinceStart++;
    }

    spawnPowerUp() {
        let x = Phaser.Math.Between(50, this.game.config.width - 50);
        let y = Phaser.Math.Between(50, this.game.config.height - 50);
        let type = Phaser.Utils.Array.GetRandom(this.powerUpTypes);
    
        let powerUp = new PowerUp(this, x, y, type);
        console.log(type)
        this.powerUpGroup.add(powerUp);
    }

    handleCollision(message, player) {
        if (this.collisionOccurred || this.countdownActive || player.invincible ) return; // Ignore if collision already happened
        this.collisionOccurred = true; // Mark collision as occurred
        this.endGame(message);
    }

    addTrailSegment(trailGroup, x, y, color) {
        let trailSegment = this.add.rectangle(x, y, 4, 4, color);
        this.physics.add.existing(trailSegment);
        trailSegment.body.setImmovable(true);
        
        // Disable collision initially
        trailSegment.body.checkCollision.none = true;
    
        // Enable collision after 200ms
        this.time.delayedCall(500, () => {
            if (!this.countdownActive && trailSegment.body) {
                trailSegment.body.checkCollision.none = false;
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
        this.gameOver = true;
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, message, {
            fontSize: '32px',
            fill: '#fff',
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.scene.start("gameOverScene"); // Restart game after delay
        });
    }
  
}