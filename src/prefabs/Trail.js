class TrailSegment extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture = 'trailSegment', lifetime = 2000) {
      super(scene, x, y, texture);
      scene.add.existing(this);
      
      // Optionally add physics if needed for collision detection.
      // scene.physics.add.existing(this, true); // 'true' makes it static
      
      this.lifetime = lifetime;
    }

    update() {
      this.lifetime --
      if (this.lifetime <= 0) {
        this.destroy();
      }
    }
  }