class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
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
            this.scene.start('menuScene');
        });
    }
}
