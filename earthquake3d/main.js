let lon = 144.9631;
let lat = -37.8136;
const radius = 200;
let table;
const earthquakes = [];
let earthImage;

function preload() {
    table = loadTable('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv', 'csv', 'header');
    earthImage = loadImage('earth.jpg');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    smooth();
    
    for (row of table.getRows()) {
        const lat = row.getNum('latitude');
        const lon = row.getNum('longitude');
        const mag = row.getNum('mag');
        earthquakes.push({lat, lon, mag});
    }
}

function draw() {
    orbitControl();
    
    background(0);
    noStroke();
    fill(200);
    directionalLight(250, 250, 250, 0, 0, -500);

    texture(earthImage);
    sphere(radius);
    
    for (ea of earthquakes) {
        const {x, y, z} = calculateCoordinates(ea.lat, ea.lon);
        const pos = createVector(x, y, z);
        const { angle, axis: rotationAxis } = calculateRotation(pos);
        const height = calculateHeight(ea.mag);
       
        push();
        translate(x, y, z);
        rotate(angle, rotationAxis);
        fill(255);
        box(height, 5, 5);
        pop();
    }
}

const calculateCoordinates = (lat, lon) => {
    const theta = radians(lat) + PI / 2;
    const phi = radians(lon) + PI;
    const x = radius * sin(theta) * cos(phi);
    const y = -radius * sin(theta) * sin(phi);
    const z = radius * cos(theta);
    return {x, y, z};
};

const calculateHeight = mag => {
    return map(pow(10, mag), 0, pow(10, 6), 10, 500);
};

const calculateRotation = pos => {
    const xAxis = createVector(1, 0, 0);
    const angle = xAxis.angleBetween(pos);
    const axis = xAxis.cross(pos);
    return { angle, axis };
};