let backgroundImage = new Image();

class Background {
  constructor(position, source) {
    this.x = position.x;
    this.y = position.y;
    this.backgroundImage = new Image();
    backgroundImage.src = source;
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
