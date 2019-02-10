const rows = 50;
const cols = 50;
const grid = [];

const openSet = [];
const closedSet = [];
let start;
let end;
let w, h;

const removeFromArray = (array, item) => {
    const idx = array.indexOf(item);
    array.splice(idx, 1)
}

function setup() {
    createCanvas(600, 600);

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
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }    
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    for (let i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
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
        this.wall = random(1) < 0.2;
    }

    show(color) {
        stroke(0);
        fill(color);
        if (this.wall) {
            fill(0);
        }
        rect(this.x * this.colScale, this.y * this.rowScale, this.colScale, this.rowScale);
    }

    addNeighbors(grid) {
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
            this.neighbors.push(grid[this.x - 1][this.y - 1]);
        }

        if (this.x < cols - 1 && this.y > 0) {
            this.neighbors.push(grid[this.x + 1][this.y - 1]);
        }

        if (this.x > 0 && this.y < rows - 1) {
            this.neighbors.push(grid[this.x - 1][this.y + 1]);
        }

        if (this.x < cols - 1 && this.y < rows - 1) {
            this.neighbors.push(grid[this.x + 1][this.y + 1]);
        }
    }
}