const w = 50;
const boxes = [];

let angle = 0;
let magicAngle;
let halfWidth, halfHeight;
let minBoxHeight, maxBoxHeight;

function setup() {
    createCanvas(800, 800, WEBGL);
    
    noStroke();
    normalMaterial();
    ortho(-700, 700, 700, -700, 0, 1400);

    magicAngle = atan(1 / sqrt(2));
    minBoxHeight = 0.1 * height;
    maxBoxHeight = 0.6 * height;
    halfWidth = 0.5 * width;
    halfHeight = 0.5 * height;
    const maxDistance = dist(0, 0, halfWidth, halfHeight);
    
    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            let d = dist(x, z, halfWidth, halfHeight);
            let offset = map(d, 0, maxDistance, -PI, PI);
            boxes.push({ x, z, offset });
        }
    }
}

function draw() {
    background(0);
    orbitControl();

    rotateX(0.25 * PI);
    rotateY(magicAngle);
    translate(-halfWidth, 0, -halfHeight);
    
    for (b of boxes) {
        const { x, z, offset } = b;
        const currentAngle = sin(angle + offset);
        const boxHeight = map(currentAngle, -1, 1, minBoxHeight, maxBoxHeight);
        push();
        translate(x, 0, z);
        box(w, boxHeight, w);
        pop();
    }

    angle -= 0.1;
}
