class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create(){
        //Stop all music
        this.sound.stopAll()

        //Background
        this.add.image(400, 215, 'background').setScale(1.6)

        //Add bikes
        this.bike = new Bike(this, width - 100, height / 2, 'bike-idle', 0)

        //Trail Management
        this.trailSegments = [];
        this.trailTimer = 0;
        this.trailInterval = 50;     // Interval (in ms) between trail segments
        this.trailLifetime = 2000;   // Each segment's lifetime in ms

        //add keyboard input
        this.keys = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        
    }

    update(time, delta){
        this.bikeFSM.step()
        this.updateTrail(delta)
        // this.bike.update(time, delta);

        this.handleCollision()
    }

    handleCollision() {
        // Get the bike's bounding rectangle.
        const bikeBounds = this.bike.getBounds();
    
        // Check collision between the bike and each trail segment.
        for (let i = 0; i < this.trailSegments.length; i++) {
          let segment = this.trailSegments[i];
          let segmentBounds = segment.getBounds();
          if (Phaser.Geom.Intersects.RectangleToRectangle(bikeBounds, segmentBounds)) {
            // If collision is detected and the bike is not already exploding,
            // transition its FSM to the 'explode' state.
            // this.bikeFSM.transition('explode');
          }
        }
    }

    updateTrail(delta) {
        // Accumulate time and create a new trail segment when interval is reached.
        this.trailTimer += delta;
        if (this.trailTimer >= this.trailInterval) {
          const segmentSize = 10; // Adjust size as needed
          let segment = this.add.rectangle(this.bike.x, this.bike.y, segmentSize, segmentSize, 0x00ffff);
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