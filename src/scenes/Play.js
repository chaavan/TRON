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

        // this.handleCollisionForBike(this.bike)
        // this.handleCollisionForBike(this.bike2)

        // this.handleCollision()
    }

    // handleCollisionForBike(bike) {
    //   // Get the bike's bounding rectangle.
    //   const bikeBounds = bike.getBounds();
  
    //   // Loop through each trail segment.
    //   for (let i = 0; i < this.trailSegments.length; i++) {
    //       let segment = this.trailSegments[i];
    //       // Skip segments that are still in their no-collision grace period.
    //       if (segment.noCollisionTime > 0) continue;
    //       // Check for collision using the segment's bounds.
    //       if (Phaser.Geom.Intersects.RectangleToRectangle(bikeBounds, segment.getBounds())) {
    //           // If a collision is detected and the bike is not already in an explosion state.
    //           if (!bike.anims.currentAnim || bike.anims.currentAnim.key !== 'bike-explode') {
    //               // this.backgroundMusic.stop();
    //               // this.sound.play('explosionAudio');
    //               // Transition the bike's state machine to the 'explode' state.
    //               bike.bikeFSM.transition('explode');
    //           }
    //           break;
    //       }
    //   }
    // }
  

    updateTrail(delta, bike) {
      // Accumulate time to determine when to create a new trail segment.
      this.trailTimer += delta;
      
      // If enough time has passed, create a new trail segment using the pixel asset.
      if (this.trailTimer >= this.trailInterval) {
          const segmentSize = 10; // Adjust the size to cover gaps.
          // Create a new image from your single-pixel asset.
          let segment = this.add.image(bike.x, bike.y, 'trail').setOrigin(0.5, 0.5);
          // Scale the image to the desired segment size.
          segment.setDisplaySize(segmentSize, segmentSize);
          // Set lifetime and a short grace period for collision.
          segment.lifetime = this.trailLifetime;
          segment.noCollisionTime = 100; // 100ms grace period.
          this.trailSegments.push(segment);
          this.trailTimer = 0;
      }
      
      // Update each trail segment's lifetime and the no-collision grace period.
      for (let i = this.trailSegments.length - 1; i >= 0; i--) {
          let segment = this.trailSegments[i];
          segment.lifetime -= delta;
          segment.noCollisionTime -= delta;
          if (segment.lifetime <= 0) {
              segment.destroy();
              this.trailSegments.splice(i, 1);
          }
      }
    }
  
}