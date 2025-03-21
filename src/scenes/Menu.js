class Menu extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }
    create() {
        // Pause the music
        this.sound.stopByKey("IGMusic");

        // Add background image
        this.add.image(width/2, height/2, 'menu-background').setScale(0.8)
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.7).setOrigin(0.5);

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
        this.add.bitmapText(525, 150, 'Tron',  'Light Cycle', 64).setOrigin(0.5);

        // Create initial Play button
        this.createPlayButton();

        // Create the Instructions button using an image
        this.createInstructionsButton();

        // Create the Credits button using an image
        this.createCreditsButton();
    }

    createPlayButton() {
         // Create the play button image
        let playButton = this.add.image(525, 250, 'playButton').setInteractive({ useHandCursor: true });
        playButton.setOrigin(0.5);

        playButton.on('pointerdown', () => {
        this.sound.play('click');
        playButton.destroy();
        this.disableOtherButtons(); // disable instructions and credits buttons
        this.showGameModeTab();
        });
        
        playButton.on('pointerover', () => {
        playButton.setScale(1.1);
        });
        playButton.on('pointerout', () => {
        playButton.setScale(1);
        });
    }
    
    createInstructionsButton() {
        this.instructionsButton = this.add.image(525, 350, 'instructionsButton').setInteractive({ useHandCursor: true });
        this.instructionsButton.setOrigin(0.5);
    
        this.instructionsButton.on('pointerdown', () => {
          this.sound.play('click');
          this.cameras.main.fadeOut(1000);
          this.time.delayedCall(1000, () => {
            this.scene.start('instructionsScene');
          });
        });
    
        this.instructionsButton.on('pointerover', () => {
            this.instructionsButton.setScale(1.1);
        });
        this.instructionsButton.on('pointerout', () => {
            this.instructionsButton.setScale(1);
        });
    }
    
    createCreditsButton() {
        this.creditsButton = this.add.image(525, 450, 'creditsButton').setInteractive({ useHandCursor: true });
        this.creditsButton.setOrigin(0.5);
    
        this.creditsButton.on('pointerdown', () => {
          this.sound.play('click');
          this.cameras.main.fadeOut(1000);
          this.time.delayedCall(1000, () => {
            this.scene.start("creditsScene");
          });
        });
    
        this.creditsButton.on('pointerover', () => {
            this.creditsButton.setScale(1.1);
        });
        this.creditsButton.on('pointerout', () => {
            this.creditsButton.setScale(1);
        });
    }

    disableOtherButtons() {
        // Disable interactivity on instructions and credits buttons
        if(this.instructionsButton) {
          this.instructionsButton.disableInteractive();
          this.instructionsButton.setAlpha(0.5);
        }
        if(this.creditsButton) {
          this.creditsButton.disableInteractive();
          this.creditsButton.setAlpha(0.5);
        }
    }
    
    enableOtherButtons() {
        // Re-enable interactivity on instructions and credits buttons
        if(this.instructionsButton) {
            this.instructionsButton.setInteractive({ useHandCursor: true });
            this.instructionsButton.setAlpha(1);
        }
        if(this.creditsButton) {
            this.creditsButton.setInteractive({ useHandCursor: true });
            this.creditsButton.setAlpha(1);
        }
    }
    
    showGameModeTab() {
        // Define dimensions and position for the tab.
        const tabWidth = 700;
        const tabHeight = 400;
        const tabX = this.scale.width / 2;
        const tabY = 300;
        
        // Create a semi-transparent background rectangle for the tab.
        let temp_layer = this.add.image(width/2, height/2, 'menu-background').setScale(0.8)
        let tabBackground = this.add.rectangle(tabX, tabY, tabWidth, tabHeight, 0x000000, 0.6).setOrigin(0.5);

        // Title
        let title = this.add.bitmapText(tabX - 65, tabY - 150, 'Tron', 'Choose:', 32, 1)

        // "Play vs AI" option
        let playVsAI = this.add.image(tabX - tabWidth / 4, tabY - 20, 'AIButton').setInteractive({ useHandCursor: true });
        playVsAI.setOrigin(0.5);
        
        // "Play vs Player"
        let playVsPlayer = this.add.image(tabX + tabWidth / 4, tabY - 20, 'playerButton').setInteractive({ useHandCursor: true });
        playVsPlayer.setOrigin(0.5);
        
        // "Back" button
        let backButton = this.add.image(tabX, tabY + tabHeight / 2 - 50, 'MenuButton').setInteractive({ useHandCursor: true });
        backButton.setOrigin(0.5);
        
        // Option click handlers:
        playVsAI.on("pointerdown", () => {
        this.registry.set("gameMode", "AI");
        this.sound.play('click');
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            this.scene.start("playScene");
        });
        });
        
        playVsPlayer.on("pointerdown", () => {
        this.registry.set("gameMode", "Player");
        this.sound.play('click');
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            this.scene.start("playScene");
        });
        });
        
        backButton.on("pointerdown", () => {
        this.sound.play('click');
        title.destroy();
        temp_layer.destroy();
        tabBackground.destroy();
        playVsAI.destroy();
        playVsPlayer.destroy();
        backButton.destroy();
        // Recreate the original Play button image.
        this.createPlayButton();
        this.enableOtherButtons();
        }).setTint(0xF79D1E99)
        
        // Hover effects for the game mode option images and back button.
        playVsAI.on("pointerover", () => {
        playVsAI.setScale(1.1);
        });
        playVsAI.on("pointerout", () => {
        playVsAI.setScale(1);
        });
        
        playVsPlayer.on("pointerover", () => {
        playVsPlayer.setScale(1.1);
        });
        playVsPlayer.on("pointerout", () => {
        playVsPlayer.setScale(1);
        });
        
        backButton.on("pointerover", () => {
        backButton.setScale(1.1);
        });
        backButton.on("pointerout", () => {
        backButton.setScale(1);
        });
    }
}