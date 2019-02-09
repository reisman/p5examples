let angle = 0;
let qube;
let sponge = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    normalMaterial();
    smooth();
    b = new Box(0, 0, 0, 200);
    sponge.push(b);
}

function draw() {
    background(0);
    orbitControl(2, 2);
    stroke(255);
    directionalLight(250, 250, 250, 500, 500, 500);
    directionalLight(250, 250, 250, -500, -500, -500);
    
    for (q of sponge) {
        q.show();
    }

    angle += 0.01;
}

function mousePressed(e) {
    console.log(e);
    if (e.button === 2) {
        const next = [];
        for (q of sponge) {
            next.push(...q.generate());
        }

        sponge = next;
    }
}

class Box {
    constructor(x, y, z, size) {
        this.position = createVector(x, y, z);
        this.size = size;
    }

    show() {
        push();
        translate(this.position.x, this.position.y, this.position.z);
        //fill(255);
        box(this.size);
        pop();
    }

    generate() {
        const newSize = this.size / 3;
        const subQubes = [];

        for (let x = -1; x < 2; x++) {
            const newx = this.position.x + x * newSize;

            for (let y = -1; y < 2; y++) {
                const newy = this.position.y + y * newSize;
                if (x === 0 && y === 0) continue;
            
                for (let z = -1; z < 2; z++) {
                    if (z === 0 && ((x === 0) || (y === 0))) continue;
                    const newz = this.position.z + z * newSize;
                    const subQube = new Box(newx, newy, newz, newSize);                
                    subQubes.push(subQube);
                }
            }
        }

        return subQubes;
    }
}