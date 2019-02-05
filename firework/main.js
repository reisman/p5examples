const fireworks = [];
let gravity;
let rot = 0.0;

function setup() {
    createCanvas(800, 800, WEBGL);
    //setAttributes('antialias', true);
    stroke(255);
    strokeWeight(4);
    background(0);
    point(0,0,0);
    gravity = createVector(0, 0.2);
}

function draw() {
    background(0, 25);
    orbitControl();
    translate(-width / 2, -height / 2, 0);
    if (random(1) < 0.2) {
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }

    console.log(fireworks.length);
}

class Particle {
    constructor(x, y, z, straight, color = [255, 255, 255]) {
        this.pos = createVector(x, y, z);
        this.color = color;
        this.straight = straight;
        this.lifespan = 255;
        if (straight) {
            this.vel = createVector(0, random(-20, -15));
        } else {
            this.vel = p5.Vector.random3D();
            this.vel.mult(random(2, 10));
        }
        this.acc = createVector(0, 0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.straight) {
            this.vel.mult(0.9);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {    
        if (this.straight) {
            strokeWeight(4);
            stroke(this.color);
        } else {
            //colorMode(HSB);
            strokeWeight(2);
            stroke(this.color, this.lifespan);
        }
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        point(0, 0);
        pop();
    }

    done() {
        return this.lifespan < 0;
    }
}

class Firework {
    constructor() {
        this.firework = new Particle(random(-width / 2, width / 2), height, random(-600, 600), true);
        this.exploded = false;
        this.particles = [];
        this.hu = [random(255), random(255), random(255)];
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        } else {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    explode() {
        for (let i = 0; i < 100; i++) {
            const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.firework.pos.z, false, this.hu);
            this.particles.push(p);
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].show();
            }
        }
    }

    done() {
        return this.exploded && this.particles.length === 0;
    }
}