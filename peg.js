function Peg(x, y, r) {
    this.r = r;
    let options = {
        friction: 0,
        restitution: 0.6,
        isStatic: true
    }
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'peg';
    World.add(world, this.body);
}

Peg.prototype.show = function () {
    let pos = this.body.position;
    push();
    stroke(255);
    fill(255);
    translate(pos.x, pos.y);
    ellipse(0, 0, 2 * this.r);
    pop();
}