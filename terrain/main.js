let rows, cols;
const scale = 20;
const w = window.innerWidth;
const h = window.innerHeight;
const terrain = [];
let flying = 0;

function setup() { 
    createCanvas(1000, 600, WEBGL);
    smooth();
    cols = w / scale;
    rows = h / scale;

    for (var x = 0; x < cols; x++) {
        terrain[x] = [];
    }
} 
  
function draw() {
    flying -= 1.0;

    let rowOff = flying;
    for (let row = 0; row < rows; row++) {
        let colOff = 0;
        for (let col = 0; col < cols; col++) {
            terrain[row][col] = map(noise(rowOff, colOff), 0, 1, -50, 50);
            colOff += 0.2;
        }
        rowOff += 0.2;
    }

    background(0);
    stroke(255);
    fill(40);

    translate(-w / 2, 0);
    rotateX(PI / 3);
    translate(0, -h / 2);

    for (let row = 0; row < rows - 1; row++) {
        beginShape(TRIANGLE_STRIP);
        for (let col = 0; col < cols; col++) {
            vertex(col * scale, row * scale, terrain[row][col]);
            vertex(col * scale, (row + 1) * scale, terrain[row + 1][col]);
        }
        endShape();
    }
}
