class Particle {
    constructor(width, height) {
        this.area = { width, height };
        this.pos = createVector(random(this.area.width), random(this.area.height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxvel = 2;
        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxvel);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        stroke(0, 5);
        strokeWeight(1);
        //point(this.pos.x, this.pos.y);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrevious();
    }

    updatePrevious() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrevious();
        } else if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrevious();
        }

        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrevious();
        } else if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrevious();
        }
    }

    follow(vectors, scale, cols) {
        const x = floor(this.pos.x / scale);
        const y = floor(this.pos.y / scale);
        const index = x + y * cols;
        const force = vectors[index];
        this.applyForce(force);
    }
}