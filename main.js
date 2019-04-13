const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events;

let engine, world;
let particles = [];
let pegs = [];
let bounds = [];
let cols = 8;
let rows = 7;
let offset = 20;
let score = 0;
let balls = 10;

function setup() {
    createCanvas(400, 600);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1.1;
    let spacing = width / rows - offset / rows;

    // Creating the pegs
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = spacing * j + offset;
            if (i % 2 == 0) {
                x += spacing / 2;
            }
            let y = spacing + spacing * i + offset;
            let p = new Peg(x, y, 6);
            pegs.push(p);
        }
    }
    // Bottom
    let b = new Boundary(width / 2, height + 50, width, 100);
    // Left
    let b1 = new Boundary(-10, height / 2, 10, height);
    // Right
    let b2 = new Boundary(width, height / 2, 10, height);
    bounds.push(b);
    bounds.push(b1);
    bounds.push(b2);

    // Buckets and point pads
    for (let i = 0; i < cols + 1; i++) {
        let x = 7 + i * (spacing + 0.3);
        let h = 70;
        let w = 9;
        let y = height - h / 2;
        let newB = new Boundary(x, y, w, h);
        bounds.push(newB);
    }

    // Collision event
    function collision(event) {
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++) {
            let bodyA = pairs[i].bodyA.label;
            let bodyB = pairs[i].bodyB.label;
            if (bodyA == 'peg' || bodyB == 'peg') {
                score++;
            }
        }

    }

    Events.on(engine, 'collisionStart', collision)

    Engine.run(engine);
}

function draw() {
    background(0);
    fill(255);
    textSize(15);
    text("Score: " + score, width - 70, 20);
    text("Balls remaining: " + balls, 10, 20);

    for (let i = 0; i < particles.length; i++) {
        if (particles[i].isOffScreen()) {
            particles[i].removeObj();
            particles.splice(i, 1);
            i--;
        } else {
            particles[i].show();
        }
    }

    pegs.forEach(p => p.show());
    bounds.forEach(b => b.show());
}

function mousePressed() {
    if (balls > 0) {
        if (mouseX < 30) {
            particles.push(new Particle(mouseX + 30, 50, 8));
        } else if (mouseX > width - 30) {
            particles.push(new Particle(mouseX - 30, 50, 8));
        } else {
            particles.push(new Particle(mouseX, 50, 8));
        }
        balls--;
    }
}