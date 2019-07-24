class StarScore {
  constructor(position) {
    this.position = position;
    this.result = [];
    this.ingamestarScoreImage = new Image();
    this.ingamestarScoreImage.src = './images/inGameScore.png';
    this.gameoverScoreImage = new Image();
    this.gameoverScoreImage.src = './images/gameOverStarScore.png';
    this.loadStarScore(this.ingamestarScoreImage);
    this.index = this.getStarScore();
    this.spritePadding = 15;
  }


  loadStarScore(image) {
    this.ingamestarScoreImage.onload = (e) => {
      this.numOfRows = 4;
      this.spriteWidth = image.width;
      this.spriteHeight = image.height;
      this.singleSpriteHeight = this.spriteHeight / this.numOfRows;
    }
  }

  getStarScore() {
    this.result = stars.filter((star) => {
      return star.hasDisappeared === true;
    });
    return this.result.length;
  }

  updateStarScore() {
    this.index = this.getStarScore();
  }

  drawGameStarScore(scoreStatus) {
    ctx.beginPath();
    switch (scoreStatus.toLowerCase()) {
      case 'gameOver':
        ctx.drawImage(this.gameoverScoreImage, 0, this.index * this.singleSpriteHeight, this.spriteWidth, this.singleSpriteHeight,
          this.position.x - this.spritePadding, this.position.y - this.spritePadding - this.singleSpriteHeight / 2,
          this.spriteWidth, this.singleSpriteHeight);
        break;

      case 'ingame':
        ctx.drawImage(this.ingamestarScoreImage, 0, this.index * this.singleSpriteHeight, this.spriteWidth, this.singleSpriteHeight,
          this.position.x - this.spritePadding, this.position.y - this.spritePadding,
          this.spriteWidth, this.singleSpriteHeight);
        break;

      default:
        ctx.drawImage(this.ingamestarScoreImage, 0, this.index * this.singleSpriteHeight, this.spriteWidth, this.singleSpriteHeight,
          this.position.x - this.spritePadding, this.position.y - this.spritePadding,
          this.spriteWidth, this.singleSpriteHeight);
    }
    ctx.closePath();

  }

}