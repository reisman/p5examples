const points = [
    new Vector4D(-1, -1, -1, 1),
    new Vector4D(1, -1, -1, 1),
    new Vector4D(1, 1, -1, 1),
    new Vector4D(-1, 1, -1, 1),
    new Vector4D(-1, -1, 1, 1),
    new Vector4D(1, -1, 1, 1),
    new Vector4D(1, 1, 1, 1),
    new Vector4D(-1, 1, 1, 1),

    new Vector4D(-1, -1, -1, -1),
    new Vector4D(1, -1, -1, -1),
    new Vector4D(1, 1, -1, -1),
    new Vector4D(-1, 1, -1, -1),
    new Vector4D(-1, -1, 1, -1),
    new Vector4D(1, -1, 1, -1),
    new Vector4D(1, 1, 1, -1),
    new Vector4D(-1, 1, 1, -1),
];

let angle = 0.0;

function setup() { 
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    setAttributes('antialias', true);
} 
  
function draw() {
    background(0);
    rotateX(-PI/2);
    
    const connect = (offset, i, j, pts) => {
        connectVectors(pts[offset + i], pts[offset + j]);
    };

    const connectVectors = (v1, v2) => {
        stroke(255);
        strokeWeight(1);
        line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    };
    
    const toVector = mat => {
        const vals = mat.getRows().map(row => row[0]);
        return new Vector(...vals);
    }

    const distance = 2.0;
    const points3D = [];

    for (const v of points) {
        stroke(255);
        strokeWeight(8);
        noFill();

        const rotationMatrixXY = new Matrix(
            [cos(angle), -sin(angle), 0, 0],
            [sin(angle), cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        );

        const rotationMatrixXZ = new Matrix(
            [cos(angle), 0, -sin(angle), 0],
            [0, 1, 0, 0],
            [sin(angle), 0, cos(angle), 0],
            [0, 0, 0, 1],
        );

        const rotationMatrixZW = new Matrix(
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, cos(angle), -sin(angle)],
            [0, 0, sin(angle), cos(angle)]
        );

        const rotated = matmul(rotationMatrixZW, matmul(rotationMatrixXY, v));//matmul(rotationMatrixXZ, matmul(rotationMatrixXY, v)));
        const w = 1 / (distance - rotated.getRow(3)[0]);
        const projectionMatrix = new Matrix(
            [w, 0, 0, 0],
            [0, w, 0, 0],
            [0, 0, w, 0]
        );

        const projected = toVector(matmul(projectionMatrix, rotated)).mul(200);
        points3D.push(projected);
        point(projected.x, projected.y, projected.z);
    }
    
    for (let i = 0; i < 4; i++) {
        const mod = (i + 1) % 4;
        connect(0, i, mod, points3D);
        connect(0, i + 4, 4 + mod, points3D);
        connect(0, i, i + 4, points3D);
        connect(8, i, mod, points3D);
        connect(8, i + 4, 4 + mod, points3D);
        connect(8, i, i + 4, points3D);
    }

    for (let i = 0; i < 8; i++) {
        connect(0, i, i + 8, points3D);
    }

    angle += 0.01;
}
