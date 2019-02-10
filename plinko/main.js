const Engine = Matter.Engine,
      World = Matter.World,
      Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
const plinkos = [];
const bounds = [];
const cols = 10;
const rows = 10;

function setup() {
    createCanvas(600, 750);
    colorMode(HSB);

    engine = Engine.create();
    world = engine.world;

    const spacing = width / cols;
    for (let j = 0; j < rows; j++) {
        const colsCount = j % 2 === 0 ? cols : cols + 1;
        for (let i = 0; i < colsCount; i++) {
            let x = i * spacing;
            if (j % 2 === 0) {
                x += 0.5 * spacing;
            }

            const y = spacing + j * spacing;
            const plinko = new Plinko(x, y, 16);
            plinkos.push(plinko);
        }    
    }

    const bottom = new Boundary(width / 2, height + 50, width, 100);
    bounds.push(bottom);

    for (let i = 0; i < cols + 1; i++) {
        const h = 100;
        const w = 10;
        const x = i * spacing;
        const y = height - h / 2;
        const bucket = new Boundary(x, y, w, h);
        bounds.push(bucket);
    }
}

function draw() {
    background(0, 0, 10);

    Engine.update(engine);
    
    cleanupParticles();
    
    for (particle of particles) {
        particle.show();
    }

    for (plinko of plinkos) {
        plinko.show();
    }

    for (boundary of bounds) {
        boundary.show();
    }
}

function mousePressed(e) {
    const particle = new Particle(e.offsetX, 0, 10);
    particles.push(particle);
}

const cleanupParticles = () => {
    const offScreen = particles.filter(p => p.isOffScreen());
    offScreen.forEach(p => {
        particles.splice(particles.indexOf(p), 1);
        p.cleanup();
    })
}