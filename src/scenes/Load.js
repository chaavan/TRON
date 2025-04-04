class Load extends Phaser.Scene{
    constructor(){
        super('loadScene')
    }

    preload(){
        // Path
        this.load.path = './assets/'

        // Background-imgs
        this.load.image('background', 'img/Background.png')
        this.load.image('menu-background', 'img/menu-background.png')

        // Power-ups
        this.load.image('speedBoost', 'img/speedBoost.png')
        this.load.image('opponentTrailDisable', 'img/trailDisable.png')
        this.load.image('trailInvincibility', 'img/Invincibility.png')
        this.load.image('trailElongation', 'img/trailElong.png')

        // Buttons
        this.load.image('playButton', 'img/PlayButton.png')
        this.load.image('instructionsButton', 'img/InstructionsButton.png')
        this.load.image('creditsButton', 'img/CreditsButton.png')
        this.load.image('MenuButton', 'img/MenuButton.png')
        this.load.image('AIButton', 'img/AIButton.png')
        this.load.image('playerButton', 'img/PlayerButton.png')
        this.load.image('RetryButton', 'img/RetryButton.png')

        // Supporting-imgs
        this.load.image('arrows', 'img/arrows.png')
        this.load.image('WASD', 'img/wasd.png')
        this.load.image('trail', 'img/trail.png')

        // Audio
        this.load.audio('BGMusic', 'audio/background-music.mp3')
        this.load.audio('click', 'audio/click.mp3')
        this.load.audio('IGMusic', 'audio/In-game-music.mp3')
        this.load.audio('countdown', 'audio/countdown.mp3')
        this.load.audio('explosion', 'audio/explosion1.mp3')
        this.load.audio('collect', 'audio/collect.mp3')

        // Bike
        this.load.spritesheet('bike-left', 'img/Bike-left.png',{
            frameWidth: 60,
            frameHeight: 32
        })
        this.load.spritesheet('bike-right', 'img/Bike-right.png',{
            frameWidth: 60,
            frameHeight: 32
        })
        this.load.spritesheet('bike-up', 'img/Bike-up.png',{
            frameWidth: 34,
            frameHeight: 83
        })
        this.load.spritesheet('bike-down', 'img/Bike-down.png',{
            frameWidth: 34,
            frameHeight: 83
        })
        this.load.spritesheet('bike-idle', 'img/Bike-left.png',{
            frameWidth: 60,
            frameHeight: 32
        })
        this.load.spritesheet('bike-explode', 'img/Bike-explode.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.bitmapFont('content', 'fonts/Tron-content.png', 'fonts/Tron-content.xml')
        this.load.bitmapFont('Tron', 'fonts/TRON.png', 'fonts/TRON.xml')
    }

    create(){
        // Bike animations
        this.anims.create({
            key: 'left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-left', {start: 0, end: 4}),
        })
        this.anims.create({
            key: 'right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-right', {start: 0, end: 4}),
        })
        this.anims.create({
            key: 'up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-up', {start: 0, end: 1}),
        })
        this.anims.create({
            key: 'down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-down', {start: 0, end: 1}),
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
            frames: this.anims.generateFrameNumbers('bike-explode', {start: 2, end: 3}),
        })
        this.scene.start('menuScene')
    }
}