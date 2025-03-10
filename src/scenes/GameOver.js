class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
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

        // Display "Game Over" title text.
        this.add.text(this.scale.width / 2, 200, 'Game Over', {
            fontFamily: 'JumperGradient',
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

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
            this.scene.start('playScene');
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
            // Transition to the menu scene.
            this.sound.play('click');
            this.scene.start('menuScene');
        });
    }
}
