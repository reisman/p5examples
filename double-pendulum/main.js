'use strict';

let r1, r2;
let m1, m2;
let a1, a2;
let a1_velo, a2_velo;
let x2_prev, y2_prev;
let x_center, y_center;
let g;
let cvs, buffer;
let started = false;

const startSimulation = () => {
    initState();
    readFromUi();
    started = true;
}

const resetValues = () => {
    started = false;
    r1 = 125;
    r2 = 125;
    m1 = 20;
    m2 = 40;
    a1 = 0.8;
    a2 = 1.6;
    g = 0.981;
    initState();
    writeToUi();
}

const initState = () => {
    a1_velo = 0;
    a2_velo = 0;
    x2_prev = undefined;
    y2_prev = undefined;
    cvs.background(233, 236, 239);
    buffer.background(233, 236, 239);
}

const writeToUi = () => {
    const setElement = (name, value) => {
        document.getElementById(name).value = value;
    }

    setElement('firstMass', m1);
    setElement('firstLength', r1);
    setElement('firstAngle', a1);
    setElement('secondMass', m2);
    setElement('secondLength', r2);
    setElement('secondAngle', a2);
    setElement('gravity', g);
}

const readFromUi = () => {
    const getElement = name => {
        return parseFloat(document.getElementById(name).value);
    }

    m1 = getElement('firstMass');
    r1 = getElement('firstLength');
    a1 = getElement('firstAngle');
    m2 = getElement('secondMass');
    r2 = getElement('secondLength');
    a2 = getElement('secondAngle');
    g = getElement('gravity');
}

function setup() {
    cvs = createCanvas(500, 500);
    cvs.parent('sketch-holder');

    x_center = width / 2;
    y_center = 150;
    
    buffer = createGraphics(width, height);
    buffer.background(233, 236, 239);
    buffer.translate(x_center, y_center);

    resetValues();
}

function draw() {
    if (!started) return;

    imageMode(CORNER);
    image(buffer, 0, 0, width, height);
    
    translate(x_center, y_center);

    const x1 = r1 * sin(a1);
    const y1 = r1 * cos(a1);
    drawPendulum(0, 0, x1, y1, m1);

    const x2 = x1 + r2 * sin(a2);
    const y2 = y1 + r2 * cos(a2);
    drawPendulum(x1, y1, x2, y2, m2);

    const p1 = new Pendulum(m1, r1, a1, a1_velo);
    const p2 = new Pendulum(m2, r2, a2, a2_velo);

    a1_velo += calculateFirstPendulumAcceleration1(g, p1, p2);
    a2_velo += calculateSecondPendulumAcceleration1(g, p1, p2);
    a1 += a1_velo;
    a2 += a2_velo;

    if (x2_prev != undefined) {
        buffer.stroke(50, 100, 50);
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