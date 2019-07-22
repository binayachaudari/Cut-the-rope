class Rope {
  constructor(position, ropePoints, lineSegmentLength) {
    this.points = [];
    this.constraints = [];
    this.position = position;
    this.ropePoints = ropePoints;
    this.lineSegmentLength = lineSegmentLength;
    this.isAlreadyCut = false;

    for (let eachRopePoint = 0; eachRopePoint < ropePoints; eachRopePoint++) {
      this.points.push(new Point(
        new Vec2(position.x, position.y + eachRopePoint * lineSegmentLength)
      ));
    }

    for (let eachRopePoint = 0; eachRopePoint < ropePoints - 1; eachRopePoint++) {
      this.constraints.push(
        new PointConstraint(this.points[eachRopePoint], this.points[eachRopePoint + 1])
      );
    }

    this.setPinned(true);
  }
  setPinned(value) {
    // this.pinned = value;
    this.points[0].pinned = value;
  }
  getRopeEnd() {
    return this.points[this.points.length - 1];
  }
  attach(point) {
    this.constraints.push(new PointConstraint(this.getRopeEnd(), point).setLength(this.lineSegmentLength));
  }

  updatePoints() {
    this.points[0].position = this.position;
    for (let point of this.points) {
      point.update();
    }
  }
  updateFriction() {
    for (let point of this.points) {
      point.updateFriction();
    }
  }
  updateGravity(point) {
    // this.points.forEach((point, index) => {
    //   let gravity = 0.1
    //   point.setGravity(new Vec2(0, index * gravity));
    // });
    point.setGravity(new Vec2(0, 5));

  }
  updateConstraints() {
    for (let constraint of this.constraints) {
      constraint.update();
    }
  }
  checkRopesIntersection(mousePositionX, mousePositionY) {
    if (!this.isAlreadyCut) {
      for (let constraint of this.constraints) {
        let lengthOfLine = constraint.pointA.position.vecTo(constraint.pointB.position).len();
        let distanceFromPointA = new Vec2(mousePositionX, mousePositionY).vecTo(constraint.pointA.position).len(),
          distanceFromPointB = new Vec2(mousePositionX, mousePositionY).vecTo(constraint.pointB.position).len();

        if (distanceFromPointA + distanceFromPointB >= lengthOfLine - 2.5 &&
          distanceFromPointA + distanceFromPointB <= lengthOfLine + 2.5) {
          if (this.constraints.indexOf(constraint) != 0) {
            this.isAlreadyCut = true;
            this.removeConstraint(this.constraints.indexOf(constraint));
            this.removePoints(this.points.indexOf(constraint.pointA), this.points.indexOf(constraint.pointB));
            this.updateGravity(constraint.pointB);
          }
        }
      }
    }
  }
  removeConstraint(index) {
    this.constraints.splice(index, 1);
  }
  removePoints(pointA, pointB) {
    this.points.splice(pointA, 1);
    this.points.splice(pointB, 1);
  }
  render() {
    for (let constraint of this.constraints) {
      constraint.render();
    }
  }
}