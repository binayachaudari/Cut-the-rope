class PointConstraint {

  constructor(pointA, pointB) {
    this.length = pointA.position.vecTo(pointB.position).len();
    this.pointA = pointA;
    this.pointB = pointB;
  }
  setLength(value) {
    this.length = value;
    return this;
  }

  applyConstraint() {
    var radius = this.length / 2;

    var midPoint = this.pointA.position.vecTo(this.pointB.position).scale(0.5);

    midPoint = this.pointA.position.add(midPoint);

    if (!this.pointA.pinned)
      this.pointA.position = midPoint.add(midPoint.vecTo(this.pointA.position).resize(radius));
    if (!this.pointB.pinned)
      this.pointB.position = midPoint.add(midPoint.vecTo(this.pointB.position).resize(radius));

  }

  update() {
    var currentLen = this.pointA.position.vecTo(this.pointB.position).len();
    if (this.length != currentLen) {
      this.applyConstraint();
    }
    this.pointA.updateBoundings();
    this.pointB.updateBoundings();
  }

  render(ctx) {
    if (!this.hidden) {
      ctx.beginPath();
      ctx.moveTo(this.pointA.position.x, this.pointA.position.y);
      ctx.lineTo(this.pointB.position.x, this.pointB.position.y);
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
    }
  }
}