class Entity {
  /**
   * 
   * @param {object} game - object of game  
   * @param {number} x - x position
   * @param {number} y - y position
   */
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.bullet = null;
  }

  kill() {
    return false;
  }

  /**
   * returns corners of player
   */
  getCorners() {
    const offset = 1;

    const xs = [this.x + offset, this.x + this.width - offset];
    const ys = [this.y, this.y + this.height - offset];

    const corners = [];
    for (let i = 0; i < ys.length; ++i) {
      for (let j = 0; j < xs.length; ++j) {
        corners.push([xs[j], ys[i]]);
      }
    }
    return corners;

  }

  /**
   * returns touched tile by player
   */
  getTouchedTiles() {
    const touchedTiles = [];
    const corners = this.getCorners();

    for (let i = 0; i < corners.length; ++i) {
      touchedTiles.push({
        x: corners[i][0],
        y: corners[i][1],
        tile: this.game.level.getTile(corners[i][0], corners[i][1])
      });
    }
    return touchedTiles;
  }

  /**
   * 
   * @param {number} direction - 1 if right or -1 if left
   */
  clipped(direction) {
    const tiles = this.getTouchedTiles();

    const mapping = {
      up: [tiles[0].tile, tiles[1].tile],
      down: [tiles[2].tile, tiles[3].tile],
      left: [tiles[0].tile, tiles[2].tile],
      right: [tiles[1].tile, tiles[3].tile]
    };

    return mapping[direction].map(Tile.isSolid).reduce((acc, cur) => acc || cur);
  }

  /**
   * 
   * @param {number} x - x position 
   * @param {number} y - y position
   * @param {object} rect - object of game
   */
  static pointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  }

  onScreen() {
    return Entity.pointInRect(this.x, this.y, this.game.canvas.view);
  }

  /**
   * 
   * @param {number} x - x position
   * @param {number} y - y position
   */
  pointCollision(x, y) {
    return Entity.pointInRect(x, y, this);
  }

  /**
   * 
   * @param {object} entity - object of entity
   */

  hasCollided(entity) {
    return (this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.y + this.height > entity.y);
  }

  shoot(vel) {
    let x, y;
    if (this.bullet) return;
    x = this.direction === 1 ? this.x + this.width : this.x;
    y = this.y + this.height / 2;
    this.bullet = new Bullet(this.game, this, x, y, this.direction, vel);
    this.game.level.entities.push(this.bullet);
  }
  
}
