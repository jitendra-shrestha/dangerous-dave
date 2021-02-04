class Level {
  /**
   *
   * @param {object} game - object of game
   * @param {number} n - current level
   */
  constructor(game, n) {
    this.game = game;
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
      this.map = new LevelMap(n);
    } else {
      this.map = new LevelMap(n, this.cMap);
    }

    this.tiles = [];
    this.entities = [];
    this.isLevelingUp = false;
    this.player = new Player(this.game, this.map.player);
    this.entities.push(this.player);
    if (this.map.enemies) {
      for (let enemy of this.map.enemies) {
        this.entities.push(
          new Enemy(this.game, enemy.x * Tile.size, enemy.y * Tile.size)
        );
      }
    }
  }

  /**
   *
   * @param {number} x - x position
   * @param {number} y - y postion
   * returns without decimal
   */
  getCoords(x, y) {
    const i = Math.floor(x / Tile.size);
    const j = Math.floor(y / Tile.size);
    return [i, j];
  }

  /**
   *
   * @param {number} i - x position
   * @param {number} j - y position
   * returns true if in boundary or vice versa
   */
  inBounds(i, j) {
    if (i < 0 || i >= this.map.tiles[0].length) {
      return false;
    }
    if (j < 0 || j >= this.map.tiles.length) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param {number} x - x position
   * @param {number} y - y position
   * returns tile in this position
   */
  getTile(x, y) {
    const [i, j] = this.getCoords(x, y);

    if (!this.inBounds(i, j)) {
      return " ";
    }
    return this.map.tiles[j][i];
  }

  /**
   *
   * @param {number} x - x position
   * @param {number} y - y position
   * clears tile in this position
   */
  clearTile(x, y) {
    const [i, j] = this.getCoords(x, y);

    if (this.inBounds(i, j)) {
      const line = this.map.tiles[j];
      this.map.tiles[j] =
        line.slice(0, +(i - 1) + 1 || undefined) + " " + line.slice(i + 1);
    }
  }

  /**
   * updates the entities
   */
  update() {
    this.entities.map((entity) => entity.update());
  }

  /**
   * Draws tiles in screen
   */
  draw() {
    if (this.isLevelingUp) {
      this.showLevelUpScreen();
      return;
    }

    let w = 18 * Tile.size;
    let dx = Math.floor(this.player.x / w) * w;
    this.game.canvas.setScroll(dx);
    for (let j = 0; j < this.map.tiles.length; j++) {
      const line = this.map.tiles[j];
      for (let i = 0; i < line.length; i++) {
        const tile = line[i];
        this.drawTile(tile, i, j);
      }
    }

    for (let entity of this.entities) {
      if (entity.dead) {
        let index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
      }
    }

    this.entities.map((entity) => entity.draw());

    this.drawInfoBoard();
  }

  /**
   *
   * @param {char} tile - character for drawing tile
   * @param {number} i - x position in canvas
   * @param {number} j - y position in canvas
   */
  drawTile(tile, i, j) {
    this.game.canvas.drawTile(tile, i, j);
  }

  /**
   * Shows Information of player
   */

  drawInfoBoard() {
    let canvas = this.game.canvas.canvas;
    let ctx = this.game.canvas.ctx;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, canvas.height - 76, canvas.width, 4);

    if (this.isLevelingUp) return;

    let jetpackFuel = this.player.jetpackFuel;

    if (this.player.hasJetpack) {
      ctx.fillStyle = "#FFF003";
      ctx.fillRect(canvas.width / 2 - 140, canvas.height - 60, 210, 20);
      ctx.fillStyle = "#FF3A00";
      ctx.fillRect(
        canvas.width / 2 - 135,
        canvas.height - 58,
        jetpackFuel * 2,
        15
      );
    }

    if (this.player.hasTrophy || this.player.hasGun || this.player.hasJetpack) {
      this.drawInfo();
    }
  }

  /**
   * Shows status of trophy, gun , jetpack of player
   */

  drawInfo() {
    if (this.player.hasTrophy) {
      this.game.canvas.drawLetter("TS", 2.5, 10.7);

      this.game.canvas.drawLetter("g", 4, 11);
      this.game.canvas.drawLetter("o", 4.7, 11);

      this.game.canvas.drawLetter("t", 6.1, 11);
      this.game.canvas.drawLetter("h", 6.8, 11);
      this.game.canvas.drawLetter("r", 7.5, 11);
      this.game.canvas.drawLetter("u", 8.2, 11);

      this.game.canvas.drawLetter("t", 9.6, 11);
      this.game.canvas.drawLetter("h", 10.3, 11);
      this.game.canvas.drawLetter("e", 11, 11);

      this.game.canvas.drawLetter("d", 12.4, 11);
      this.game.canvas.drawLetter("o", 13.1, 11);
      this.game.canvas.drawLetter("o", 13.8, 11);
      this.game.canvas.drawLetter("r", 14.5, 11);
      this.game.canvas.drawLetter("ex", 15.2, 11);

      this.game.canvas.drawLetter("TS", 16.5, 10.7);
    }
    if (this.player.hasGun) {
      this.game.canvas.drawLetter("ZS", 18, 9.9);
      this.game.canvas.drawLetter("g", 15, 10);
      this.game.canvas.drawLetter("u", 15.7, 10);
      this.game.canvas.drawLetter("n", 16.4, 10);
    }
    if (this.player.hasJetpack) {
      this.game.canvas.drawLetter("j", 0, 10);
      this.game.canvas.drawLetter("e", 0.7, 10);
      this.game.canvas.drawLetter("t", 1.4, 10);
      this.game.canvas.drawLetter("p", 2.1, 10);
      this.game.canvas.drawLetter("a", 2.8, 10);
      this.game.canvas.drawLetter("c", 3.5, 10);
      this.game.canvas.drawLetter("k", 4.2, 10);
    }
  }

  /**
   * Creates levelup screen
   */
  showLevelUpScreen() {
    this.game.canvas.view.x = 0;
    this.game.canvas.clear();

    this.map.tiles = [
      "                    ",
      "                    ",
      "                    ",
      "LLLLLLLLLLLLLLLLLLLL",
      "=                   ",
      "LLLLLLLLLLLLLLLLLLLL",
      "                    ",
      "                    ",
      "                    ",
      "                    ",
    ];

    for (let j = 0; j < this.map.tiles.length; j++) {
      const line = this.map.tiles[j];
      for (let i = 0; i < line.length; i++) {
        const tile = line[i];
        this.drawTile(tile, i, j);
      }
    }

    this.drawInfoBoard();

    this.player.draw();
    this.player.isUsingJetpack = false;
    this.player.x += 3;
    this.player.direction = 1;
    this.player.adjustWalk("right");

    if (this.player.x >= this.game.canvas.canvas.width) {
      this.game.nextLevel = true;
      this.isLevelingUp = false;
    }
  }
}
