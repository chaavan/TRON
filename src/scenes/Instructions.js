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
        this.add.bitmapText(525, 100, 'Tron',  'Instructions', 64).setOrigin(0.5);

        // Instructions text
        const instructionsText = `
    Use Arrow Keys to control Player 1’s bike.
    Use W, A, S, D to control Player 2’s bike.

    Avoid colliding with the arena walls or bike trails.
    
    Collect power-ups for special abilities:
       - Speed Boost: Increase bike speed temporarily.
       - Trail Invincibility: Pass through trails without collision.
       - Trail Elongation: Extend your trail (with brief invincibility).
       - Opponent Trail Disable: Temporarily disable opponent’s trail.

    The last bike remaining wins!

    Press "Menu" to return.
        `;
        this.add.text(this.scale.width / 2, this.scale.height / 2, instructionsText, {
            fontFamily: 'Arial',
            fontSize: '20px',
            fill: '#fff',
            // align: 'center',
            wordWrap: { width: this.scale.width - 100 }
        }).setOrigin(0.5);

        // Back to Menu button
        this.createMenuButton();
    }

    createMenuButton(){
        this.menuButton = this.add.image(525, 475, 'MenuButton').setInteractive({ useHandCursor: true });
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
