class Boundary {
    constructor(x, y, w, h) {
        const options = {
            isStatic: true,
        };

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    show() {
        fill(255);
        stroke(255);
        const pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h)
        pop();
    }
}