'use strict';

let x2_prev, y2_prev;
let x_center, y_center;
let g;
let cvs, buffer;
let started = false;
let pendulum1, pendulum2;

const defaultFirstMass = 40;
const defaultSecondMass = 20;
const defaultFirstLength = 125;
const defaultSecondLength = 125;
const defaultFirstAngle = 0.8;
const defaultSecondAngle = 1.6;
const defaultGravity = 0.5;
const canvasBackground = [233, 236, 239];
const parentElementId = 'sketch-holder';

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
    
        setElement('firstMass', defaultFirstMass);
        setElement('firstLength', defaultFirstLength);
        setElement('firstAngle', defaultFirstAngle);
        setElement('secondMass', defaultSecondMass);
        setElement('secondLength', defaultSecondLength);
        setElement('secondAngle', defaultSecondAngle);
        setElement('gravity', defaultGravity);
    }

    started = false;
    initState();
    writeDefaultToUi(); 
}

const initState = () => {
    x2_prev = undefined;
    y2_prev = undefined;
    cvs.background(...canvasBackground);
    buffer.background(...canvasBackground);
}

function setup() {
    cvs = createCanvas(800, 500);
    cvs.parent(parentElementId);

    x_center = width / 2;
    y_center = 200;
    
    buffer = createGraphics(width, height);
    buffer.background(...canvasBackground);
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