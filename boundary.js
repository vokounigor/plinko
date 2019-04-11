function Boundary(x, y, w, h) {
    this.w = w;
    this.h = h;
    let options = {
        isStatic: true
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
}

Boundary.prototype.show = function () {
    let pos = this.body.position;
    push();
    fill(255);
    stroke(255);
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
}