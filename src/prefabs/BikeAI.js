class BikeAI extends Bike {
    constructor(scene, x, y, texture, frame, initialDirection) {
        super(scene, x, y, texture, frame, initialDirection, null); // No keyboard input needed

        this.AITurnDelay = 500; // AI decision-making delay in ms
        this.AIMoveTimer = scene.time.addEvent({
            delay: this.AITurnDelay,
            loop: true,
            callback: this.decideMovement,
            callbackScope: this
        });
    }

    decideMovement() {
        if (this.scene.gameOver) return; // Stop AI if game is over

        let possibleMoves = [];

        // Check if turning is possible
        if (this.direction === "left" || this.direction === "right") {
            possibleMoves.push("up", "down"); // AI can only turn up/down from horizontal
        } else {
            possibleMoves.push("left", "right"); // AI can only turn left/right from vertical
        }

        // 70% chance to continue, 30% chance to turn
        if (Phaser.Math.Between(0, 100) < 30) {
            let newDirection = Phaser.Utils.Array.GetRandom(possibleMoves);
            this.bikeFSM.transition(newDirection);
        }
    }
}