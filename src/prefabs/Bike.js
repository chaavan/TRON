class Bike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Adjust physics body size as needed
      this.body.setSize(this.width - 10 , this.height / 2 - 10, true);
      this.body.setCollideWorldBounds(true);
  
      // Store the intended starting direction (after countdown)
      this.initialDirection = 'left';
      // Speed at which the bike moves (in pixels per second)
      this.bikeVelocity = 100;

      this.body.onWorldBounds = true;
      // Listen for worldbounds collisions.
      this.scene.physics.world.on('worldbounds', (body, up, down, left, right) => {
          scene.scene.start('gameOverScene')
      }, this)

      // Initialize the bike's state machine.
      // Start in the idle state for the countdown, then transition to the chosen initial direction.
      scene.bikeFSM = new StateMachine('idle', {
        idle: new IdleState(),
        left: new LeftState(),
        right: new RightState(),
        up: new UpState(),
        down: new DownState(),
        explode: new ExplodeState()
      }, [scene, this]);
    }
}
  
class IdleState extends State {
    enter(scene, bike) {
      // Stop movement and play idle animation.
      bike.setVelocity(0, 0);
      bike.anims.play('idle', true);
  
      // Start a 3-second countdown. After countdown, transition to the bike's initial movement state.
      bike.idleTimer = scene.time.delayedCall(3000, () => {
        this.stateMachine.transition(bike.initialDirection);
      }, null, this);
    }
    execute(scene, bike) {
      // During the countdown, no input is processed.
    }
    exit(scene, bike) {
      // Clean up the timer when leaving the idle state.
        if (bike.idleTimer) {
            bike.idleTimer.remove();
            bike.idleTimer = null;
        }
    }
}
  
class LeftState extends State {
    enter(scene, bike) {
      bike.setAngle(270);
      bike.direction = 'left';
      bike.setVelocity(-bike.bikeVelocity, 0);
    //   bike.body.setSize(this.width - 10 , this.height / 2 - 10);
      bike.anims.play('left', true);
    }
    execute(scene, bike) {
      // While moving left, only allow vertical turns.
      if (Phaser.Input.Keyboard.JustDown(scene.keys.up)) {
        this.stateMachine.transition('up');
        return;
      }
      if (Phaser.Input.Keyboard.JustDown(scene.keys.down)) {
        this.stateMachine.transition('down');
        return;
      }
      // Continue moving left.
    }
  }
  
  class RightState extends State {
    enter(scene, bike) {
      bike.setAngle(90);
      bike.direction = 'right';
      bike.setVelocity(bike.bikeVelocity, 0);
      bike.anims.play('right', true);
    }
    execute(scene, bike) {
      // While moving right, only allow vertical turns.
      if (Phaser.Input.Keyboard.JustDown(scene.keys.up)) {
        this.stateMachine.transition('up');
        return;
      }
      if (Phaser.Input.Keyboard.JustDown(scene.keys.down)) {
        this.stateMachine.transition('down');
        return;
      }
    }
  }
  
  class UpState extends State {
    enter(scene, bike) {
      bike.body
      .setSize(this.width/2, this.height)
      bike.setAngle(0);
      bike.direction = 'up';
      bike.setVelocity(0, -bike.bikeVelocity);
    //   bike.anims.play('up', true);
    }
    execute(scene, bike) {
      // While moving up, only allow horizontal turns.
      if (Phaser.Input.Keyboard.JustDown(scene.keys.left)) {
        this.stateMachine.transition('left');
        return;
      }
      if (Phaser.Input.Keyboard.JustDown(scene.keys.right)) {
        this.stateMachine.transition('right');
        return;
      }
    }
  }
  
  class DownState extends State {
    enter(scene, bike) {
      bike.setAngle(180);
      bike.direction = 'down';
      bike.setVelocity(0, bike.bikeVelocity);
    //   bike.anims.play('down', true);
    }
    execute(scene, bike) {
      // While moving down, only allow horizontal turns.
      if (Phaser.Input.Keyboard.JustDown(scene.keys.left)) {
        this.stateMachine.transition('left');
        return;
      }
      if (Phaser.Input.Keyboard.JustDown(scene.keys.right)) {
        this.stateMachine.transition('right');
        return;
      }
    }
  }
  
  class ExplodeState extends State {
    enter(scene, bike) {
      // Stop movement and play the explosion animation.
      bike.setVelocity(0, 0);
      bike.anims.play('explode');
      // Optionally, add logic here to remove the bike or restart the game after the animation.
    }
    execute(scene, bike) {
      // Monitor explosion progress if needed.
    }
  }
  