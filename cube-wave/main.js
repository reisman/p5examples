let angle = 0;
let w = 30;
let magicAngle;
let maxDistance;

function setup() {
    createCanvas(800, 800, WEBGL);
    normalMaterial();
    magicAngle = atan(1 / sqrt(2));
    maxDistance = dist(0, 0, 0.5 * width, 0.5 * height);
}

function draw() {
    background(0);
    ortho(-700, 700, 700, -700, 0, 1400);
    orbitControl();

    rotateX(0.25 * PI);
    rotateY(magicAngle);

    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push();
            let d = dist(x, z, 0.5 * width, 0.5 * height);
            let offset = map(d, 0, maxDistance, -PI, PI);
            let a = angle + offset;
            const h = floor(map(sin(a), -1, 1, 100, 500));
            translate(x - 0.5 * width, 0, z - 0.5 * height);
            box(w - 2, h, w - 2);
            pop();
        }
    }

    angle -= 0.1;
}
