class Sprite {
  constructor(i, j, sw, sh) {
    this.size = 64;
    this.sw = sw || this.size;
    this.sh = sh || this.size;
    this.sx = i * this.size;
    this.sy = j * this.size;
    this.dw = this.sw * (Tile.size / this.size);
    this.dh = this.sh * (Tile.size / this.size);

    if (!Sprite.image) {
      Sprite.image = new Image();
      Sprite.image.src = "assets/sprites/sprite.png";
    }
  }

  draw(ctx, x, y) {
    // console.log(Sprite.image.complete)
    ctx.drawImage(
      Sprite.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      x,
      y,
      this.dw,
      this.dh
    );
  }

  drawA(ctx, x, y) {
    ctx.drawImage(Sprite.image, this.sx, this.sy, 32, 48, x, y, 20, 26);
  }

  drawT(ctx, x, y) {
    ctx.drawImage(
      Sprite.image,
      this.sx,
      this.sy,
      64,
      64,
      x,
      y,
      this.dw,
      this.dh
    );
  }
}
