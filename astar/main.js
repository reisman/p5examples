const rows = 5;
const cols = 5;
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

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    openSet.push(start);
}

function draw() {
    if (openSet.length > 0) {
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        let current = openSet[winner];

        if (current === end) {
            console.log('Done');
        }

        removeFromArray(openSet, current);
        closedSet.push(current);
        
    } else {

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
}

class Spot {
    constructor(col, row, colScale, rowScale) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.x = col;
        this.y = row;
        this.colScale = colScale;
        this.rowScale = rowScale;
    }

    show(color) {
        stroke(0);
        fill(color);
        rect(this.x * this.colScale, this.y * this.rowScale, this.colScale, this.rowScale);
    }
}