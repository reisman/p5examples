let r1 = 125;
let r2 = 125;
let m1 = 20;
let m2 = 40;
let a1 = Math.PI / 4;
let a2 = Math.PI / 2;
let a1_velo = 0;
let a2_velo = 0;
const g = 0.1981;
let x2_prev = 0;
let y2_prev = 0;
let buffer;
let x_center, y_center;

function setup() {
    createCanvas(600, 600);
    
    x_center = width / 2;
    y_center = 150;
    buffer = createGraphics(width, height);
    buffer.background(255);
    buffer.translate(x_center, y_center);
}

function draw() {
    background(255); 
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);
    
    translate(x_center, y_center);

    const x1 = r1 * sin(a1);
    const y1 = r1 * cos(a1);
    drawPendulum(0, 0, x1, y1, m1);

    const x2 = x1 + r2 * sin(a2);
    const y2 = y1 + r2 * cos(a2);
    drawPendulum(x1, y1, x2, y2, m2);

    const a1_Num_1 = -g * (2 * m1 + m2) * sin(a1);
    const a1_Num_2 = -m2 * g * sin(a1 - 2 * a2);
    const a1_Num_3 = -2 * sin(a1 -a2) * m2;
    const a1_Num_4 =  a2_velo * a2_velo * r2 + a1_velo * a1_velo * r1 * cos(a1 - a2);
    const a1_Denum = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2* a2));
    const a1_acc = (a1_Num_1 + a1_Num_2 + a1_Num_3 * a1_Num_4) / a1_Denum;
    
    const a2_Num_1 = 2 * sin(a1 - a2);
    const a2_Num_2 = a1_velo * a1_velo * r1 * (m1 + m2);
    const a2_Num_3 = g * (m1 + m2) * cos(a1);
    const a2_Num_4 = a2_velo * a2_velo * r2 * m2 * cos(a1 - a2);
    const a2_Denum = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    const a2_acc = (a2_Num_1 * (a2_Num_2 + a2_Num_3 + a2_Num_4)) / a2_Denum;
    
    a1_velo += a1_acc;
    a2_velo += a2_acc;
    a1 += a1_velo;
    a2 += a2_velo;

    buffer.stroke(0);
    if (frameCount > 1) {
        buffer.line(x2_prev, y2_prev, x2, y2);
    }

    x2_prev = x2;
    y2_prev = y2;
}

const drawPendulum = (startx, starty, endx, endy, size) => {
    stroke(0);
    strokeWeight(2);
    line(startx, starty, endx, endy);
    fill(0);
    ellipse(endx, endy, size, size);
}