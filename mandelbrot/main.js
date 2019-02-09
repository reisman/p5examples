var minval = -0.5;
var maxval = 0.5;

var minSlider;
var maxSlider;

var frDiv;

function setup() {
    createCanvas(600, 600);
    pixelDensity(1);

    minSlider = createSlider(-2.5, 0, -2.5, 0.01);
    maxSlider = createSlider(0, 2.5, 2.5, 0.01);

    frDiv = createDiv('');
}

function draw() {
    var maxIterations = 100;

    loadPixels();

    var minSliderVal = minSlider.value();
    var maxSliderVal = maxSlider.value();
    

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, minSliderVal, maxSliderVal);
            var b = map(y, 0, height, minSliderVal, maxSliderVal);

            var ca = a;
            var cb = b;
            var currentIteration = 0;

            while (a * a + b * b <= 4 && currentIteration < maxIterations) {
                var a_new = a * a - b * b + ca;
                var b = 2 * a * b + cb;
                a = a_new;
                currentIteration++;
            }

            var bright = map(currentIteration, 0, maxIterations, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);

            if (currentIteration == maxIterations) {
                bright = 0;
            } 

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }

    updatePixels();

    frDiv.html(floor(frameRate()));
}