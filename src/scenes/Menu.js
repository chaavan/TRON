class Menu extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }
    preload() {
        // Load any temporary assets if needed
    }
    create() {
        // Display the game title
        this.add.text(525, 250, 'Light Cycle Game', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
      
        // Create a Start Game button using text
        const startText = this.add.text(525, 350, 'Start Game', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        startText.setInteractive();
        startText.on('pointerdown', () => {
            this.scene.start('playScene');
        });

        // Instructions 
        const InstructionsText = this.add.text(525, 450, 'Instructions', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        InstructionsText.setInteractive();
        InstructionsText.on('pointerdown', () => {
            this.scene.start('instructionsScene');
        });
    }
  }