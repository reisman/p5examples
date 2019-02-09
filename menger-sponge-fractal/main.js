const sponge = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    normalMaterial();
    smooth();
    const rootQube = new Qube(0, 0, 0, 200);
    sponge.push(rootQube);
}

function draw() {
    background(0);
    orbitControl(2, 2);
   
    directionalLight(250, 250, 250, 500, 500, 500);
    directionalLight(250, 250, 250, -500, -500, -500);
    
    for (q of sponge) {
        q.show();
    }
}

function mousePressed(e) {
    if (e.button === 2) {
        const next = [];
        for (q of sponge) {
            next.push(...q.generateSubQubes());
        }
        
        sponge.length = 0;
        sponge.push(...next);
    }
}

class Qube {
    constructor(x, y, z, size) {
        this.position = createVector(x, y, z);
        this.size = size;
    }

    show() {
        push();
        translate(this.position.x, this.position.y, this.position.z);
        box(this.size);
        pop();
    }

    generateSubQubes() {
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
                    const subQube = new Qube(newx, newy, newz, newSize);                
                    subQubes.push(subQube);
                }
            }
        }

        return subQubes;
    }
}