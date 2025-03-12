class Menu extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }
    create() {
        //Stop all music
        this.sound.stopByKey("IGMusic");

        //Add background image
        this.add.image(width/2, height/2, 'menu-background', )

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

        // Display the game title
        this.add.bitmapText(525, 150, 'calcio-italiano',  'Light Cycle', 64).setOrigin(0.5);
      
        // Create a Start Game button using text
        const startText = this.add.text(525, 250, 'Start Game', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        startText.setInteractive({ useHandCursor: true });
        startText.on('pointerdown', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('playScene');
            });
        });

        // Instructions 
        const InstructionsText = this.add.text(525, 350, 'Instructions', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        InstructionsText.setInteractive({ useHandCursor: true });
        InstructionsText.on('pointerdown', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('instructionsScene');
            });
        });

        // Credits
        const creditsText = this.add.text(525, 450, 'Credits', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        creditsText.setInteractive({ useHandCursor: true });
        creditsText.on('pointerdown', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start("creditsScene");
            });
        });

    }
  }