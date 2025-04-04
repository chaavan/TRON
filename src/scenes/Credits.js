class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // Background
        this.add.image(width/2, height/2, 'menu-background').setScale(0.8)
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.7).setOrigin(0.5);

        // Title
        this.add.bitmapText(525, 50, 'Tron',  'Game Credits', 64).setOrigin(0.5);

        // Credit Text
        let creditText = `    Game Design & Programming:

    Tron "legacy" / Chaavan


    Assets & Art:

    Chaavan, SUWALLS Wallpapers


    Music & Sound Effects:

    Chaavan, pixabay.com


    Made for CMPM 120

    Instructor: Nathan Altice


    Powered by Phaser 3`;

        this.add.bitmapText(this.scale.width / 2, 305, 'content', creditText, 20, 1).setOrigin(0.5);

        // Back to Menu Button
        this.createMenuButton();
    }

    createMenuButton(){
        this.menuButton = this.add.image(525, 560, 'MenuButton').setInteractive({ useHandCursor: true });
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
