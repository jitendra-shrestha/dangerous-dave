class Player extends Entity {
  constructor(game, position) {
    super(game, position.x * Tile.size, position.y * Tile.size);
    this.width = Tile.size - 4;
    this.height = Tile.size;
    this.direction = 1;
    this.blink = 1;
    this.velY = 0;
    this.isJumping = false;
    this.t = 0;
    this.dead = false;
    this.hasTrophy = false;
    this.hasGun = false;
    this.hasJetpack = false;
  }

  update() {
    const { keys } = this.game.input;
    const vel = 2.5;

      if (keys.up.hold) {
        if (!this.isJumping && this.canJump()) {
          this.t = 5;
          this.isJumping = true;
          this.velY = vel;
          this.jumpGoal = this.y - 2 * Tile.size;
        }
      }

      if (!this.isJumping && !this.canJump()) {
        this.y += this.velY;
        this.velY += 0.05;
        this.blink = 0;

        if (this.velY >= vel) {
          this.velY = vel;
          this.blink = 1;
        }
        
        this.adjustFall();
        
      }

      if (this.isJumping) {
        this.y -= this.velY;
        this.velY -= 0.01;
        this.blink= 0;

        if (this.y <= this.jumpGoal) {
          this.y = this.jumpGoal;
          this.isJumping = false;
          this.velY = 0;
          this.blink = 1;
        }
        this.adjustJump();
      }

    if (keys.right.hold) {
      this.x += vel;
      this.direction = 1;
      this.blink = 0;
      this.adjustWalk('right');
    }

    if (keys.left.hold) {
      this.x -= vel;
      this.direction = -1;
      this.blink = 0;
      this.adjustWalk('left');
    }

    this.touchTiles();
  }

  canJump() {
    this.y++;
    const ret = this.clipped('down');
    this.y--;
    return ret;
  }

  /**
   * 
   * @param {number} direction - 1 if right or -1 if left
   */
  adjustWalk(direction) {
    if (this.clipped(direction)) {
      if (direction === 'left') {
        this.x += this.width - 1;
      }
      this.x = Tile.size * Math.floor(this.x / Tile.size);
      if (direction === 'right') {
        return (this.x += Tile.size - this.width);
      }
    } else {
      if (this.canJump()) {
        this.t++;
      }
    }
  }

  adjustJump() {
    if (this.clipped('up')) {
      this.y += Tile.size;
      this.y = Tile.size * Math.floor(this.y / Tile.size);
      this.isJumping = false;
      this.velY = 0;
    }
  }

  adjustFall() {
    if (this.clipped('down')) {
      this.y = Tile.size * Math.floor(this.y / Tile.size);
    }
  }

  draw() {
    if(this.blink === 1){
        let sprite = 'player';
        this.game.canvas.drawSprite(this.x, this.y, sprite);     
    }else {
      let sprite = 'player';
      sprite += Math.floor(this.t / 5) % 2;
      sprite += this.direction === 1 ? 'r' : 'l';

     this.game.canvas.drawSprite(this.x, this.y, sprite);
    }  
  }

  touchTiles() {
    const tiles = this.getTouchedTiles();
    for (let tile of tiles) {
      if (tile.tile === 'T') {
        this.hasTrophy = true;
      }

      if (tile.tile === '=') {
        if (this.hasTrophy) {
          this.hasTrophy = false;
          this.game.input.clear();
          this.game.level.isLevelingUp = true;
          this.x = Tile.size;
          this.y = 4 * Tile.size;
        }
      }

      if (tile.tile === 'Z') {
        this.hasGun = true;
      }

      if (tile.tile === 'J') {
        this.hasJetpack = true;
      }

      if (Tile.isLethal(tile.tile)) {
        this.kill();
      }

      if (Tile.isPickable(tile.tile)) {
        this.game.score.value += Tile.scoreValue(tile.tile);
        this.game.level.clearTile(tile.x, tile.y);
      }
    }
  }

  kill() {
    if (!this.dead) {
      this.dead = true;
      this.game.lives--;
      this.game.restart = true;
    }
  }
}
