function Particle(x, y, r) {
    this.r = r;
    this.hue = random(255);
    let options = {
        friction: 0,
        restitution: 0.6
    }
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = 'particle';
    World.add(world, this.body);
}

Particle.prototype.show = function () {
    let pos = this.body.position;
    push();
    stroke(this.hue, 255, 255);
    fill(this.hue, 255, 255);
    translate(pos.x, pos.y);
    ellipse(0, 0, 2 * this.r);
    pop();
}

Particle.prototype.isOffScreen = function () {
    let pos = this.body.position;
    return (pos.y > height + 20);
}

Particle.prototype.removeObj = function () {
    return World.remove(world, this.body);
}