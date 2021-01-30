class Canvas {
  /**
   * 
   * @param {string} containerId - Id of container
   * @param {object} options - Height and width of container
   */
  constructor(containerId, options) {
    this.canvas = document.createElement('canvas');
    this.container = document.getElementById(containerId);
    this.options = options || {};
    this.canvas.width = this.options.width || 640;
    this.canvas.height = this.options.height || 450;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.view = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    };

    this.sprites = {
      //player
      player: new Sprite(0, 2), //player in begining
      player0r: new Sprite(1, 2), // player in left
      player0l: new Sprite(5, 2), // player in left
      player1r: new Sprite(2, 2), // player in right
      player1l: new Sprite(6, 2), // player in right
      playerjr: new Sprite(6, 4), // player in jetpack right
      playerjl: new Sprite(5, 4), // player in jetpack left

      // enemy
      bullet: new Sprite(3, 14, 20, 10),
      spider: new Sprite(2, 10, 100, 64),
      
      // info board
      TS: new Sprite(3,4.01), // trophy for infoboard
      ZS: new Sprite(3, 1), // gun for infoboard

      // Map items
      A: new Sprite(6, 0), // triangular brown pattern
      B: new Sprite(1, 0), // red brick
      C: new Sprite(6, 1), // crown
      D: new Sprite(0, 1), // blue gem
      E: new Sprite(4, 1), // ring
      F: new AnimatedSprite(0, 13, 64, 32,3), // fire
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
      '/': new Sprite(7, 0), // triangular brown pattern
      '\\': new Sprite(8, 0), // triangular brown pattern
      '-': new Sprite(4, 8), // purple platform
      '=': new Sprite(1, 8), // door
      '+': new Sprite(2, 8), // pipe left
     

      // key denotes to same alphabets
      a: new Sprite(0,11),  //A
      c: new Sprite(0.5,11), //C
      d: new Sprite(1,11), //D
      e: new Sprite(1.5,11), //E
      g: new Sprite(2,11), //G
      h: new Sprite(2.5,11), //H
      j: new Sprite(3,11), //J
      k: new Sprite(3.5,11), //K
      l: new Sprite(4,11), //L
      n: new Sprite(4.5,11), //N
      o: new Sprite(5,11), //O
      p: new Sprite(5.5,11), //P
      r: new Sprite(6,11), //R
      s: new Sprite(6.5,11), //S
      t: new Sprite(7,11), //T
      u: new Sprite(7.5,11), //U
      v: new Sprite(8,11), //V
      dd: new Sprite(8.5,11), //:
      ex: new Sprite(9,11), //!

      // key denotes to same number
      0: new Sprite(0,12),
      1: new Sprite(0.5,12),
      2: new Sprite(1,12),
      3: new Sprite(1.5,12),
      4: new Sprite(2,12),
      5: new Sprite(2.5,12),
      6: new Sprite(3,12),
      7: new Sprite(3.5,12),
      8: new Sprite(4,12),
      9: new Sprite(4.5,12),

    };
  }
  /**
   * 
   * @param {number} dx - x position
   */
  setScroll(dx) {
    this.view.x = dx;
  }

  /**
   * 
   * @param {char} tile - character of tile
   * @param {number} i - x position
   * @param {number} j - y position
   */
  drawTile(tile, i, j) {
    const x = i * Tile.size;
    const y = j * Tile.size;

    if (this.sprites[tile]) {
      if (tile === 'T') {
        this.sprites[tile].animate(this.ctx, x - this.view.x, y - this.view.y, 100);
        return;
      }
      if (tile === 'F') {
        this.sprites[tile].animate(this.ctx, x - this.view.x, y - this.view.y, 5);
        return;
      }

      if (tile === 'f') {
        this.sprites[tile].animate(this.ctx, x - this.view.x, y - this.view.y, 5);
        return;
      }

      if (tile === 'W') {
        this.sprites[tile].animate(this.ctx, x - this.view.x, y - this.view.y, 5);
        return;
      }
      if (tile === 'S') {
        this.sprites[tile].animate(this.ctx, x - this.view.x, y - this.view.y, 5);
        return;
      }

      this.drawSprite(x, y, tile);
      return;
    }
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(x - this.view.x, y - this.view.y, Tile.size, Tile.size);
  }

  /**
   * 
   * @param {char} letter - character of letter
   * @param {number} i - x position
   * @param {number} j - y position
   */
  drawLetter(letter, i, j) {
    var x = i * Tile.size;
    var y = j * Tile.size;

    

    if (this.sprites[letter]) {
      this.drawAlphabhets(x, y, letter);
      return;
    }
  }

  /**
   * 
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {char} sprite - character of sprite 
   */
  drawSprite(x, y, sprite) {
    this.sprites[sprite].draw(this.ctx, x - this.view.x, y - this.view.y);
  }

 
  /**
   * 
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {char} sprite - character of sprite 
   */
  drawAlphabhets(x, y, sprite) {
    if(sprite === 'TS'){
      this.sprites[sprite].drawT(this.ctx, x , y );
    }else if(sprite === 'ZS'){
      this.sprites[sprite].drawT(this.ctx, x , y );
    }else{
      this.sprites[sprite].drawA(this.ctx, x , y );
    }
    
  }

  /**
   * clears the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
