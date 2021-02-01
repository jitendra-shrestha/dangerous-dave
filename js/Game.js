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
    this.currentLevel = 0;
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

    const splashdiv = document.createElement('div');
    const container = document.getElementById(this.containerId);
    splashdiv.style.width = 640 + 'px';
    splashdiv.style.height = 385 + 'px';
    splashdiv.style.backgroundColor = '#000000';

    container.appendChild(splashdiv);

    const p = document.createElement('p');
    splashdiv.appendChild(p);
    p.innerHTML ="Press Space  to continue";
    
    const img = document.createElement('img');
    splashdiv.appendChild(img);
    img.style.width = 220 + 'px';
    img.style.height = 90 + 'px';
    img.src = 'assets/images/dangerous dave title.gif';
    img.style.position ='absolute';
    img.style.left = (640/2 - 110) + 'px';
    img.style.top = 30 + 'px';

    const img2 = document.createElement('img');
    splashdiv.appendChild(img2);
    img2.style.width = 300 + 'px';
    img2.style.height = 150+ 'px';
    img2.src = 'assets/images/dave_background.gif';
    img2.style.position ='absolute';
    img2.style.left = (640/2 - 150) + 'px';
    img2.style.top = 150 + 'px';

    window.addEventListener('keydown', handler);

    function handler(e){
      if (e.keyCode === 32) {
        container.removeChild(splashdiv);
        window.removeEventListener('keydown',handler);
        initGameObjects();
        that.loop();
      }
    }

    // initGameObjects();
    // that.loop();

    function initGameObjects() {
      that.input = new Input();
      that.score = new Score(that.containerId, that);
      that.canvas = new Canvas(that.containerId, that.options);
      that.level = new Level(that, that.currentLevel);
    }
  }

  end() {
    const that = this;
    const gameOverCanvas = document.createElement('canvas');
    that.canvas.canvas.insertAdjacentElement('afterend', gameOverCanvas);
    const endCtx = gameOverCanvas.getContext('2d');


    gameOverCanvas.width = 400;
    gameOverCanvas.height = 300;
    gameOverCanvas.classList.add('last-canvas');
    endCtx.fillStyle = '#f5f5f5';
    endCtx.fillRect(0, 0,  gameOverCanvas.width,  gameOverCanvas.height);
    endCtx.fillStyle = '#a62c07';
    endCtx.font = '30px arcadeclassic';
    endCtx.fillText('GAME OVER', 130, 100);
    endCtx.fillText('PRESS ENTER TO RESTART!', 30, 150);

    that.hasGameFinished = true;
  }
}
