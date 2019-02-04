const parentElementId = 'sketch-holder';
const defaultIncreaseX = 0.10;
const defaultIncreaseY = 0.10;
const defaultIncreaseZ = 0.0005;
const defaultScale = 10;
const defaultNumberParticles = 10000;
const defaultMaxVelocity = 4;
const defaultMagnitude = 1;

let increaseX, increaseY, increaseZ;
let scale;
let numberParticles;
let maxVelocity;
let magnitude;

let particles;
let cols, rows;
let zoff = 0;
let flowField;
let started = false;

const startSimulation = () => {
    const readFromUi = () => {
        const getElement = name => {
            return parseFloat(document.getElementById(name).value);
        }
        
        increaseX = getElement('increaseX');
        increaseY = getElement('increaseY');
        increaseZ = getElement('increaseZ');
        scale = getElement('scale');
        numberParticles = getElement('numberParticles');
        maxVelocity = getElement('maxVelocity');
        magnitude = getElement('magnitude');       
    }

    const init = () => {
        cols = floor(width / scale);
        rows = floor(height / scale);
        flowField = new Array(rows * cols);
        particles = [];
        for (let i = 0; i < numberParticles; i++) {
            particles[i] = new Particle(width, height);
        }
    
        background(255);
    }

    readFromUi();
    init();
    started = true;
}

const resetValues = () => {
    const writeDefaultToUi = () => {
        const setElement = (name, value) => {
            document.getElementById(name).value = value;
        }
    
        setElement('increaseX', defaultIncreaseX);
        setElement('increaseY', defaultIncreaseY);
        setElement('increaseZ', defaultIncreaseZ);
        setElement('scale', defaultScale);
        setElement('numberParticles', defaultNumberParticles);
        setElement('maxVelocity', defaultMaxVelocity);
        setElement('magnitude', defaultMagnitude);
    }

    started = false;
    background(255);
    writeDefaultToUi(); 
}

function setup() {
    const cvs = createCanvas(1200, 600, P2D);
    cvs.parent(parentElementId);
    resetValues();
}

function draw() {
    if (!started) return;

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