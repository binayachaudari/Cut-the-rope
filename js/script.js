let newGame;

let level1 = {
  nails: [new Nail(new Vec2(CANVAS_WIDTH / 2 - nailImageWidth, 50))],
  ropes: [
    new Rope(new Vec2(CANVAS_WIDTH / 2, 50 + NailImageHeight), 15, 10)
  ],

  stars: [
    new Star(new Vec2(CANVAS_WIDTH / 2, 325), 0),
    new Star(new Vec2(CANVAS_WIDTH / 2, 395), 6),
    new Star(new Vec2(CANVAS_WIDTH / 2, 475), 12)
  ],

  frog: new Frog(new Vec2(CANVAS_WIDTH / 2, CANVAS_HEIGHT - FrogPositionBottomOffset)),
}

document.body.onload = (e) => {
  newGame = new Game(level1);
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



