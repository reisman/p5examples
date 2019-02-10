let x = 0.01, y = 0, z = 0;

const a = 10;
const b = 28;
const c = 8 / 3;
const points = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    colorMode(HSB);
    smooth();
}

function draw() {
    orbitControl();

    background(0);

    const dt = 0.02;
    const dx = dt * (a * (y - x));
    const dy = dt * (x * (b - z) - y);
    const dz = dt * (x * y - c * z);
    x += dx;
    y += dy;
    z += dz;
    
    points.push(createVector(x, y, z));
    
    scale(5);
    stroke(255);
    noFill();

    beginShape();
    for (p of points) {
        //const v = p5.Vector.random3D();
        //v.mult(0.1);
        //p.add(v);
        vertex(p.x, p.y, p.z);

    }
    endShape();
}