class Editor {
  /**
   *
   * @param {string} containerId - Id of container
   * @param {object} options - Height and width of container
   */
  constructor(containerId, options) {
    this.canvas = document.createElement("canvas");
    this.container = document.getElementById(containerId);
    this.options = options || {};
    this.canvas.width = this.options.width || 640;
    this.canvas.height = 480 || 450;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.recentTile = "B";
    this.size = 20;
    this.currentIndex = 1;
    this.mapArr = [
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
    ];

    this.values = [
      20,
      60,
      100,
      140,
      180,
      220,
      260,
      300,
      340,
      380,
      420,
      460,
      500,
    ];
    this.tiles = [
      "B",
      "T",
      "R",
      "P",
      "+",
      "=",
      "D",
      "W",
      "F",
      "f",
      "G",
      "L",
      "b",
    ];
    this.sprites = {
      //player
      player: new Sprite(0, 2), //player in begining
      player0r: new Sprite(1, 2), // player in left
      player0l: new Sprite(5, 2), // player in left
      player1r: new Sprite(2, 2), // player in right
      player1l: new Sprite(6, 2), // player in right
      playerjr: new Sprite(6, 4), // player in jetpack right
      playerjl: new Sprite(5, 4), // player in jetpack left

      // enemy and bullet
      bullet: new Sprite(3, 14, 20, 10),
      spider: new Sprite(2, 10, 100, 64),

      // info board
      TS: new Sprite(3, 4.01), // trophy for infoboard
      ZS: new Sprite(3, 1), // gun for infoboard

      // Map items
      b: new Sprite(0, 0), // Blank
      B: new Sprite(1, 0), // red brick
      C: new Sprite(6, 1), // crown
      D: new Sprite(0, 1), // blue gem
      E: new Sprite(4, 1), // ring
      F: new AnimatedSprite(0, 13, 64, 32, 3), // fire
      f: new AnimatedSprite(0, 5, 64, 64, 4), // fire in round shape
      G: new Sprite(3, 0), // brown pattern brick
      J: new Sprite(8, 1), // jetpack
      L: new Sprite(2, 0), // blue brick
      P: new Sprite(2, 1), // purple orbs
      Q: new Sprite(5, 0), // blue brick
      R: new Sprite(1, 1), // red gem
      S: new AnimatedSprite(0, 6, 64, 64, 4), // purple wires
      T: new AnimatedSprite(0, 4, 64, 64, 5), // trophy with spark
      W: new AnimatedSprite(0, 7, 64, 64, 3), // water
      Y: new Sprite(5, 1), // wand
      Z: new Sprite(3, 1), // gun
      "/": new Sprite(7, 0), // triangular brown pattern
      "\\": new Sprite(8, 0), // triangular brown pattern
      "-": new Sprite(4, 8), // purple platform
      "=": new Sprite(1, 8), // door
      "+": new Sprite(2, 8), // pipe left
      "*": new Sprite(3, 8), // pipe down
    };

    this.start();
  }

  /**
   * draws grid in canvas and add eventlistener
   */

  start() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "yellow";
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(this.values[0], 345, 32, 32);
    this.canvas.addEventListener("click", this.handler.bind(this));
    window.addEventListener("keydown", this.handlerStart.bind(this));

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.strokeRect(i * 32, j * 32, 32, 32);
      }
    }

    this.showTiles();
  }

  /**
   *
   * @param {event} e - event when key pressed
   */
  handlerStart(e) {
    if (e.code === "Space") {
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = "yellow";
      this.ctx.strokeRect(this.values[this.currentIndex], 345, 32, 32);
      this.markTile(this.currentIndex);
      this.recentTile = this.tiles[this.currentIndex];
      this.currentIndex += 1;
      if (this.currentIndex > this.values.length - 1) {
        this.currentIndex = 0;
      }
    }

    if (e.code === "Escape") {
      localStorage.setItem("map", JSON.stringify(this.mapArr));
      this.canvas.remove();
      let splashdiv = document.getElementById("splashdiv");
      if (splashdiv) {
        this.container.removeChild(splashdiv);
      }
      window.removeEventListener("keydown", this.handlerStart);
      game = new Game("container", { width: 640, height: 385 });
    }
  }

  markTile(cIndex) {
    this.ctx.strokeStyle = "#FFFFFF";
    for (let i = 0; i < this.values.length; i++) {
      if (i != cIndex) {
        this.ctx.strokeRect(this.values[i], 345, 32, 32);
      }
    }
  }

  /**
   *
   * @param {number} x - x position in canvas
   * @param {number} y - y position in canvas
   * @param {char} tile - character of tile
   */
  savePoint(x, y, tile) {
    if (tile == "player") {
      tile = "p";
    }

    let flag = 0;
    let temp = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];
    for (let k = 0; k < 20; k++) {
      temp[k] = this.mapArr[y][k];
    }

    if (flag == 0) {
      for (let i = 0; i < 10; i++) {
        if (i === y) {
          for (let j = 0; j < 20; j++) {
            if (j === x) {
              temp[j] = tile;
            }
          }
        }
      }
    }

    this.mapArr[y] = temp.join("");
  }

  /**
   *
   * @param {event} e - event when clicked in canvas
   */
  handler(e) {
    let x = Math.floor((e.pageX - 200) / 32);
    let y = Math.floor((e.pageY - 150) / 32);

    if (x < 20 && y < 10) {
      if (this.recentTile == "b") {
        this.recentTile = " ";
        this.savePoint(x, y, this.recentTile);
      } else {
        this.savePoint(x, y, this.recentTile);
      }

      x = x * 32;
      y = y * 32;

      this.ctx.clearRect(x, y, 32, 32);
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.fillRect(x, y, 32, 32);
      this.ctx.strokeRect(x, y, 32, 32);

      if (this.recentTile != " ") {
        this.sprites[this.recentTile].draw(this.ctx, x, y);
      }
    }

    if (y >= 10 && y <= 11) {
      if (x >= 17 && x <= 19) {
        this.clear();
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 10; j++) {
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.strokeRect(i * 32, j * 32, 32, 32);
          }
        }
        this.mapArr = [
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
          "                    ",
        ];
        this.recentTile = "B";
        this.showTiles();
      }
    }
  }

  /**
   * Shows tiles for selection
   */
  showTiles() {
    this.ctx.strokeStyle = "#FFFFFF";
    for (let i = 0; i < this.values.length; i++) {
      this.ctx.strokeRect(this.values[i], 345, 32, 32);
      this.sprites[this.tiles[i]].draw(this.ctx, this.values[i], 345);
    }
    this.ctx.strokeRect(550, 340, 80, 45);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(550, 340, 80, 45);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "20px arcadeclassic";
    this.ctx.fillText("ERASE", 560, 365);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText("SPACE:  select  tiles", 20, 410);
    this.ctx.fillText("Draw   tiles   by  click", 300, 410);
    this.ctx.fillText("ESCAPE:  To s ave  map", 20, 430);
    this.ctx.fillText("Click  on  Erase to  clear ", 300, 430);
    this.ctx.fillText(
      "Note: You  have  to  erase  your  level  to  play   original level ",
      40,
      460
    );
    this.ctx.fillStyle = "#000";
  }

  /**
   * clears the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
