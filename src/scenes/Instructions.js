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
        
        this.add.image(width/2, height/2, 'menu-background').setScale(0.8)
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.7).setOrigin(0.5);

        // Title text
        this.add.bitmapText(525, 50, 'Tron',  'Instructions', 64).setOrigin(0.5);

        // Instructions text
    //     const instructionsText = `
    // Use Arrow Keys to control Player 1’s bike.
    // Use W, A, S, D to control Player 2’s bike.

    // Avoid colliding with the arena walls or bike trails.
    
    // Collect power-ups for special abilities:
    //    - Speed Boost: Increase bike speed temporarily.
    //    - Trail Invincibility: Pass through trails without collision.
    //    - Trail Elongation: Extend your trail (with brief invincibility).
    //    - Opponent Trail Disable: Temporarily disable opponent’s trail.

    // The last bike remaining wins!`;
    //     this.add.text(this.scale.width / 3, this.scale.height / 2, instructionsText, {
    //         fontFamily: 'Arial',
    //         fontSize: '24px',
    //         fill: '#fff',
    //         // align: 'center',
    //         wordWrap: { width: this.scale.width - 100 }
    //     }).setOrigin(0.5);

        this.add.bitmapText(50, 110, 'content', '* Use ARROW Keys to control P1', 20)
        this.add.image(550, 160, 'arrows').setScale(0.5)
        this.add.bitmapText(50, 160, 'content', '* Use WASD Keys to control P2', 20)
        this.add.image(750, 150, 'WASD').setScale(0.5)
        this.add.bitmapText(50, 220, 'content', '* Avoid colliding with the arena walls or bike trails', 20)
        this.add.bitmapText(50, 270, 'content', '* Collect power-ups for special abilities:', 20)
        this.add.image(100, 330, 'speedBoost')
        this.add.bitmapText(150, 320, 'content', '- Speed Boost: Increase bike speed temporarily', 20)
        this.add.image(100, 380, 'trailInvincibility')
        this.add.bitmapText(150, 370, 'content', '- Trail Invincibility: Pass through trails without collision', 20)
        this.add.image(100, 430, 'trailElongation')
        this.add.bitmapText(150, 420, 'content', '- Trail Elongation: Extend your trail (with brief invincibility)', 20)
        this.add.image(100, 480, 'opponentTrailDisable')
        this.add.bitmapText(150, 470, 'content', '- Opponent Trail Disable: Temporarily disable opponent’s trail', 20)

        // Back to Menu button
        this.createMenuButton();
    }

    createMenuButton(){
        this.menuButton = this.add.image(525, 550, 'MenuButton').setInteractive({ useHandCursor: true });
        this.menuButton.setOrigin(0.5);

        this.menuButton.on('pointerdown', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start("menuScene");
            });
        });

        this.menuButton.on('pointerover', () => {
            this.menuButton.setScale(1.1);
        });
        this.menuButton.on('pointerout', () => {
            this.menuButton.setScale(1);
        });
    }
}
