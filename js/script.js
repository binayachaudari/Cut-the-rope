const CANVAS_WIDTH = 940,
  CANVAS_HEIGHT = window.innerHeight;

const nailImageWidth = NailImageHeight = 12.5;


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


let background = new Background(new Vec2(0, 0), './images/background.png');
let nail = new Nail(new Vec2(CANVAS_WIDTH / 2 - nailImageWidth, 50), './images/pin.png');

let rope = new Rope(new Vec2(CANVAS_WIDTH / 2, 50 + NailImageHeight), 15, 10);

let candy = new Candy(rope.getRopeEnd(), './images/candy.png');

let star1 = new Star(new Vec2(CANVAS_WIDTH / 2, 305), 0),
  star2 = new Star(new Vec2(CANVAS_WIDTH / 2, 375), 6),
  star3 = new Star(new Vec2(CANVAS_WIDTH / 2, 455), 12);

function updateAll() {
  rope.updatePoints();
  // square.updatePoints();
  for (var i = 0; i < 5; i++) //more loops = more precision, but worse performance
  {
    // square.updateConstraints();
    rope.updateConstraints();
  }
  // square.updateFriction();
  // square.render(ctx);
  candy.update();
  star1.update();
  star2.update();
  star3.update();

}

let drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  nail.draw();
  rope.render(ctx);
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


// canvas.addEventListener('click', (e) => {
//   console.log(e);
//   rope.deleteNode();
// })
