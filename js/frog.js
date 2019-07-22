class Frog {
  constructor(position) {
    this.position = position;
    this.frogSupportImage = new Image();
    this.frogImage = new Image();
    this.frogSad = new Image();
    this.frogChew = new Image();
    this.forgMouthOpen = new Image();
    this.frogMouthClose = new Image();
    this.frogSupportImage.src = './images/support.png';
    this.frogImage.src = './images/frog.png';
    this.frogSad.src = './images/frogSad.png';
    this.frogChew.src = './images/frogChew.png';
    this.forgMouthOpen.src = './images/frogMouthOpen.png';

    this.loadFrogImage()
  }

  loadFrogImage() {
    this.numOfRows = 19;
    this.index = 0;
    this.frogImage.onload = (e) => {
      this.spriteWidth = this.frogImage.width;
      this.spriteHeight = this.frogImage.height;
      this.singleSpriteHeight = this.spriteHeight / this.numOfRows;
      this.animateFrogImage();
    }
  }

  animateFrogImage() {
    this.frogAnimation = setInterval(() => {
      this.index = ++this.index % this.numOfRows;
    }, 45);
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(this.frogImage, 0, this.index * this.singleSpriteHeight, this.spriteWidth, this.singleSpriteHeight,
      this.position.x - this.spriteWidth / 2, this.position.y - this.singleSpriteHeight / 2, this.spriteWidth, this.singleSpriteHeight);
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}