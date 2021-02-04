class Score {
  /**
   *
   * @param {string} containerId - id of the container
   * @param {object} game - object of game
   */
  constructor(containerId, game) {
    this.value = 0;
    this.game = game;
    this.canvas = document.createElement("canvas");
    this.container = document.getElementById(containerId);
    this.canvas.width = 640;
    this.canvas.height = 40;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * updates scoreboard according to the scores
   */
  update() {
    this.drawBoard();
  }

  /**
   *
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {char} sprite - character of tile
   */
  drawSprite(x, y, sprite) {
    this.sprites[sprite].draw(this.ctx, x, y);
  }

  /**
   * Draws Score board
   */

  drawBoard() {
    const formatNumberLength = (num, len) => {
      let r = "" + num;
      while (r.length < len) {
        r = "0" + r;
      }
      return r;
    };

    let info = "";
    let xPosition = 275;
    if (this.game.level.isLevelingUp) {
      xPosition = this.canvas.width / 2;
      info = `GOOD WORK! ONLY ${
        this.game.lastLevel - this.game.currentLevel
      } MORE TO GO!`;
      if (this.game.currentLevel === this.game.lastLevel) {
        info = "CONGRATULATIONS!";
      }
    }
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, this.canvas.height - 4, this.canvas.width, 4);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "40px arcadeclassic";
    this.ctx.textAlign = "center";

    this.ctx.fillText(info, xPosition, 28);
    let sprite = new Image();
    sprite.src = "assets/sprites/sprite.png";

    if (!this.game.level.isLevelingUp) {
      this.ctx.drawImage(sprite, 415, 704, 32, 50, 2, 0, 20, 30);
      this.ctx.drawImage(sprite, 36, 704, 32, 50, 22, 0, 20, 30);
      this.ctx.drawImage(sprite, 321, 704, 32, 50, 42, 0, 20, 30);
      this.ctx.drawImage(sprite, 388, 704, 32, 50, 62, 0, 20, 30);
      this.ctx.drawImage(sprite, 99, 704, 32, 50, 82, 0, 20, 30);
      this.ctx.drawImage(sprite, 553, 704, 20, 50, 102, 0, 20, 30);

      let totalScore = String(formatNumberLength(this.value, 5));
      let xPos = 120;
      let sxPos;
      for (let i = 0; i < 5; i++) {
        let num = totalScore[i];
        switch (num) {
          case "0":
            sxPos = 0;
            break;
          case "1":
            sxPos = 41;
            break;
          case "2":
            sxPos = 66;
            break;
          case "3":
            sxPos = 100;
            break;
          case "4":
            sxPos = 129;
            break;
          case "5":
            sxPos = 163;
            break;
          case "6":
            sxPos = 196;
            break;
          case "7":
            sxPos = 226;
            break;
          case "8":
            sxPos = 257;
            break;
          case "9":
            sxPos = 293;
            break;
          default:
            sxPos = 0;
            break;
        }
        this.ctx.drawImage(sprite, sxPos, 753, 32, 45, xPos, 0, 25, 30);
        xPos += 21;
      }

      this.ctx.drawImage(sprite, 258, 704, 32, 50, 245, 0, 20, 30);
      this.ctx.drawImage(sprite, 99, 704, 32, 50, 265, 0, 20, 30);
      this.ctx.drawImage(sprite, 517, 704, 32, 50, 285, 0, 22, 30);
      this.ctx.drawImage(sprite, 99, 704, 32, 50, 306, 0, 20, 30);
      this.ctx.drawImage(sprite, 258, 704, 31, 50, 326, 0, 20, 30);

      if (this.game.currentLevel == 0) {
        this.ctx.drawImage(sprite, 0, 753, 32, 45, 365, 0, 21, 30);
        this.ctx.drawImage(sprite, 41, 753, 23, 45, 390, 0, 20, 30);
      }

      if (this.game.currentLevel == 1) {
        this.ctx.drawImage(sprite, 0, 753, 32, 45, 365, 0, 21, 30);
        this.ctx.drawImage(sprite, 66, 753, 23, 45, 390, 0, 22, 30);
      }
      if (this.game.currentLevel == 2) {
        this.ctx.drawImage(sprite, 0, 753, 32, 45, 365, 0, 21, 30);
        this.ctx.drawImage(sprite, 100, 753, 23, 45, 390, 0, 22, 30);
      }
      if (this.game.currentLevel == 3) {
        this.ctx.drawImage(sprite, 0, 753, 32, 45, 365, 0, 21, 30);
        this.ctx.drawImage(sprite, 135, 753, 23, 45, 390, 0, 22, 30);
      }
      this.ctx.drawImage(sprite, 66, 704, 32, 50, 429, 0, 20, 30);
      this.ctx.drawImage(sprite, 0, 704, 32, 50, 451, 0, 20, 30);
      this.ctx.drawImage(sprite, 517, 704, 32, 50, 471, 0, 22, 30);
      this.ctx.drawImage(sprite, 99, 704, 32, 50, 491, 0, 25, 30);
      this.ctx.drawImage(sprite, 415, 704, 31, 50, 515, 0, 20, 30);
      this.ctx.drawImage(sprite, 553, 704, 23, 50, 535, 0, 20, 30);

      if (this.game.lives == 3) {
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 550, 0, 40, 30);
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 580, 0, 40, 30);
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 610, 0, 40, 30);
      }

      if (this.game.lives == 2) {
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 550, 0, 40, 30);
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 580, 0, 40, 30);
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 610, 0, 40, 30);
      }

      if (this.game.lives == 1) {
        this.ctx.drawImage(sprite, 577, 64, 75, 70, 550, 0, 40, 30);
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 580, 0, 40, 30);
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 610, 0, 40, 30);
      }

      if (this.game.lives == 0) {
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 550, 0, 40, 30);
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 580, 0, 40, 30);
        this.ctx.drawImage(sprite, 0, 0, 60, 70, 610, 0, 40, 30);
      }
    }
  }
}
