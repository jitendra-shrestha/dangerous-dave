class AnimatedSprite extends Sprite {
  /**
   *
   * @param {number} i - x position
   * @param {number} j - y position
   * @param {number} sw - source width
   * @param {number} sh - source height
   * @param {number} framesCount - animation frame
   */
  constructor(i, j, sw, sh, framesCount) {
    super(i, j, sw, sh);
    this.currentFrame = 0;
    this.framesCount = framesCount;
    this.frames = 0;
  }

  /**
   *
   * @param {number} speed - speed for animation
   */
  update(speed) {
    if (this.frames % Math.floor(1000 / speed) === 0) {
      this.currentFrame = ++this.currentFrame % this.framesCount;
      this.srcX = this.sx + this.currentFrame * this.size;
      this.srcY = this.sy;
    }

    this.frames++;
  }

  /**
   *
   * @param {string} ctx - context in canvas
   * @param {number} x - x position in canvas
   * @param {number} y - y position in canvas
   * @param {number} speed - speed for animation
   */
  animate(ctx, x, y, speed) {
    this.update(speed);
    ctx.drawImage(
      Sprite.image,
      this.srcX,
      this.srcY,
      this.sw,
      this.sh,
      x,
      y,
      this.dw,
      this.dh
    );
  }
}
