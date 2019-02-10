class Plinko {
    constructor(x, y, radius) {
        const options = {
            restitution: 1,
            friction: 0,
            isStatic: true,
        };

        this.body = Bodies.circle(x, y, radius, options);
        this.radius = radius;
        World.add(world, this.body);
    }

    show() {
        fill(127);
        stroke(0);
        const pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, 2 * this.radius)
        pop();
    }
}