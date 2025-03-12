class Countdown extends Phaser.GameObjects.Text {
  constructor(scene, x, y, onComplete) {
    super(scene, x, y, '', { fontFamily: 'Arial', fontSize: '96px', fill: '#fff' });
    this.setOrigin(0.5);
    scene.add.existing(this);
    this.onComplete = onComplete;
    this.count = 3;
    this.setText(this.count);
    let countdownAudio = scene.sound.add("countdown");
    
    countdownAudio.play()
    // Start the countdown.
    this.startCountdown(scene);
  }

  startCountdown(scene) {
    // Use a timed event to update the countdown every 1 second.
    scene.time.addEvent({
      delay: 1000,
      repeat: 3, // This will fire 4 times total (3, 2, 1, then GO!)
      callback: () => {
        if (this.count > 1) {
          this.count--;
          this.setText(this.count);
        } else if (this.count === 1) {
          // When count reaches 1, next update will display "GO!"
          this.count--;
          this.setText('GO!');
        } else {
          // When count is below 0, remove this countdown and call the callback.
          this.destroy();
          if (this.onComplete) {
            this.onComplete();
          }
        }
      }
    });
  }
}