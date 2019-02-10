const rows = 100;
const cols = 100;
const grid = [];

const openSet = [];
const closedSet = [];
let start;
let end;
let w, h;
let buffer;

const removeFromArray = (array, item) => {
    const idx = array.indexOf(item);
    array.splice(idx, 1)
}

function setup() {
    createCanvas(1000, 1000);

    w = width / cols;
    h = height / rows;

    for (let i = 0; i < cols; i++) {
        grid.push(new Array(rows));
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j, w, h);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;

    openSet.push(start);

    buffer = createGraphics(width, height);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(buffer, color(255));
        }    
    }
}

function draw() {
    const path = [];

    if (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        let current = openSet[winner];

        if (current === end) {
            noLoop();
            console.log('Done');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);
        
        const neighbors = current.neighbors;
        for (neighbor of neighbors) {
            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                const tempg = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tempg < neighbor.g) {
                        newPath = true;
                    }
                } else {
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.g = tempg;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }

        
        let tmp = current;
        while (tmp) {
            path.push(tmp);
            tmp = tmp.previous;
        }
    } else {
        console.log('No solution');
        noLoop();
    }

    background(255);
    image(buffer, 0, 0, width, height);
    
    noFill();
    stroke(0, 255, 0);
    strokeWeight(0.5 * w);
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x * w + 0.5 * w, path[i].y * h + 0.5 * h);
    }
    endShape();
    strokeWeight(1);
}

const heuristic = (a, b) => {
    return dist(a.x, a.y, b.x, b.y);
};

class Spot {
    constructor(col, row, colScale, rowScale) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.x = col;
        this.y = row;
        this.colScale = colScale;
        this.rowScale = rowScale;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = random(1) < 0.35;
    }

    show(graphics, color) {
        graphics.stroke(0);
        graphics.strokeWeight(this.colScale);
        graphics.fill(color);
        const scalex = a => a * this.colScale + 0.5 * this.colScale;
        const scaley = a => a * this.rowScale + 0.5 * this.rowScale;

        if (this.wall) {
            for (let n of this.neighbors) {
                if (n.wall && (n.x > this.x || n.y > this.y)) {
                    graphics.line(scalex(this.x), scaley(this.y), scalex(n.x), scaley(n.y));
                }
            }
        }
    }

    addNeighbors(grid) {
        const isBlocked = (i, j) => {
            return grid[i][j].wall;
        }

        if (this.x < cols - 1) {
            this.neighbors.push(grid[this.x + 1][this.y]);
        }

        if (this.x > 0) {
            this.neighbors.push(grid[this.x - 1][this.y]);
        }

        if (this.y < rows - 1) {
            this.neighbors.push(grid[this.x][this.y + 1]);
        }

        if (this.y > 0) {
            this.neighbors.push(grid[this.x][this.y - 1]);
        }
    
        if (this.x > 0 && this.y > 0) {
            if (!isBlocked(this.x - 1, this.y) || !isBlocked(this.x, this.y - 1)) {
                this.neighbors.push(grid[this.x - 1][this.y - 1]);
            }
        }

        if (this.x < cols - 1 && this.y > 0) {
            if (!isBlocked(this.x + 1, this.y) || !isBlocked(this.x, this.y - 1)) {
                this.neighbors.push(grid[this.x + 1][this.y - 1]);
            }
        }

        if (this.x > 0 && this.y < rows - 1) {
            if (!isBlocked(this.x - 1, this.y) || !isBlocked(this.x, this.y + 1)) {
                this.neighbors.push(grid[this.x - 1][this.y + 1]);
            }
        }

        if (this.x < cols - 1 && this.y < rows - 1) {
            if (!isBlocked(this.x + 1, this.y) || !isBlocked(this.x, this.y + 1)) {
                this.neighbors.push(grid[this.x + 1][this.y + 1]);
            }
        }
    }
}