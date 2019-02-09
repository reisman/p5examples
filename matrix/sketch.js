const symbolSize = 26;
const characterOffset = 0x30A0;
const blurFactor = 70;

class Symbol {
    constructor(x, y, speed, first) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.value = undefined;
        this.first = first;
        this.switchInterval = round(random(15, 30));
    }

    setToRandomSymbol() {
        if (frameCount % this.switchInterval === 0) {
            const character = round(random(0, 96));
            this.value = String.fromCharCode(characterOffset + character);
        }
    }

    rain() {
        this.y = this.y >= height ? 0 : this.y + this.speed;
    }
}

class Stream {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.totalSymbols = round(random(10, 30));
        this.speed = random(3, 6);
        this.symbols = this.generateSymbols(this.speed, this.totalSymbols);
    }

    generateSymbols() {
        const result = [];
        for (let i = 0; i < this.totalSymbols; i++) {
            const first = i === 0 && round(random(0, 2)) === 1;
            const symbol = new Symbol(this.x, this.y, this.speed, first);
            symbol.setToRandomSymbol();
            result.push(symbol);
            this.y -= symbolSize;
        }

        return result;
    }

    render() {
        this.symbols.forEach(symbol => {
            if (symbol.first) {
                fill(180, 255, 180);         
            } else {
                fill(0, 255, 70);         
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}

const streams = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    textSize(symbolSize);
    smooth();

    let x = 0;
    for (let i = 0; i < width / symbolSize; i++) {
        const y = round(random(-500, 0))
        const stream = new Stream(x, y);
        streams.push(stream);
        x += symbolSize;
    }
}

function draw() {
    background(0, blurFactor);
    streams.forEach(stream => {
        stream.render();
    });
}