let x = [];
let y = [];
let fourierY;
let fourierX;

let time = 0;
let path = [];
let drawing = [];

const USER = 0;
const FOURIER = 1;
const SETUP = 2;
let state = -1;

function setup() { 
    createCanvas(window.innerWidth, window.innerHeight);
} 
  
function draw() {
    background(0);
    
    if (state === USER) {
        renderUserDrawing();
    } else if (state === FOURIER) {
        renderFourier();
    } else if (state === SETUP) {
        setupFourier();
        state = FOURIER;
    }
}

function mousePressed() {
    drawing = [];  
    state = USER;
}

function mouseReleased() {
    state = SETUP;
}

function renderUserDrawing() {
    let point = createVector(mouseX - width / 2, mouseY - height / 2);
    drawing.push(point);
    stroke(255);
    noFill();
    beginShape();
    drawing.forEach(point => vertex(point.x + width / 2, point.y + height / 2))
    endShape();
}

function renderFourier() {
    const drawMarkerAxis = (vx, vy, v) => {
        stroke(255, 0, 0, 100);
        line(vx.x, vx.y, v.x, v.y);
        line(vy.x, vy.y, v.x, v.y);
        stroke(255);
    };

    const drawCurve = curve => {
        beginShape();
        noFill();
        curve.forEach(point => vertex(point.x, point.y))
        endShape();    
    };

    const calculateEpicycles = (fx, fy) => {
        let vx = epicycles(width / 2, 50, 0, fx);
        let vy = epicycles(100, height / 2, Math.PI / 2, fy);
        let v = createVector(vx.x, vy.y);
        return { vx, vy, v };    
    };

    const { vx, vy, v } = calculateEpicycles(fourierX, fourierY);

    path.unshift(v);
   
    drawMarkerAxis(vx, vy, v);
    drawCurve(path);
    
    const dt = 2 * Math.PI / fourierY.length;
    time += dt;
    if (time > 2 * Math.PI) {
        time = 0;
        path = [];
    }
}

function epicycles(xStart, yStart, rotation, fourier) {
    let x = xStart;
    let y = yStart;
    for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        const { freq, amplitude: radius, phase } = fourier[i];
        const angle = freq * time + phase + rotation;
        x += radius * Math.cos(angle);
        y += radius * Math.sin(angle);
        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, 2 * radius);
        stroke(255);
        line(prevx, prevy, x, y);
    }

    return createVector(x, y);
}

function setupFourier() {
    path = [];
    time = 0;
    x = [];
    y = [];
    for (let i = 0; i < drawing.length; i++) {
        x.push(drawing[i].x);
        y.push(drawing[i].y);
    }
    fourierX = discreteFourierTransform(x);
    fourierY = discreteFourierTransform(y);
    fourierX.sort((a, b) => b.amplitude - a.amplitude);
    fourierY.sort((a, b) => b.amplitude - a.amplitude);
}