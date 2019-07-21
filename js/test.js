// // Adapted from the following Processing example:
// // http://processing.org/learning/topics/follow3.html

// // The number of points in the rope:
// var points = 10;
// // The distance between the points:
// var length = 25;

// //The Red Rope (and its previous positions)
// var rope = new Path({
//   strokeColor: 'red',
//   strokeWidth: 5,
//   strokeCap: 'round'
// });
// var ropeOld = new Path();
// var start = view.center / [5, 0.5];
// for (var i = 0; i < points; i++) {
//   rope.add(start + new Point(i * length, 0));
//   ropeOld.add(start + new Point(i * length, 0));
// }

// //The Black Circle
// var circle = new Path.Circle(view.center, 50);
// circle.strokeWidth = 5;
// circle.strokeColor = 'black';

// //The Black Ball (at the end of The Red Rope)	
// var ball = new Path.Circle(view.center, 5); //x,y
// ball.strokeWidth = 10;
// ball.strokeColor = 'black';
// ballPrev = new Point(view.center);

// //Records the mouse position (and depenetrates it from The Black Circle)
// var mousePos = view.center;
// function onMouseMove(event) {
//   mousePos = event.point;
//   if ((mousePos - circle.position).length <= 55) {
//     mousePos = setDistance(mousePos, circle.position, 55);
//   }
// }

// //Integrates the points forward in time based off their current and previous positions
// function verletIntegrate(currentSegment, previousSegment) {
//   var tempCurPtx = currentSegment.point.x;
//   var tempCurPty = currentSegment.point.y;
//   currentSegment.point.x += (currentSegment.point.x - previousSegment.point.x);
//   currentSegment.point.y += (currentSegment.point.y - previousSegment.point.y);
//   previousSegment.point.x = tempCurPtx;
//   previousSegment.point.y = tempCurPty;
// }

// //Projects 'currentPoint' to be within 'distance' of 'anchor'
// function setDistance(currentPoint, anchor, distance) {
//   var toAnchor = currentPoint - anchor;
//   toAnchor.length = distance;
//   return toAnchor + anchor;
// }

// function onFrame(event) {
//   for (var i = 0; i < points - 1; i++) {
//     //Verlet Integration
//     verletIntegrate(rope.segments[i + 1], ropeOld.segments[i + 1]);
//     //Add gravity
//     rope.segments[i + 1].point += new Point(0, 0.5);
//   }

//   //Iterate 10 times to resolve the constraints
//   for (var j = 0; j < 10; j++) {
//     for (var i = 0; i < points - 1; i++) {
//       var nextSegment = rope.segments[i + 1];

//       //Pull the segments toward eachother
//       var segment = rope.segments[i];
//       var toNext = segment.point - nextSegment.point;
//       if (toNext.length > length) {
//         toNext.length = length;
//         var offset = (segment.point - nextSegment.point) - toNext;
//         nextSegment.point += offset / 2;
//         segment.point -= offset / 2;
//       }

//       //Set the first link's position to be at the mouse
//       if (i == 0) rope.segments[0].point = mousePos;

//       //Long-Distance Length Constraint (reduces iterations)
//       if ((nextSegment.point - mousePos).length > (i + 1) * length) {
//         nextSegment.point = setDistance(nextSegment.point, mousePos, (i + 1) * length);
//       }
//     }
//   }

//   //Handle positioning and collision with the circle in the center
//   circle.position = view.center;
//   for (var i = 0; i < points - 1; i++) {
//     var nextSegment = rope.segments[i + 1];
//     var radius = (i == points - 2) ? 62.5 : 55;
//     if ((nextSegment.point - view.center).length < radius) {
//       nextSegment.point = setDistance(nextSegment.point, view.center, radius);
//     }
//   }

//   //Also draw a little ball at the end of the rope :)
//   ball.position = rope.segments[points - 1].point;

//   //Give the rope its buttery smoothness
//   rope.smooth({ type: 'continuous' });
// }

// function onMouseDown(event) {
//   rope.fullySelected = true;
//   rope.strokeColor = 'red';
// }

// function onMouseUp(event) {
//   rope.fullySelected = false;
//   rope.strokeColor = '#e4141b';
// }















// var GRAVITY = { x: 0, y: 12 };
// var FRICTION = { x: 0.94, y: 0.91 };
// var NUM_JOINTS = 12;
// var DISTANCE = 1.2;
// var WEIGHT = 6;
// var target = { x: 220, y: 0 }
// //Arrays
// var px = new Array();
// var py = new Array();
// var oldx = new Array();
// var oldy = new Array();
// var ax = new Array();
// var ay = new Array();


// // rendering
// var paper;
// var path;
// var rect;
// var card;

// window.onmousemove = function (event) {
//   target.x = event.clientX;
//   target.y = event.clientY;
// }

// window.ontouchmove = function (event) {
//   target.x = event.touches[0].pageX;
//   target.y = event.touches[0].pageY;
//   event.preventDefault();

// }

// window.onload = function () {
//   createRope();

//   // Creates canvas 320 × 200 at 10, 50
//   paper = Raphael(0, 0, 1000, 800);


//   var pathStr = "M10 10";

//   path = paper.path(pathStr);
//   path.attr({ stroke: "#000000", "stroke-width": 3, "stroke-linecap": "round" }),
//     setInterval(render, 1000 / 60)

//   rect = paper.rect(5, 5, 40, 40, 3);
//   rect.attr({ fill: "#ffd614" });
//   card = $("#card");

// }

// function collideRope() {
//   for (var i = 0; i < NUM_JOINTS; i++) {
//     if (py[i] > 250)					//set border limit
//       py[i] = 250;
//   }
// }

// function render() {



//   updateRope();		//handels with both the gravity and weight force
//   //	collideRope();	//handels collisions with the ground

//   //attach first point to the mouse x and y position
//   px[0] = target.x;
//   py[0] = target.y;


//   var pathStr = "M" + target.x + " " + target.y;
//   for (var j = 0; j <= NUM_JOINTS; j++) {

//     pathStr += "L" + px[j];
//     pathStr += " " + py[j];
//   }

//   path.attr("path", pathStr);

// }






// function updateRope() {

//   // FORCE
//   for (var i = 1; i <= NUM_JOINTS; i++) {
//     py[i] += (GRAVITY.y * 1 / 36);
//     px[i] += (GRAVITY.x * 1 / 36);
//   }

//   // FRICTION		
//   for (var i = 0; i <= NUM_JOINTS; i++) {

//     var previousx = px[i];
//     var previousy = py[i];

//     px[i] += (px[i] - oldx[i]) * FRICTION.x;
//     py[i] += (py[i] - oldy[i]) * FRICTION.y;

//     oldx[i] = previousx;
//     oldy[i] = previousy;
//   }

//   py[NUM_JOINTS] += (WEIGHT * 1 / 36);



//   // TENSION
//   var jointDistance = DISTANCE / NUM_JOINTS;

//   for (var i = 1; i <= NUM_JOINTS; i++) {
//     var dx = (px[i] - px[i - 1]) / 100;
//     var dy = (py[i] - py[i - 1]) / 100;
//     var d = Math.sqrt((dx * dx) + (dy * dy));
//     var force = d - jointDistance;

//     ax[i] = (dx / d) * 0.5 * 100 * force;
//     ay[i] = (dy / d) * 0.5 * 100 * force;
//     px[i] -= ax[i];
//     py[i] -= ay[i];
//     px[i - 1] += ax[i];
//     py[i - 1] += ay[i];
//   }

//   var dx = px[NUM_JOINTS] - px[NUM_JOINTS - 1];
//   var dy = py[NUM_JOINTS] - py[NUM_JOINTS - 1];

//   rect.attr({ x: px[NUM_JOINTS] - 25, y: py[NUM_JOINTS], transform: "r" + -(Math.atan2(dx, dy) * (180 / Math.PI)) }) 				//position equals last join

//   card.css({ left: px[NUM_JOINTS] - 100, top: py[NUM_JOINTS] })



// }


// function createRope() {
//   for (var i = 0; i <= NUM_JOINTS; i++) {
//     px[i] = 0;
//     py[i] = 0;
//     oldx[i] = 0;
//     oldy[i] = 0;
//     ax[i] = 0;
//     ay[i] = 0;
//   }

// }











// //each rope part is one of these
// //uses a high precison varient of Störmer–Verlet integration
// //to keep the simulation consistant otherwise it would "explode"!
// class RopePoint {
//   //integrates motion equations per node without taking into account relationship
//   //with other nodes...
//   static integrate(point, gravity, dt, previousFrameDt) {
//     point.velocity = Vector2.sub(point.pos, point.oldPos);
//     point.oldPos = { ...point.pos };

//     //drastically improves stability
//     let timeCorrection = previousFrameDt != 0.0 ? dt / previousFrameDt : 0.0;

//     let accel = Vector2.add(gravity, { x: 0, y: point.mass });

//     const velCoef = timeCorrection * point.damping;
//     const accelCoef = Math.pow(dt, 2);

//     point.pos.x += point.velocity.x * velCoef + accel.x * accelCoef;
//     point.pos.y += point.velocity.y * velCoef + accel.y * accelCoef;
//   }

//   //apply constraints related to other nodes next to it
//   //(keeps each node within distance)
//   static constrain(point) {
//     if (point.next) {
//       const delta = Vector2.sub(point.next.pos, point.pos);
//       const len = Vector2.mag(delta);
//       const diff = len - point.distanceToNextPoint;
//       const normal = Vector2.normalized(delta);

//       if (!point.isFixed) {
//         point.pos.x += normal.x * diff * 0.25;
//         point.pos.y += normal.y * diff * 0.25;
//       }

//       if (!point.next.isFixed) {
//         point.next.pos.x -= normal.x * diff * 0.25;
//         point.next.pos.y -= normal.y * diff * 0.25;
//       }
//     }
//     if (point.prev) {
//       const delta = Vector2.sub(point.prev.pos, point.pos);
//       const len = Vector2.mag(delta);
//       const diff = len - point.distanceToNextPoint;
//       const normal = Vector2.normalized(delta);

//       if (!point.isFixed) {
//         point.pos.x += normal.x * diff * 0.25;
//         point.pos.y += normal.y * diff * 0.25;
//       }

//       if (!point.prev.isFixed) {
//         point.prev.pos.x -= normal.x * diff * 0.25;
//         point.prev.pos.y -= normal.y * diff * 0.25;
//       }
//     }
//   }

//   constructor(initialPos, distanceToNextPoint) {
//     this.pos = initialPos;
//     this.distanceToNextPoint = distanceToNextPoint;
//     this.isFixed = false;
//     this.oldPos = { ...initialPos };
//     this.velocity = Vector2.zero();
//     this.mass = 1.0;
//     this.damping = 1.0;
//     this.prev = null;
//     this.next = null;
//   }
// }

// //manages a collection of rope points and executes
// //the integration
// class Rope {
//   //generate an array of points suitable for a dynamic
//   //rope contour
//   static generate(start, end, resolution, mass, damping) {
//     const delta = Vector2.sub(end, start);
//     const len = Vector2.mag(delta);

//     let points = [];
//     const pointsLen = len / resolution;

//     for (let i = 0; i < pointsLen; i++) {
//       const percentage = i / (pointsLen - 1);

//       const lerpX = Math.lerp(start.x, end.x, percentage);
//       const lerpY = Math.lerp(start.y, end.y, percentage);

//       points[i] = new RopePoint({ x: lerpX, y: lerpY }, resolution);
//       points[i].mass = mass;
//       points[i].damping = damping;
//     }

//     //Link nodes into a doubly linked list
//     for (let i = 0; i < pointsLen; i++) {
//       const prev = i != 0 ? points[i - 1] : null;
//       const curr = points[i];
//       const next = i != pointsLen - 1 ? points[i + 1] : null;

//       curr.prev = prev;
//       curr.next = next;
//     }

//     points[0].isFixed = points[points.length - 1].isFixed = true;

//     return points;
//   }

//   constructor(points, solverIterations) {
//     this._points = points;
//     this.update = this.update.bind(this);
//     this._prevDelta = 0;
//     this._solverIterations = solverIterations;

//     this.getPoint = this.getPoint.bind(this);
//   }

//   getPoint(index) {
//     return this._points[index];
//   }

//   update(gravity, dt) {
//     for (let i = 1; i < this._points.length - 1; i++) {
//       let point = this._points[i];

//       let accel = { ...gravity };

//       RopePoint.integrate(point, accel, dt, this._prevDelta);
//     }

//     for (let iteration = 0; iteration < this._solverIterations; iteration++)
//       for (let i = 1; i < this._points.length - 1; i++) {
//         let point = this._points[i];
//         RopePoint.constrain(point);
//       }

//     this._prevDelta = dt;
//   }
// }

// //APP SETUP!

// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");

// var gradient = context.createLinearGradient(0, 0, 500, 0);
// gradient.addColorStop("0", "white");
// gradient.addColorStop("0.25", "yellow");
// gradient.addColorStop("0.5", "blue");
// gradient.addColorStop("0.75", "red");
// gradient.addColorStop("1.0", "white");

// const args = {
//   start: { x: 100, y: canvas.height / 2 },
//   end: { x: canvas.width - 100, y: canvas.height / 2 },
//   resolution: 8,
//   mass: 0.88,
//   damping: 0.95,
//   gravity: { x: 0, y: 3000 },
//   solverIterations: 500,
//   ropeColour: gradient,
//   ropeSize: 4
// };

// const points = Rope.generate(
//   args.start,
//   args.end,
//   args.resolution,
//   args.mass,
//   args.damping
// );

// let rope = new Rope(points, args.solverIterations);

// const tick = dt => {
//   rope.update(args.gravity, dt);
// };

// const drawRopePoints = (context, points, colour, width) => {
//   for (i = 0; i < points.length; i++) {
//     let p = points[i];

//     const prev = i > 0 ? points[i - 1] : null;

//     if (prev) {
//       context.beginPath();
//       context.moveTo(prev.pos.x, prev.pos.y);
//       context.lineTo(p.pos.x, p.pos.y);
//       context.lineWidth = width;
//       context.strokeStyle = colour;
//       context.stroke();
//     }
//   }
// };

// //render a rope using the verlet points
// const draw = (canvas, context, dt) => {
//   drawRopePoints(context, points, args.ropeColour, args.ropeSize);
// };

// const onMouseMove = (x, y) => {
//   let point = rope.getPoint(0);
//   point.pos.x = x;
//   point.pos.y = y;
// };

// const app = new App(window, canvas, context, tick, draw, 60);

// app.onMouseMoveHandler = onMouseMove;
// app.start();
















var canvas;
var context;
var screenWidth;
var screenHeight;
var PI2 = Math.PI * 2;
var bgColor = '#262422';
var rope;
var gravity = 0.2;
var ropes = [];
var movementRamp = 0.984;
var windFactor = 0.02;
var windDirection = 1;
var windValue = 0;
var step = 0;
var cutting = false;
var blur = 0.6;
var gui;
var colors = ['#565853', '#5E9190', '#DCD9CD', '#BD4A61'];

window.onload = function () {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  window.onresize = function () {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    context.fillStyle = bgColor;
    context.fillRect(0, 0, screenWidth, screenHeight);
  };

  window.onresize();

  init();
  guiSetup();

  loop();
};

function init() {
  generateRopes();

  canvas.addEventListener('mousemove', function (e) {
    if (cutting) checkRopesIntersection(e.clientX, e.clientY);
  });

  canvas.addEventListener('mousedown', function (e) {
    cutting = true;
  });

  canvas.addEventListener('mouseup', function (e) {
    cutting = false;
  });
}

function guiSetup() {
  var controls =
  {
    blur: blur,
    gravity: gravity,
    windFactor: windFactor,
    movementRamp: movementRamp,

    reset: reset
  };

  gui = new dat.GUI();
  //gui.addColor(controls, 'bgColor').onChange(function(value){bgColor = value;});
  gui.add(controls, 'blur', 0.0, 1.0).onChange(function (value) { blur = value; });
  gui.add(controls, 'gravity', -1.0, 1.0).onChange(function (value) { gravity = value; });
  gui.add(controls, 'windFactor', 0.0, 1.0).onChange(function (value) { windFactor = value; });
  gui.add(controls, 'movementRamp', 0.8, 1.0).onChange(function (value) { movementRamp = value; });
  gui.add(controls, 'reset');
}

function reset() {
  ropes = [];

  generateRopes();
}

function generateRopes() {
  var r1 = new VRope(new VPoint(100, 0), new VPoint(screenWidth - 100, 0), 26, getRandomColor());
  var r2 = new VRope(r1.points[4], r1.points[20], 18, getRandomColor());
  var r3 = new VRope(r2.points[3], r2.points[20], 8, getRandomColor());
  var r4 = new VRope(r1.points[1], r1.points[2], 15, getRandomColor());
  var r5 = new VRope(r3.points[1], r3.points[2], 6, getRandomColor());
  var r6 = new VRope(r3.points[r3.points.length - 6], r2.points[8], 15, getRandomColor());
  var r7 = new VRope(r6.points[r6.points.length - 3], r1.points[28], 30, getRandomColor());
  var r8 = new VRope(r7.points[32], r1.points[r1.points.length - 4], 22, getRandomColor());
  var r9 = new VRope(r7.points[10], r1.points[r1.points.length - 10], 28, getRandomColor());

  r3.segments[0].constrainable = false;
  r4.segments[r4.segments.length - 1].constrainable = false;
  //r8.segments[r8.segments.length - 1].constrainable = false;

  ropes.push(r1);
  ropes.push(r2);
  ropes.push(r3);
  ropes.push(r4);
  ropes.push(r5);
  ropes.push(r6);
  ropes.push(r7);
  ropes.push(r8);
  ropes.push(r9);
}

function getRandomColor() {
  return colors[(Math.random() * colors.length) >> 0];
}

function checkRopeIntersection(rope, x, y) {
  var i = rope.points.length - 1;

  for (i; i > -1; --i) {
    var point = rope.points[i];
    var vx = x - point.x;
    var vy = y - point.y;
    var length = Math.sqrt(vx * vx + vy * vy);

    if (length < 10) {
      var segment = getSegmentFromPoint(point, rope);
      segment.constrainable = false;
    }
  }
};

function checkRopesIntersection(x, y) {
  var i = ropes.length - 1;

  for (i; i > -1; --i) {
    var rope = ropes[i];
    checkRopeIntersection(rope, x, y);
  }
}

function getSegmentFromPoint(point, rope) {
  var i = rope.segments.length - 1;

  for (i; i > -1; --i) {
    var segment = rope.segments[i];

    if (segment.a == point || segment.b == point) {
      return segment;

      break;
    }
  }
}

window.getAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 16.6);
  };

function loop() {
  context.globalAlpha = 1 - blur;
  context.fillStyle = bgColor;
  context.fillRect(0, 0, screenWidth, screenHeight);
  context.globalAlpha = 1;

  updateWind();
  updateRopes();
  drawRopes();

  ropes[0].x += 1;

  step += 0.06;

  getAnimationFrame(loop);
}

function updateWind() {
  windValue = Math.sin(step * Math.cos(step * 0.02) * Math.sin(step * 0.1) * 0.1) * windFactor * windDirection;
}

function updateRopes() {
  var i = ropes.length - 1;

  for (i; i > -1; --i) {
    var rope = ropes[i];
    rope.update();
  }
}

function drawRopes() {
  var i = ropes.length - 1;

  for (i; i > -1; --i) {
    var rope = ropes[i];
    drawRope(rope, '#FFF', 4);
  }
}

function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2.prototype =
  {
    constructor: Vector2,

    angle: function () {
      return Math.atan2(this.y, this.x);
    },

    setAngle: function (value) {
      var length = this.length();

      this.x = Math.cos(value) * length;
      this.y = Math.sin(value) * length;
    },

    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    setLength: function (value) {
      var angle = this.angle();

      this.x = Math.cos(angle) * value;
      this.y = Math.sin(angle) * value;
    },

    dx: function () {
      return this.x / this.length();
    },

    dy: function () {
      return this.y / this.length();
    },

    ln: function () {
      return new Vector2(this.y, -this.x);
    },

    rn: function () {
      return new Vector2(-this.y, this.x);
    },
  };

function VPoint(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.prevX = this.x;
  this.prevY = this.y;
}

VPoint.prototype =
  {
    constructor: VPoint,

    setPos: function (x, y) {
      this.prevX = this.x = x;
      this.prevY = this.y = y;
    },

    update: function () {
      var tx = this.x;
      var ty = this.y;

      this.x += (this.x - this.prevX) * movementRamp;
      this.y += (this.y - this.prevY) * movementRamp;

      this.prevX = tx;
      this.prevY = ty;
    }
  };

function VSegment(pointA, pointB) {
  this.a = pointA;
  this.b = pointB;
  this.constrainable = true;

  this.length = Math.sqrt((this.b.x - this.a.x) * (this.b.x - this.a.x) + (this.b.y - this.a.y) * (this.b.y - this.a.y));
}

VSegment.prototype =
  {
    constructor: VSegment,

    constrain: function () {
      var vx = this.b.x - this.a.x;
      var vy = this.b.y - this.a.y;

      var t = Math.sqrt(vx * vx + vy * vy);
      var diff = this.length - t;
      var offsetX = ((vx / t) * diff) * 0.5;
      var offsetY = ((vy / t) * diff) * 0.5;

      this.a.x -= offsetX;
      this.a.y -= offsetY;
      this.b.x += offsetX;
      this.b.y += offsetY;
    },

    update: function () {
      this.a.x += windValue;
      this.b.x += windValue;
      this.a.y += gravity;
      this.b.y += gravity;

      this.a.update();
      this.b.update();

      if (this.constrainable) this.constrain();
    }
  };

function VRope(pa, pb, segs, color) {
  this.a = pa;
  this.b = pb;
  this.segments = [];
  this.points = [];
  this.color = color || '#F00';
  this.lineWidth = (Math.random() * 8 + 4) >> 0;

  var vx = this.b.x - this.a.x;
  var vy = this.b.y - this.a.y;
  var t = Math.sqrt(vx * vx + vy * vy);
  var segmentWidth = t / segs;

  var i = 0;
  var l = segs;

  for (i; i < l; ++i) {
    var pointA = (this.points.length > 0) ? this.points[this.points.length - 1] : new VPoint(segmentWidth * i + pa.x, pa.y);
    var pointB = new VPoint(segmentWidth * (i + 1) + pa.x, pa.y);

    this.points.push(pointA);
    this.points.push(pointB);

    var segment = new VSegment(pointA, pointB);

    this.segments.push(segment);
  }
}

VRope.prototype =
  {
    constructor: VRope,

    update: function () {
      var i = this.segments.length - 1;

      for (i; i > -1; --i) {
        var segment = this.segments[i];

        segment.update();
      }

      this.points[0].setPos(this.a.x, this.a.y);
      this.points[this.points.length - 1].setPos(this.b.x, this.b.y);
    }
  }

function drawRope(rope, color, lineWidth) {
  var i = rope.segments.length - 1;
  var c = color || '#FFF';

  for (i; i > -1; --i) {
    var segment = rope.segments[i];

    context.strokeStyle = rope.color;
    context.lineWidth = rope.lineWidth;
    context.beginPath();
    context.moveTo(segment.a.x, segment.a.y);
    context.lineTo(segment.b.x, segment.b.y);
    if (segment.constrainable) context.stroke();
  }
}

function Point(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Point.prototype =
  {
    constructor: Point
  };

function norm(value, min, max) {
  return (value - min) / (max - min);
};

function lerp(norm, min, max) {
  return (max - min) * norm + min;
};

function map(value, smin, smax, omin, omax) {
  return this.lerp(norm(value, smin, smax), omin, omax);
};

function dotProduct(v1, v2) {
  return v1.dx() * v2.dx() + v1.dy() * v2.dy();
};

function unitRandom() {
  return 1 - Math.random() * 2;
};
