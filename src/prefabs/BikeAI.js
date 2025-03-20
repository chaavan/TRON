class BikeAI extends Bike {
    constructor(scene, x, y, texture, frame, initialDirection) {
      // Ensure a safe starting direction based on the margin.
      const margin = 50;
      let safeDirection = initialDirection;
      if (initialDirection === "left" && x < margin) {
        safeDirection = "right";
      } else if (initialDirection === "right" && x > scene.game.config.width - margin) {
        safeDirection = "left";
      } else if (initialDirection === "up" && y < margin) {
        safeDirection = "down";
      } else if (initialDirection === "down" && y > scene.game.config.height - margin) {
        safeDirection = "up";
      }
      
      // Call parent constructor with null controls (AI doesn't use keyboard input)
      super(scene, x, y, texture, frame, safeDirection, null);
      
      this.isAI = true;
      this.currentDirection = safeDirection;
      
      // AI decision-making timer (runs continuously)
      this.AITurnDelay = 500; // in milliseconds
      this.AIMoveTimer = scene.time.addEvent({
        delay: this.AITurnDelay,
        loop: true,
        callback: this.decideMovement,
        callbackScope: this
      });
    }
    
    decideMovement() {
      // Do nothing if countdown is still active or game is over.
      if (this.scene.countdownActive || this.scene.gameOver) return;
      
      const margin = 50;
      // Start with all four directions.
      let safeMoves = ["left", "right", "up", "down"];
      
      // Eliminate moves that lead further toward a wall if too close:
      if (this.x < margin) {
        // Too close to left wall: remove "left"
        Phaser.Utils.Array.Remove(safeMoves, "left");
      }
      if (this.x > this.scene.game.config.width - margin) {
        Phaser.Utils.Array.Remove(safeMoves, "right");
      }
      if (this.y < margin) {
        Phaser.Utils.Array.Remove(safeMoves, "up");
      }
      if (this.y > this.scene.game.config.height - margin) {
        Phaser.Utils.Array.Remove(safeMoves, "down");
      }
      
      // Determine which moves are perpendicular to the current direction.
      let perpendicularMoves = [];
      if (this.currentDirection === "left" || this.currentDirection === "right") {
        perpendicularMoves = ["up", "down"];
      } else if (this.currentDirection === "up" || this.currentDirection === "down") {
        perpendicularMoves = ["left", "right"];
      }
      
      // Filter safeMoves for those that are perpendicular, if available.
      let validMoves = safeMoves.filter(move => perpendicularMoves.includes(move));
      if (validMoves.length === 0) {
        validMoves = safeMoves; // Fallback: use all safe moves if none are perpendicular.
      }
      
      // If current direction is no longer safe, force a turn.
      if (!safeMoves.includes(this.currentDirection)) {
        let newDirection = Phaser.Utils.Array.GetRandom(validMoves);
        this.bikeFSM.transition(newDirection);
        this.currentDirection = newDirection;
        return;
      }
      
      // Otherwise, with a 30% chance, choose a new direction (different from current).
      if (Phaser.Math.Between(0, 100) < 30) {
        let candidateMoves = validMoves.filter(dir => dir !== this.currentDirection);
        if (candidateMoves.length > 0) {
          let newDirection = Phaser.Utils.Array.GetRandom(candidateMoves);
          this.bikeFSM.transition(newDirection);
          this.currentDirection = newDirection;
        }
      }
    }
  }
  