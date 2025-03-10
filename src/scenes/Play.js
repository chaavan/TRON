class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Stop all music
        // this.sound.stopAll()

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

        //Background
        this.add.image(400, 215, 'background').setScale(1.6)

        new Countdown(this, this.scale.width / 2, this.scale.height / 2, () => {
          // Callback when countdown finishes:
          // Start your game logic here (e.g., enable bike movement, start timers, etc.)
          console.log('Countdown complete! Starting game...');
        });

        //add keyboard input
        // this.keys = this.input.keyboard.createCursorKeys()
        

        //Add bikes
        this.bike = new Bike(this, width - 100, height / 2, 'bike-idle', 0, 'left', this.input.keyboard.createCursorKeys()).setAngle(270);
        this.bike2 = new Bike(this, 100, height / 2, 'bike-idle', 0, 'right', this.keysWASD = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          right: Phaser.Input.Keyboard.KeyCodes.D
        })).setAngle(90);


        //Trail Management
        this.trailSegments = [];
        this.trailTimer = 0;
        this.trailInterval = 80;     // Interval (in ms) between trail segments
        this.trailLifetime = 3000;   // Each segment's lifetime in ms


        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-C', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        
    }

    update(time, delta){
        // this.bikeFSM.step()
        // this.bike2FSM.step()

        this.bike.update(time, delta);
        this.bike2.update(time, delta);

        this.updateTrail(delta, this.bike)
        this.updateTrail(delta, this.bike2)



        // this.handleCollision()
    }

    // handleCollision() {
    //     // Get the bike's bounding rectangle.
    //     const bikeBounds = this.bike.getBounds();
    
    //     // Check collision between the bike and each trail segment.
    //     for (let i = 0; i < this.trailSegments.length; i++) {
    //       let segment = this.trailSegments[i];
    //       let segmentBounds = segment.getBounds();
    //       if (Phaser.Geom.Intersects.RectangleToRectangle(bikeBounds, segmentBounds)) {
    //         // If collision is detected and the bike is not already exploding,
    //         // transition its FSM to the 'explode' state.
    //         // this.bikeFSM.transition('explode');
    //       }
    //     }
    // }

    updateTrail(delta, biker) {
        // Accumulate time and create a new trail segment when interval is reached.
        this.trailTimer += delta;
        if (this.trailTimer >= this.trailInterval) {
          const segmentSize = 10; // Adjust size as needed
          let segment = this.add.rectangle(biker.x, biker.y, segmentSize, segmentSize, 0x00ffff);
          segment.lifetime = this.trailLifetime;
          this.trailSegments.push(segment);
          this.trailTimer = 0;
        }
    
        // Update each trail segment's lifetime and remove those that have expired.
        for (let i = this.trailSegments.length - 1; i >= 0; i--) {
          let segment = this.trailSegments[i];
          segment.lifetime -= delta;
          if (segment.lifetime <= 0) {
            segment.destroy();
            this.trailSegments.splice(i, 1);
          }
        }
      }
}