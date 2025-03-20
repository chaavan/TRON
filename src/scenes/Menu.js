class Menu extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }
    create() {
        //Stop all music
        this.sound.stopByKey("IGMusic");

        //Add background image
        this.add.image(width/2, height/2, 'menu-background').setScale(0.3)
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

        // Instructions button
        const instructionsText = this.add.text(525, 350, 'Instructions', {
        fontSize: '24px',
        fill: '#0f0',
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        instructionsText.on('pointerdown', () => {
        this.sound.play('click');
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            this.scene.start('instructionsScene');
        });
        });

        // Credits button
        const creditsText = this.add.text(525, 450, 'Credits', {
        fontSize: '24px',
        fill: '#0f0',
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        creditsText.on('pointerdown', () => {
        this.sound.play('click');
        this.cameras.main.fadeOut(1000);
        this.time.delayedCall(1000, () => {
            this.scene.start("creditsScene");
        });
        });
    }

    createPlayButton() {
        let playButton = this.add.text(525, 250, "Play", {
        fontSize: "28px",
        fill: "#0f0",
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        playButton.on('pointerdown', () => {
        this.sound.play('click');
        playButton.destroy();
        this.showGameModeTab();
        });
        playButton.on('pointerover', () => {
        playButton.setStyle({ fill: "#fff" });
        });
        playButton.on('pointerout', () => {
        playButton.setStyle({ fill: "#0f0" });
        });
    }

    showGameModeTab() {
        // Define dimensions and position for the tab.
        const tabWidth = 800;
        const tabHeight = 500;
        const tabX = this.scale.width / 2;
        const tabY = 300;
        
        // Create a semi-transparent background rectangle for the tab.
        let tabBackground = this.add.rectangle(tabX, tabY, tabWidth, tabHeight, 0x000000, 0.9).setOrigin(0.5);
        
        // Create "Play vs AI" option on the left side of the tab.
        let playVsAI = this.add.text(tabX - tabWidth / 4, tabY, "Play vs AI", {
        fontSize: "24px",
        fill: "#0f0",
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Create "Play vs Player" option on the right side of the tab.
        let playVsPlayer = this.add.text(tabX + tabWidth / 4, tabY, "Play vs Player", {
        fontSize: "24px",
        fill: "#0f0",
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        // Create a "Back" button below the tab.
        let backButton = this.add.text(tabX, tabY + tabHeight / 2 - 40, "Menu", {
        fontSize: "20px",
        fill: "#ff0",
        fontFamily: "Arial"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
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
        // Destroy the tab elements.
        tabBackground.destroy();
        playVsAI.destroy();
        playVsPlayer.destroy();
        backButton.destroy();
        // Recreate the original Play button.
        this.createPlayButton();
        });
        
        // Hover effects for options.
        playVsAI.on("pointerover", () => {
        playVsAI.setStyle({ fill: "#fff" });
        });
        playVsAI.on("pointerout", () => {
        playVsAI.setStyle({ fill: "#0f0" });
        });
        
        playVsPlayer.on("pointerover", () => {
        playVsPlayer.setStyle({ fill: "#fff" });
        });
        playVsPlayer.on("pointerout", () => {
        playVsPlayer.setStyle({ fill: "#0f0" });
        });
        
        backButton.on("pointerover", () => {
        backButton.setStyle({ fill: "#fff" });
        });
        backButton.on("pointerout", () => {
        backButton.setStyle({ fill: "#ff0" });
        });
    }
}