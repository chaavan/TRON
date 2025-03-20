class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.type = type;
        this.setTexture(type);
        this.setScale(1);
        this.body.setImmovable(true);
        this.body.setSize(32, 32);

        // Power-up disappears after 10 seconds if not collected
        scene.time.delayedCall(10000, () => {
            if (this.active) {
                this.destroy();
            }
        });
    }

    applyEffect(player) {
        let opponent = player === this.scene.bike ? this.scene.bike2 : this.scene.bike;

        // Increase velocity
        if (this.type === "speedBoost") {
            player.bikeVelocity *= 1.5;
            player.scene.time.delayedCall(8000, () => {
                player.bikeVelocity /= 1.5;
            });

        // Immune to collsions for 5 secondss
        } else if (this.type === "trailInvincibility") {
            player.invincible = true;
            player.scene.time.delayedCall(5000, () => {
                player.invincible = false;
            });

        // Increase trail segment length
        } else if (this.type === "trailElongation") {
            let trailGroup = player === player.scene.bike ? player.scene.trailGroup1 : player.scene.trailGroup2;
            player.invincible = true;
            for (let i = 0; i < 50; i++) {
                let lastSegment = trailGroup.getLast(true);
                if (lastSegment) {
                    let clone = player.scene.add.rectangle(lastSegment.x, lastSegment.y, 4, 4, lastSegment.fillColor);
                    player.scene.physics.add.existing(clone);
                    clone.body.setImmovable(true);
                    trailGroup.add(clone);
                }
            }
            // Remove invincibility after 1 second
            player.scene.time.delayedCall(1000, () => {
                player.invincible = false;
            });

        // Reset opponenets trail segment
        } else if (this.type === "opponentTrailDisable") {
            let opponentTrail = opponent === this.scene.bike ? this.scene.trailGroup1 : this.scene.trailGroup2;
            opponentTrail.setAlpha(0); // Hide opponent's trail
            this.scene.time.delayedCall(5000, () => {
                opponentTrail.setAlpha(1); // Restore visibility after time
            });
        }
        this.destroy();
    }
}
