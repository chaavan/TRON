// Game Name: Light Cycle Game - Tron Adaptation
// Name: Chaavan Sure
// Date: 3/7/2025
// Hours Spent: 69 hours

// Phaser's Major Components Used:
// - Physic System: Movement and collision
// - Text objects (& BitmapText): Display titles and text
// - Timers: For Countdowns and delayed calls
// - Cameras: Scene Transition and effects
// - Animation Manager: Animation transition from one state to another
// - Graphics: For Trail Segments


// Tilt
// - Features a dynamic trail system with delayed collision activation and continuous visual trails.
// - The game supports both Player vs Player and Player vs AI modes. The AI opponent is designed to intelligently maximize 
//   avoiding walls and make strategic turns.

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
            debug: false
        }
    },
    scene: [ Load, Menu, Instructions, Credits, Play, GameOver]
}

let game = new Phaser.Game(config)

let { width, height } = game.config