class Bike extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, initialDirection, controls) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    // Determine if this is an AI bike
    this.isAI = (controls === null);

    // Store the intended starting direction
    this.initialDirection = initialDirection;
    this.adjustBodySize(initialDirection);

    // Speed at which the bike moves
    this.bikeVelocity = 100;

    this.keys = controls || {};

    // Initialize the bike's state machine.
    // Start in the idle state for the countdown, then transition to the chosen initial direction.
    this.bikeFSM = new StateMachine('idle', {
      idle: new IdleState(),
      left: new LeftState(),
      right: new RightState(),
      up: new UpState(),
      down: new DownState(),
      explode: new ExplodeState()
    }, [scene, this]);
  }

  // Runs the state machine
  update(){
    this.bikeFSM.step()
  }

  // Gets bike current directions
  getDirection() {
    return this.currentDirection;
  }

  // Adjust Physics Body Dimensions
  adjustBodySize(direction) {
    this.currentDirection = direction;
    if (direction === "up" || direction === "down") {
      this.body.setSize(this.width / 2 - 5, this.height - 15, true); // Narrow hitbox for vertical movement
    } else if (direction === "left" || direction === "right") {
      this.body.setSize(this.width - 15, this.height / 2 - 5, true); // Wider hitbox for horizontal movement
    }
  }
}
  
class IdleState extends State {
  enter(scene, bike) {
    bike.setVelocity(0, 0);

    if(bike.initialDirection === "left"){
      bike.setAngle(0)
      bike.anims.play('left', true); // Appropriate animation
    } else {
      bike.setAngle(0)
      bike.anims.play('right', true); // Appropriate animation
    }
    // Start a 3-second countdown. After countdown, transition to the bike's initial movement state.
    bike.idleTimer = scene.time.delayedCall(3000, () => {
      this.stateMachine.transition(bike.initialDirection);
    }, null, this);
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
    bike.setAngle(0); // Bike's facing direction
    bike.direction = 'left';
    bike.setVelocity(-bike.bikeVelocity, 0); // Bike speed
    bike.anims.play('left', true);
    bike.adjustBodySize("left");
  }
  execute(scene, bike) {
    // While moving left, only allow vertical turns.
    if(!bike.isAI){
      if (bike.keys.up && Phaser.Input.Keyboard.JustDown(bike.keys.up)) {
        this.stateMachine.transition('up');
        return;
      }
      if (bike.keys.down && Phaser.Input.Keyboard.JustDown(bike.keys.down)) {
        this.stateMachine.transition('down');
        return;
      }
    }
  }
}
  
class RightState extends State {
  enter(scene, bike) {
    bike.setAngle(0);
    bike.direction = 'right';
    bike.setVelocity(bike.bikeVelocity, 0);
    bike.anims.play('right', true);
    bike.adjustBodySize("right");
  }
  execute(scene, bike) {
    // While moving right, only allow vertical turns.
    if(!bike.isAI){
      if (bike.keys.up && Phaser.Input.Keyboard.JustDown(bike.keys.up)) {
        this.stateMachine.transition('up');
        return;
      }
      if (bike.keys.down && Phaser.Input.Keyboard.JustDown(bike.keys.down)) {
        this.stateMachine.transition('down');
        return;
      }
    }
  }
}
  
class UpState extends State {
  enter(scene, bike) {
    bike.setAngle(0);
    bike.direction = 'up';
    bike.setVelocity(0, -bike.bikeVelocity);
    bike.anims.play('up', true);
    bike.setScale(0.80);
    bike.adjustBodySize("up");
  }
  execute(scene, bike) {
    // While moving up, only allow horizontal turns.
    if(!bike.isAI){
      if (bike.keys.left && Phaser.Input.Keyboard.JustDown(bike.keys.left)) {
        this.stateMachine.transition('left');
        return;
      }
      if (bike.keys.right && Phaser.Input.Keyboard.JustDown(bike.keys.right)) {
        this.stateMachine.transition('right');
        return;
      }
    }
  }
}
  
class DownState extends State {
  enter(scene, bike) {
    bike.setAngle(0);
    bike.direction = 'down';
    bike.setVelocity(0, bike.bikeVelocity);
    bike.anims.play('down', true);
    bike.setScale(0.80);
    bike.adjustBodySize("down");
  }
  execute(scene, bike) {
    // While moving down, only allow horizontal turns.
    if(!bike.isAI){
      if (bike.keys.left && Phaser.Input.Keyboard.JustDown(bike.keys.left)) {
        this.stateMachine.transition('left');
        return;
      }
      if (bike.keys.right && Phaser.Input.Keyboard.JustDown(bike.keys.right)) {
        this.stateMachine.transition('right');
        return;
      }
    }
  }
}
  
class ExplodeState extends State {
  enter(scene, bike) {
    // Stop movement and play the explosion animation.
    bike.setVelocity(0, 0);
    bike.anims.play('explode');
    scene

    scene.cameras.main.shake(500, 0.02); // Screen shake effect

    bike.body.checkCollision.none = true;
    bike.bikeFSM.active = false;
  }
}