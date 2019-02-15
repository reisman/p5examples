let radius;
let factor = 1;

function setup() {
    createCanvas(800, 800);
    stroke(255);
    noFill();
    radius = 0.5 * width - 50;
}

function draw() {
    background(0);
    translate(0.5 * width, 0.5 * height);
    
    const total = 200;
    factor += 0.01;
    circle(0, 0, radius);

    for (let i = 0; i < total; i++) {
        const a = getVector(i, total);
        const b = getVector(i * factor, total);
        //stroke(i * 100 % 255);
        line(a.x, a.y, b.x, b.y);
    }
}

const getVector = (index, total) => {
    const angle = map(index % total, 0, total, 0, 2 * PI);
    const vector = p5.Vector.fromAngle(angle + PI);
    vector.mult(radius);
    return vector;
};
