const inc = 0.10;
const scale = 10;
let cols, rows;

let zoff = 0;
const particles = [];
let flowField;

function setup() {
    createCanvas(1000, 1000, P2D);
    cols = floor(width / scale);
    rows = floor(height / scale);

    flowField = new Array(rows * cols);

    for (let i = 0; i < 10000; i++) {
        particles[i] = new Particle(width, height);
    }

    background(255);
}

function draw() {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);
            let angle = noise(xoff, yoff, zoff) * 8 * PI;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowField[index] = v;
            xoff += inc;
        }
        yoff += inc;
        zoff += 0.0005;
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowField, scale, cols);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}