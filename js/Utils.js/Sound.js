class Sound {
  constructor() {
    this.door = new Audio("assets/audio/door.wav");
    this.enemyExplosion = new Audio("assets/audio/enemy-explosion.wav");
    this.enemyGunshot = new Audio("assets/audio/enemy-gunshot.wav");
    this.jump = new Audio("assets/audio/jump.aac");
    this.jetpack = new Audio("assets/audio/jetpack.mp3");
    this.pickup = new Audio("assets/audio/pickup.mp3");
    this.playerExplosion = new Audio("assets/audio/player-explosion.wav");
    this.playerGunshot = new Audio("assets/audio/player-gunshot.wav");
    this.trophy = new Audio("assets/audio/trophy.mp3");
    this.walk = new Audio("assets/audio/walk.mp3");
    this.walk.volume = 0.7;
  }

  play(sound) {
    this[sound].play();
  }

  stop(sound) {
    this[sound].pause();
    if (this[sound].currentTime) {
      this[sound].currentTime = 0;
    }
  }
}
