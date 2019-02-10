class Particle {
    constructor(x, y, radius) {
        this.hue = random(360);
        const options = {
            restitution: 0.5,
            friction: 0,
            density: 1,
        };

        this.body = Bodies.circle(x, y, radius, options);
        this.radius = radius;
        World.add(world, this.body);
    }

    cleanup() {
        World.remove(world, this.body);
    }

    show() {
        fill(this.hue, 100, 100);
        noStroke();
        const pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, 2 * this.radius)
        pop();
    }

    isOffScreen() {
        const x = this.body.position.x;
        return x < -50 || x > width + 50;
    }
}