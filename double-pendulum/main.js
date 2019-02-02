'use strict';

let x2_prev, y2_prev;
let x_center, y_center;
let g;
let cvs, buffer;
let started = false;
let pendulum1, pendulum2;

const startSimulation = () => {
    const readFromUi = () => {
        const getElement = name => {
            return parseFloat(document.getElementById(name).value);
        }
    
        g = getElement('gravity');
        pendulum1 = new Pendulum(getElement('firstMass'), getElement('firstLength'), getElement('firstAngle'), 0);
        pendulum2 = new Pendulum(getElement('secondMass'), getElement('secondLength'), getElement('secondAngle'), 0);
    }

    initState();
    readFromUi();
    started = true;
}

const resetValues = () => {
    const writeDefaultToUi = () => {
        const setElement = (name, value) => {
            document.getElementById(name).value = value;
        }
    
        setElement('firstMass', 20);
        setElement('firstLength', 125);
        setElement('firstAngle', 0.8);
        setElement('secondMass', 40);
        setElement('secondLength', 125);
        setElement('secondAngle', 1.6);
        setElement('gravity', g);
    }

    started = false;
    g = 0.981;
    initState();
    writeDefaultToUi(); 
}

const initState = () => {
    x2_prev = undefined;
    y2_prev = undefined;
    cvs.background(233, 236, 239);
    buffer.background(233, 236, 239);
}

function setup() {
    cvs = createCanvas(800, 500);
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

    const drawPendulum = (startx, starty, endx, endy, size) => {
        stroke(0);
        strokeWeight(2);
        line(startx, starty, endx, endy);
        fill(0);
        ellipse(endx, endy, size, size);
    }
    
    const { x: x1, y: y1 } = pendulum1.getCoordinates();
    drawPendulum(0, 0, x1, y1, pendulum1.mass);

    const { x: x2, y: y2 } = pendulum2.getCoordinates(x1, y1);
    drawPendulum(x1, y1, x2, y2, pendulum2.mass);

    pendulum1.addVelocity(calculateFirstPendulumAcceleration(g, pendulum1, pendulum2));
    pendulum2.addVelocity(calculateSecondPendulumAcceleration(g, pendulum1, pendulum2));

    if (x2_prev != undefined) {
        buffer.stroke(50, 100, 50);
        buffer.line(x2_prev, y2_prev, x2, y2);
    }

    x2_prev = x2;
    y2_prev = y2;
}