
let background = new Background(new Vec2(0, 0));
let nail;

let rope = new Rope(new Vec2(CANVAS_WIDTH / 2, 50 + NailImageHeight), 15, 10);
rope1 = new Rope(new Vec2(CANVAS_WIDTH / 3, 50 + NailImageHeight), 25, 10);


let star1 = new Star(new Vec2(CANVAS_WIDTH / 2, 325), 0),
  star2 = new Star(new Vec2(CANVAS_WIDTH / 2, 395), 6),
  star3 = new Star(new Vec2(CANVAS_WIDTH / 2, 475), 12);

let stars = [star1, star2, star3];

let candy = new Candy(rope.getRopeEnd());

let frog = new Frog(new Vec2(CANVAS_WIDTH / 2, CANVAS_HEIGHT - FrogPositionBottomOffset));

let inGameScore = new StarScore(new Vec2(50, 50));

let gameOver = new GameOver();

let isGameOver = false;
let isCandyNearFrog = false, isMouthOpen = false, hasEaten = false, isSad = false;
