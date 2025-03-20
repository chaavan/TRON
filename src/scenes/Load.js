class Load extends Phaser.Scene{
    constructor(){
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('background', 'img/Background.png')
        this.load.image('menu-background', 'img/menu-background.png')
        this.load.image('speedBoost', 'img/speedBoost.png')
        this.load.image('opponentTrailDisable', 'img/trailDisable.png')
        this.load.image('trailInvincibility', 'img/invincibility.png')
        this.load.image('trailElongation', 'img/trailElong.png')
        this.load.image('playButton', 'img/PlayButton.png')
        this.load.image('instructionsButton', 'img/InstructionsButton.png')
        this.load.image('creditsButton', 'img/CreditsButton.png')
        this.load.image('MenuButton', 'img/MenuButton.png')
        this.load.image('AIButton', 'img/AIButton.png')
        this.load.image('playerButton', 'img/PlayerButton.png')
        this.load.image('RetryButton', 'img/RetryButton.png')
        this.load.audio('BGMusic', 'audio/background-music.mp3')
        this.load.audio('click', 'audio/click.mp3')
        this.load.audio('IGMusic', 'audio/In-game-music.mp3')
        this.load.audio('countdown', 'audio/countdown.mp3')
        this.load.audio('explosion', 'audio/explosion1.mp3')
        this.load.audio('collect', 'audio/collect.mp3')
        this.load.spritesheet('bike-left', 'img/Bike-left.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('bike-right', 'img/Bike-right.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('bike-up', 'img/Bike-up.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('bike-down', 'img/Bike-down.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('bike-idle', 'img/Bike-idle.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('bike-explode', 'img/Bike-explode.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.bitmapFont('calcio-italiano', 'fonts/CalcioItaliano.png', 'fonts/CalcioItaliano.xml')
        this.load.bitmapFont('Tron', 'fonts/TRON.png', 'fonts/TRON.xml')
    }

    create(){
        this.anims.create({
            key: 'left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-left', {start: 0, end: 6}),
        })
        this.anims.create({
            key: 'right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-right', {start: 0, end: 6}),
        })
        this.anims.create({
            key: 'up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-up', {start: 0, end: 6}),
        })
        this.anims.create({
            key: 'down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-down', {start: 0, end: 6}),
        })
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-idle', {start: 0, end: 1}),
        })
        this.anims.create({
            key: 'explode',
            frameRate: 5,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('bike-explode', {start: 0, end: 3}),
        })
        this.scene.start('menuScene')
    }
}