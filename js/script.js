const CANVAS_WIDTH = 940,
  CANVAS_HEIGHT = window.innerHeight;

const nailImageWidth = NailImageHeight = 12.5;
const FrogPositionBottomOffset = 100;


document.body.style.margin = "0px";
document.body.style.padding = "0px";

const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.display = 'block';
canvas.style.margin = '0 auto';
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');

/**
 * [generates Random Number]
 * @param  {Number} min minimum Number
 * @param  {Number} max Maximum Number
 * @return {Number}     Random Number
 */
let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};


let background = new Background(new Vec2(0, 0));
let nail = new Nail(new Vec2(CANVAS_WIDTH / 2 - nailImageWidth, 50));

let rope = new Rope(new Vec2(CANVAS_WIDTH / 2, 50 + NailImageHeight), 21, 10);


let star1 = new Star(new Vec2(CANVAS_WIDTH / 2, 325), 0),
  star2 = new Star(new Vec2(CANVAS_WIDTH / 2, 395), 6),
  star3 = new Star(new Vec2(CANVAS_WIDTH / 2, 475), 12);

let stars = [star1, star2, star3];

let candy = new Candy(rope.getRopeEnd());


let frog = new Frog(new Vec2(CANVAS_WIDTH / 2, CANVAS_HEIGHT - FrogPositionBottomOffset));



function updateAll() {
  rope.updatePoints();

  for (var rigidConstraint = 0; rigidConstraint < 5; rigidConstraint++) //more loops = more precision, but worse performance
  {
    rope.updateConstraints();

  }
  for (star of stars) {
    star.update();
    starCollisionDetection(star);
  }
  candy.update();

}

let drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  nail.draw();
  rope.render();
  frog.drawFrogImage();

}

let gameLoopFrameRequest;
let gameLoop = () => {
  gameLoopFrameRequest = requestAnimationFrame(gameLoop);
  drawAll();
  updateAll();
}



document.body.onload = (e) => {
  gameLoop();
}

let starCollisionDetection = (star) => {
  if (candy.endPoint.position.x < star.position.x + star.spriteWidth &&
    candy.endPoint.position.x + candy.candyImageWidth / 2 > star.position.x &&
    candy.endPoint.position.y < star.position.y + star.singleSpriteHeight &&
    candy.endPoint.position.y + candy.candyImageHeight / 2 > star.position.y) {
    console.log('collisionDetection');
  }
}

let calculateDistance = (pointAX, pointAY, pointBX, pointBY) => {
  let dx = pointAX - pointBX;
  let dy = pointAY - pointBY;
  return Math.sqrt(dx * dx + dy * dy);
}



// //Mousemove functions.
// canvas.addEventListener('mousemove', function (evt) {
//   mousePos = getMousePos(canvas, evt);
//   rope.position = new Vec2(mousePos.x, mousePos.y);
// }, false);

// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }


canvas.addEventListener('click', (e) => {
  rope.checkRopesIntersection(e.layerX, e.layerY);

  frog.setFrogStatus('sad');
})
