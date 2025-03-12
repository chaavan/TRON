class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    create() {
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

        // Title text
        this.add.text(this.scale.width / 2, 50, 'Instructions', {
            fontFamily: 'JumperGradient',
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Instructions text
        const instructionsText = `
Game Instructions:

1. Control your bike using the arrow keys (for one bike) or WASD (for the other).
2. Your bike will move continuously (like in Snake) you can only change direction.
3. Avoid colliding with the light trails left by the bikes.
4. Beware of hitting world boundaries.
5. Collect power-ups to boost your performance.
6. The last bike remaining wins the battle.

Press "Back to Menu" to return.
        `;
        this.add.text(this.scale.width / 2, this.scale.height / 2, instructionsText, {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#fff',
            align: 'center',
            wordWrap: { width: this.scale.width - 100 }
        }).setOrigin(0.5);

        // Back to Menu button
        const backText = this.add.text(this.scale.width / 2, this.scale.height - 50, 'Back to Menu', {
            fontFamily: 'JumperGradient',
            fontSize: '32px',
            fill: '#0f0' 
        }).setOrigin(0.5);

        backText.setInteractive({ useHandCursor: true });
        backText.on('pointerup', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('menuScene');
            });
        });
    }
}
