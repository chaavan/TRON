class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    init(data) {
        this.duration = data.duration || 0;
    }

    create() {
        //Stop all music
        this.sound.stopAll()

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

        // Calculate minutes and seconds from the duration (in ms)
        let totalSeconds = Math.floor(this.duration / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let formattedTime = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);

        // Display "Game Over" title text.
        this.add.bitmapText(525, 150, 'Tron',  'Game Over', 64).setOrigin(0.5);

        // Display time
        this.add.bitmapText(525, 250, 'Tron', 'Time Played : ' + formattedTime, 32).setOrigin(0.5);

        // Retry Button
        this.createRetryButton();

        // Menu Button
        this.createMenuButton();
    }

    createMenuButton(){
        this.menuButton = this.add.image(525, 450, 'MenuButton').setInteractive({ useHandCursor: true });
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
    createRetryButton(){
        this.retryButton = this.add.image(525, 350, 'RetryButton').setInteractive({ useHandCursor: true });
        this.retryButton.setOrigin(0.5);

        this.retryButton.on('pointerdown', () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000);
            this.time.delayedCall(1000, () => {
                this.scene.start("playScene");
            });
        });

        this.retryButton.on('pointerover', () => {
            this.retryButton.setScale(1.1);
        });
        this.retryButton.on('pointerout', () => {
            this.retryButton.setScale(1);
        });
    }
}
