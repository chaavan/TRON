class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        //Stop all music
        this.sound.stopAll()
        
        this.add.image(width/2, height/2, 'menu-background')

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

        // Display "Game Over" title text.
        this.add.bitmapText(525, 150, 'calcio-italiano',  'Game Over', 64).setOrigin(0.5);

        // Create a "Retry" button.
        const retryText = this.add.text(this.scale.width / 2, 350, 'Retry', {
            fontFamily: 'JumperGradient',
            fontSize: '32px',
            fill: '#0f0' 
        }).setOrigin(0.5);

        // Make the Retry text interactive.
        retryText.setInteractive({ useHandCursor: true });
        retryText.on('pointerup', () => {
            // Restart the play scene.
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('playScene');
            });
        });

        // Create a "Menu" button.
        const menuText = this.add.text(this.scale.width / 2, 450, 'Menu', {
            fontFamily: 'JumperGradient',
            fontSize: '32px',
            fill: '#0f0' 
        }).setOrigin(0.5);

        // Make the Menu text interactive.
        menuText.setInteractive({ useHandCursor: true });
        menuText.on('pointerup', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('menuScene');
            });
        });
    }
}
