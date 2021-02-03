class Game {
  constructor(containerId, options) {
    this.input;
    this.sound;
    this.score;
    this.level;
    this.canvas;
    this.frame = 1;
    this.animator;
    this.lives = 3;

    this.flag = 0;
    var mapArr = localStorage.getItem("map");
    if (mapArr) {
      this.cMap = JSON.parse(mapArr);
      for (let i = 0; i < 10; i++) {
        if (this.cMap[i] != "                    ") {
          this.flag = 1;
        }
      }
    }

    if (this.flag == 0) {
      this.restart = false;
      this.nextLevel = false;
      this.currentLevel = 0;
      this.lastLevel = 3;
      this.options = options;
      this.containerId = containerId;
      this.hasGameFinished = false;
    } else {
      this.restart = false;
      this.nextLevel = false;
      this.currentLevel = 4;
      this.lastLevel = 4;
      this.options = options;
      this.containerId = containerId;
      this.hasGameFinished = false;
    }

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

    const splashdiv = document.createElement("div");
    const container = document.getElementById(this.containerId);
    splashdiv.setAttribute("id", "splashdiv");
    splashdiv.style.width = 640 + "px";
    splashdiv.style.height = 400 + "px";
    splashdiv.style.backgroundColor = "#000000";

    container.appendChild(splashdiv);

    const p = document.createElement("p");
    p.setAttribute("class", "context");
    splashdiv.appendChild(p);
    p.innerHTML = "Press Space  to Play <br> Press Enter to Level Editor";
    const p2 = document.createElement("p");
    p2.setAttribute("class", "controls");
    splashdiv.appendChild(p2);
    p2.innerHTML =
      "Controls <br>  Move: Arrow Keys  <br> Z: Shoot <br> X: UseJetpack";

    const img = document.createElement("img");
    splashdiv.appendChild(img);
    img.style.width = 220 + "px";
    img.style.height = 90 + "px";
    img.src = "assets/images/dangerous dave title.gif";
    img.style.position = "absolute";
    img.style.left = 640 / 2 - 110 + "px";
    img.style.top = 30 + "px";

    const img2 = document.createElement("img");
    splashdiv.appendChild(img2);
    img2.style.width = 300 + "px";
    img2.style.height = 150 + "px";
    img2.src = "assets/images/dave_background.gif";
    img2.style.position = "absolute";
    img2.style.left = 640 / 2 - 150 + "px";
    img2.style.top = 150 + "px";

    window.addEventListener("keydown", handler);

    function handler(e) {
      if (e.keyCode === 32) {
        container.removeChild(splashdiv);
        window.removeEventListener("keydown", handler);
        initGameObjects();
        that.loop();
      }
      if (e.keyCode === 13) {
        if (splashdiv) {
          container.removeChild(splashdiv);
        }
        window.removeEventListener("keydown", handler);
        levelEditor();
      }
    }

    // initGameObjects();
    // that.loop();

    // levelEditor();

    function initGameObjects() {
      that.input = new Input();
      that.audio = new Sound();
      that.score = new Score(that.containerId, that);
      that.canvas = new Canvas(that.containerId, that.options);
      that.level = new Level(that, that.currentLevel);
    }

    function levelEditor() {
      that.canvas = new Editor(that.containerId, that.options);
    }
  }

  end() {
    const that = this;

    const gameOverCanvas = document.createElement("canvas");
    that.canvas.canvas.insertAdjacentElement("afterend", gameOverCanvas);
    const endCtx = gameOverCanvas.getContext("2d");

    gameOverCanvas.width = 400;
    gameOverCanvas.height = 300;
    gameOverCanvas.classList.add("last-canvas");

    let inputBuffer = "";
    drawInputBoard();
    window.addEventListener("keydown", endScreenEventHandler);

    function endScreenEventHandler(e) {
      let input = String.fromCharCode(e.keyCode);
      if (/[a-zA-Z]/.test(input)) {
        if (inputBuffer.length < 5) {
          inputBuffer += input;
        }
      }

      if (e.keyCode === 8) {
        inputBuffer = inputBuffer.slice(0, -1);
      }

      if (e.keyCode === 13 && inputBuffer !== "") {
        saveScore({ name: inputBuffer, score: that.score.value });
        window.removeEventListener("keydown", endScreenEventHandler);
        drawScoreBoard();
        that.hasGameFinished = true;
        return;
      }

      drawInputBoard();
    }

    function drawInputBoard() {
      endCtx.fillStyle = "#f5f5f5";
      endCtx.fillRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);
      endCtx.fillStyle = "#a62c07";
      endCtx.font = "20px arcadeclassic";
      endCtx.textAlign = "center";

      let cursor = inputBuffer.length < 5 ? "|" : "";
      endCtx.fillText(
        "NAME:" + inputBuffer + cursor,
        gameOverCanvas.width / 2,
        130
      );
      endCtx.fillText(
        "SCORE:" + that.score.value,
        gameOverCanvas.width / 2,
        180
      );
      endCtx.font = "15px arcadeclassic";
      endCtx.fillText("PRESS ENTER TO SAVE!", gameOverCanvas.width / 2, 270);
    }

    function drawScoreBoard() {
      endCtx.fillStyle = "#f5f5f5";
      endCtx.fillRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);
      endCtx.fillStyle = "#a62c07";
      endCtx.textAlign = "center";
      endCtx.font = "30px arcadeclassic";
      endCtx.fillText("HIGHSCORES", gameOverCanvas.width / 2, 50);

      const scoreInfo = readScore();
      let scoreY = 50;

      let scoreCounter = scoreInfo.length > 5 ? 5 : scoreInfo.length;

      for (let i = 0; i < scoreCounter; i++) {
        endCtx.textAlign = "left";
        endCtx.font = "20px arcadeclassic";
        endCtx.fillText(i + 1, 120, scoreY + 50);
        endCtx.fillText(scoreInfo[i].name, 180, scoreY + 50);
        endCtx.textAlign = "right";
        endCtx.fillText(scoreInfo[i].score, 320, scoreY + 50);
        scoreY += 30;
      }

      endCtx.font = "15px arcadeclassic";
      endCtx.textAlign = "center";
      endCtx.fillText("PRESS ENTER TO RESTART!", gameOverCanvas.width / 2, 280);
    }

    function saveScore(scoreProp) {
      let scoreInfo;

      if (localStorage.getItem("scoreInfo") === null) {
        scoreInfo = [];
      } else {
        scoreInfo = JSON.parse(localStorage.getItem("scoreInfo"));
      }

      scoreInfo.push(scoreProp);
      scoreInfo.sort((a, b) => b.score - a.score);
      localStorage.setItem("scoreInfo", JSON.stringify(scoreInfo));
    }

    function readScore() {
      let scoreInfo;

      if (localStorage.getItem("scoreInfo") === null) {
        scoreInfo = [];
      } else {
        scoreInfo = JSON.parse(localStorage.getItem("scoreInfo"));
      }

      return scoreInfo;
    }
  }
}
