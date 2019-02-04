const increaseX = 0.10;
const increaseY = 0.10;
const increaseZ = 0.0005;
const scale = 10;
const numberParticles = 10000;
const maxVelocity = 4;
const magnitude = 1;

const particles = [];
let cols, rows;
let zoff = 0;
let flowField;

function setup() {
    createCanvas(1000, 1000, P2D);
    cols = floor(width / scale);
    rows = floor(height / scale);

    flowField = new Array(rows * cols);

    for (let i = 0; i < numberParticles; i++) {
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
            v.setMag(magnitude);
            flowField[index] = v;
            xoff += increaseX;
        }
        yoff += increaseY;
        zoff += increaseZ;
    }

    for (particle of particles) {
        particle.show(flowField, scale, cols, maxVelocity);
    }
}