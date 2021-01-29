class Game {
  constructor(containerId, options) {
    this.input;
    this.score;
    this.level;
    this.canvas;
    this.frame = 1;
    this.animator;
    this.lives = 3;
    this.restart = false;
    this.nextLevel = false;
    this.currentLevel = 2;
    this.lastLevel = 2;
    this.options = options;
    this.containerId = containerId;
    this.hasGameFinished = false;
    this.start();
  }

  loop() {
    if (this.update()) {
      this.render();
      this.animator = window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  update() {
    if (this.lives < 0) {
      this.end();
      window.cancelAnimationFrame(this.animator);
      return false;
    }

    if (this.nextLevel) {
      this.currentLevel++;
      if (this.currentLevel > this.lastLevel) {
        this.end();
        window.cancelAnimationFrame(this.animator);
        return false;
      }
    }

    if (this.restart || this.nextLevel) {
      this.restart = false;
      this.nextLevel = false;
      this.level = new Level(this, this.currentLevel);
      this.input.clear();
      this.frame = 1;
    }

    if (!this.level.isLevelingUp) {
      this.input.update();
    }

    this.score.update();
    this.level.update();
    this.frame++;
    return true;
  }

  render() {
    this.level.draw();
  }

  start() {
    const that = this;

    initGameObjects();
    that.loop();

    function initGameObjects() {
      that.input = new Input();
      that.score = new Score(that.containerId, that);
      that.canvas = new Canvas(that.containerId, that.options);
      that.level = new Level(that, that.currentLevel);
    }
  }

  end() {
    
  }
}
