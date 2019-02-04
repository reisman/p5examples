const points = [
    new Vector(-0.5, -0.5, -0.5),
    new Vector(0.5, -0.5, -0.5),
    new Vector(0.5, 0.5, -0.5),
    new Vector(-0.5, 0.5, -0.5),
    new Vector(-0.5, -0.5, 0.5),
    new Vector(0.5, -0.5, 0.5),
    new Vector(0.5, 0.5, 0.5),
    new Vector(-0.5, 0.5, 0.5),
];

let angle = 0.0;

function setup() { 
    createCanvas(600, 600);
} 
  
function draw() {
    background(30);
    translate(width / 2, height / 2);
    
    const createRotationMatrix = () => {
        const rotationMatrixX = new Matrix(
            [1, 0, 0],
            [0, cos(angle), -sin(angle)],
            [0, sin(angle), cos(angle)],
        );
    
        const rotationMatrixY = new Matrix(
            [cos(angle), 0, sin(angle)],
            [0, 1, 0],
            [-sin(angle), 0, cos(angle)],
        );
    
        const rotationMatrixZ = new Matrix(
            [cos(angle), -sin(angle), 0],
            [sin(angle), cos(angle), 0],
            [0, 0, 1]
        );

        return matmul(rotationMatrixX, matmul(rotationMatrixY, rotationMatrixZ));
    }

    const rotate = p => {
        return matmul(rotationMatrix, p);
    };

    const rotationMatrix = createRotationMatrix();

    const connect = (i, j, pts) => {
        connectVectors(pts[i], pts[j]);
    };

    const connectVectors = (v1, v2) => {
        stroke(255);
        strokeWeight(1);
        line(v1.x, v1.y, v2.x, v2.y);
    };

    const toVector = mat => {
        const vals = mat.getRows().map(row => row[0]);
        return new Vector(...vals);
    }

    const distance = 2.0;
    const points2D = [];
    points.forEach(p => {
        const rotated = rotate(p);
        const z = 1 / (distance - rotated.getRow(2)[0]);
        const projectionMatrix = new Matrix(
            [z, 0, 0],
            [0, z, 0]
        );
        const point2D = toVector(matmul(projectionMatrix, rotated)).mul(200);
        points2D.push(point2D);
    });
    
    for (const v of points2D) {
        stroke(255);
        strokeWeight(20);
        noFill();
        point(v.x, v.y);
    }

    for (let i = 0; i < 4; i++) {
        const mod = (i + 1) % 4;
        connect(i, mod, points2D);
        connect(i + 4, 4 + mod, points2D);
        connect(i, i + 4, points2D);
    }

    angle += 0.01;
}
