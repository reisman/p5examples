let model;
let xs;
let dimension;

const trainInterval = 10;
const resolution = 40;
const train_xs = tf.tensor2d([[0,0], [1,0], [0,1], [1,1]]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

function setup() {
    createCanvas(800, 800);
    dimension = width /  resolution;
    model = createModel();
    xs = createInputs(dimension);
    setTimeout(() => train(model), trainInterval);
}

function draw() {
    background(0);

    const ys = tf.tidy(() => model.predict(xs).dataSync());
    stroke(255);

    for (let c = 0; c < dimension; c++) {
        for (let r = 0; r < dimension; r++) {
            const y = ys[c * dimension + r];
            const color = y * 255;
            fill(resultToColor(y));
            rect(c * resolution, r * resolution, resolution, resolution);
            fill(255);
            textSize(8);
            textAlign(CENTER, CENTER);
            text(resultToText(y), c * resolution + resolution / 2, r * resolution + resolution / 2);
            //text(nf(y, 1, 2), c * resolution + resolution / 2, r * resolution + resolution / 2)
        }
    }
}

const resultToText = result => {
    if (result > 0.9) return 'XOR';
    else if (result < 0.1) return 'NOT\nXOR';
    else return nf(result, 1, 2);
};

const resultToColor = result => {
    if (result > 0.9) return [0, 255 * result, 0, 255 * result];
    else if (result < 0.1) return [255 * (1 - result), 0, 0];
    else return [255 * result];
};

const train = model => {
    trainModel(model)
        .then(h => {
            if (h.loss[0] > 0.0001) {
                setTimeout(() => train(model), trainInterval);
            }
        });
};

const trainModel = async model => {
    const result = await model.fit(train_xs, train_ys, {
        shuffle: true,
        epochs: 5
    });

    tf.dispose();
    return result.history;
};

const createInputs = (dimension) => {
    const inputs = [];
    for (let c = 0; c < dimension; c++) {
        for (let r = 0; r < dimension; r++) {
            inputs.push([c / dimension, r / dimension]);
        }
    }

    return tf.tensor2d(inputs);
};

const createModel = () => {
    const hidden = tf.layers.dense({
        inputShape: [2],
        units: 16,
        activation: 'sigmoid',
    });

    const output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
    });

    const model = tf.sequential();
    model.add(hidden);
    model.add(output);

    const learningRate = 0.2;
    const optimizer = tf.train.adam(learningRate);

    model.compile({
        optimizer,
        loss: 'meanSquaredError',
    });

    return model;
};