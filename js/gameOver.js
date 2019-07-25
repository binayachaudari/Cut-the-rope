class GameOver {
  constructor() {
    this.curtainTopImage = new Image();
    this.curtainTopImage.src = './images/curtainTop.png';
    this.curtainBottomImage = new Image();
    this.curtainBottomImage.src = './images/curtainBottom.png';
    this.dy = 0;
    this.isCurtainClosed = false;

    this.loadCutTheRopeFont();
    this.loadImages();
  }

  loadCutTheRopeFont() {
    let font = new FontFace('GooddP', 'url(./fonts/GOODDP.TTF)');
    font.load().then((loaded_face) => {
      document.fonts.add(loaded_face);
      document.body.style.fontFamily = '"GooddP", Arial';
    }).catch(function (error) {
      // error occurred
    });
  }

  loadImages() {
    this.curtainImageList = [this.curtainBottomImage, this.curtainTopImage];
    for (let curtain of this.curtainImageList) {
      curtain.onload = (e) => {
        this.spriteWidth = this.curtainTopImage.width;
        this.spriteHeight = this.curtainTopImage.height;
      };
    }
  }

  updateCurtainSpeed() {
    this.dy += 8;
    if (this.dy > CANVAS_HEIGHT / 2) {
      this.dy = CANVAS_HEIGHT / 2;
      this.isCurtainClosed = true;
    }
  }

  drawCurtain() {
    ctx.beginPath();
    ctx.drawImage(this.curtainTopImage, 0, -CANVAS_HEIGHT / 2 + this.dy, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    ctx.drawImage(this.curtainBottomImage, 0, CANVAS_HEIGHT - this.dy, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    ctx.closePath();
  }

  curtainCloseAnimation() {
    this.updateCurtainSpeed();
    this.drawCurtain();
    if (this.isCurtainClosed) {
      this.displayScoreBoard();
      inGameScore.loadGameOverScore();
      inGameScore.drawGameStarScore('gameover');
    }
  }

  displayScoreBoard() {
    this.textStatus();
  }

  textStatus() {
    ctx.beginPath();
    ctx.font = '50px GooddP';
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    switch (inGameScore.getStarScore()) {
      case 1:
        this.scoreText = 'Good!';
        break;
      case 2:
        this.scoreText = 'Great!'
        break;
      case 3:
        this.scoreText = 'Excellent!'
        break;

      default:
        this.scoreText = 'GOOD!'
        break;
    }
    ctx.strokeText(`${this.scoreText}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 150);
    ctx.fillText(`${this.scoreText}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 150);
    ctx.closePath();
  }

}