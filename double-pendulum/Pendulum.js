class Pendulum {
    constructor(mass, radius, angle, velocity) {
        this.mass = mass;
        this.radius = radius;
        this.angle = angle;
        this.velocity = velocity;
    }

    addVelocity(delta) {
        this.velocity += delta;
        this.angle += this.velocity;
    }

    getCoordinates(offsetX = 0, offsetY = 0) {
        const x = offsetX + this.radius * sin(this.angle);
        const y = offsetY + this.radius * cos(this.angle);
        return {x, y};
    }
}