class Load extends Phaser.Scene{
    constructor(){
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.image('background', 'img/Background.png');
        this.load.image('trail', 'img/trail.png')
        this.load.audio('BGMusic', 'audio/background-music.mp3')
        this.load.audio('click', 'audio/click.mp3')
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
            frames: this.anims.generateFrameNumbers('bike-idle', {start: 0, end: 3}),
        })
        this.anims.create({
            key: 'explode',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bike-idle', {start: 0, end: 3}),
        })
        this.scene.start('menuScene')
    }
}