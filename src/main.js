// Game Name: Light Cycle
// Name: Chaavan Sure
// Date: 3/7/2025
//Hours Spent: ?? hours

'use strict'

let config = {
    parent: "Game-container",
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // scene: [ Load, Menu, Instructions, Credits, Play, GameOver ]
    scene: [ Load, Menu, Instructions, Play, GameOver]
}

let game = new Phaser.Game(config)

let { width, height } = game.config