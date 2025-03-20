class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // Background
        this.add.image(width/2, height/2, 'menu-background').setScale(0.3)
        this.add.rectangle(width/2, height/2, 1024, 600, 0x000000, 0.7).setOrigin(0.5);

        // Title
        this.add.text(this.scale.width / 2, 100, "Game Credits", {
            fontSize: "32px",
            fill: "#fff",
            fontFamily: "Arial",
            align: "center"
        }).setOrigin(0.5);

        // Credit Text
        let creditText = `Game Design & Programming:
Chaavan

Assets & Art:
Chaavan

Music & Sound Effects:
Chaavan

Made for CMPM 120
Instructor: Nathan Altice

Powered by Phaser 3`;

        this.add.text(this.scale.width / 2, 325, creditText, {
            fontSize: "18px",
            fill: "#fff",
            fontFamily: "Arial",
            align: "center",
            lineSpacing: 8
        }).setOrigin(0.5);

        // Back to Menu Button
        let menuButton = this.add.text(this.scale.width / 2, this.scale.height - 50, "Back to Menu", {
            fontSize: "24px",
            fill: "#ff0",
            fontFamily: "Arial",
            backgroundColor: "#000",
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        menuButton.on("pointerdown", () => {
            this.sound.play('click');
            this.cameras.main.fadeOut(1000); // Fade out
            this.time.delayedCall(1000, () => {
                this.scene.start('menuScene');
            });
        });

        menuButton.on("pointerover", () => {
            menuButton.setStyle({ fill: "#fff" });
        });

        menuButton.on("pointerout", () => {
            menuButton.setStyle({ fill: "#ff0" });
        });
    }
}
