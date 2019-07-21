class Star {
  constructor(position, index) {
    this.position = position;
    this.starImage = new Image();
    this.starImage.src = './images/starSprite.png';
    this.starBloom = new Image();
    this.starBloom.src = './images/starBloom.png'
    this.index = index;
    this.bouncingUp = true;
    this.dy = 0;
    this.spriteWidth;
    this.spriteHeight;
    this.numOfRows = 18;
    this.singleSpriteHeight;

    this.starImage.onload = (e) => {
      this.spriteWidth = this.starImage.width;
      this.spriteHeight = this.starImage.height
      this.singleSpriteHeight = this.spriteHeight / this.numOfRows;

      setInterval(() => {
        this.index = ++this.index % this.numOfRows;
        if (this.bouncingUp) {
          this.dy += 0.3;
          this.bouncingUp = (this.dy > 6) ? false : true;
        }
        if (!this.bouncingUp) {
          this.dy -= 0.3;
          this.bouncingUp = (this.dy <= 0) ? true : false;
        }
      }, 45);
    }

  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(this.starBloom, this.position.x - this.spriteWidth,
      this.position.y - this.singleSpriteHeight - this.dy);
    ctx.drawImage(this.starImage, 0, this.index * this.singleSpriteHeight, this.spriteWidth,
      this.singleSpriteHeight, this.position.x - this.spriteWidth / 2,
      this.position.y - this.singleSpriteHeight / 2 - this.dy,
      this.spriteWidth, this.singleSpriteHeight);
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}