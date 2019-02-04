class Matrix {
    constructor(...vals) {
        this.vals = vals;
    }

    getRow(pos) {
        return this.vals[pos];
    }

    getCol(pos) {
        return this.vals.map(row => row[pos]);
    }

    getRows() {
        return this.vals;
    }

    getRowCount() {
        return this.vals.length;
    }

    getColumnCount() {
        return this.vals.length > 0 ? this.vals[0].length : 0;
    }
}

class Vector extends Matrix {
    constructor(...vals) {
        super(...vals.map(v => [v]));
    }

    getValue(idx) {
        return this.vals[idx][0];
    }

    get x() {
        return this.getValue(0);
    } 

    get y() {
        return this.getValue(1);
    } 

    get z() {
        return this.getValue(2);
    }

    getValueCount() {
        return this.vals.length;
    }

    mul(factor) {
        return new Vector(...this.vals.map(v => factor * v));
    }
}

class Vector4D extends Matrix {
    constructor(...vals) {
        super(...vals.map(v => [v]));
    }

    getValue(idx) {
        return this.vals[idx][0];
    }

    get x() {
        return this.getValue(0);
    } 

    get y() {
        return this.getValue(1);
    } 

    get z() {
        return this.getValue(2);
    }

    get w() {
        return this.getValue(3);
    }

    getValueCount() {
        return this.vals.length;
    }

    mul(factor) {
        return new Vector4D(...this.vals.map(v => factor * v));
    }
}

const matmul = (matA, matB) => {
    if (matA.getColumnCount() !== matB.getRowCount()) {
        throw 'The number of columns in the matrix must match the number of the columns of the multiplier'
    }

    const result = [];
    for (let i = 0; i < matA.getRowCount(); i++){
        const row = matA.getRow(i);
        const rowResult = [];
        for (let j = 0; j < matB.getColumnCount(); j++) {
            const col = matB.getCol(j);
            let product = 0.0;
            for (let k = 0; k < row.length; k++) {
                product += row[k] * col[k];
            }
            rowResult.push(product);
        }

        result.push(rowResult);
    }

    return new Matrix(...result);
};