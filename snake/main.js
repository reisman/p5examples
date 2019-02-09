let snake;
const scl = 20;
let food;

function setup() {
    createCanvas(600, 600);
    snake = new Snake();
    pickLocation();
    frameRate(15);
}

function draw() {
    background(50);
    if (snake.eat(food)) {
        pickLocation();
    }

    snake.death();
    snake.update();
    snake.show();

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if (keyCode === UP_ARROW && snake.yspeed !== 1) {
        snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW && snake.yspeed !== -1) {
        snake.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW && snake.xspeed !== -1) {
        snake.dir(1, 0);
    } else if (keyCode === LEFT_ARROW && snake.xspeed !== 1) {
        snake.dir(-1, 0);
    } 
}

function mousePressed() {
    snake.total++;
}

function pickLocation() {
    const cols = floor(width / scl);
    const rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);    
    }

    show() {
        fill(255);
        rect(this.x, this.y, scl, scl);

        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
    }

    dir(dx, dy) {
        this.xspeed = dx;
        this.yspeed = dy;
    }

    eat(pos) {
        const distance = dist(this.x, this.y, pos.x, pos.y);
        if (distance < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death() {
        for (let i = 0; i < this.tail.length; i++) {
            const distance = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
            if (distance < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}