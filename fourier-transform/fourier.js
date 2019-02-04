function discreteFourierTransform(x) {
    const N = x.length;
    const X = [];
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;
        for (let n = 0; n < N; n++) {
            const phi = 2 * Math.PI * k * n / N;
            const signal = x[n];
            re += signal * Math.cos(phi);
            im -= signal * Math.sin(phi);
        }
        
        re /= N;
        im /= N;

        let freq = k;
        let amplitude = Math.sqrt(re * re + im * im);
        let phase = Math.atan2(im, re);

        X[k] = { re, im, freq, amplitude, phase };
    }

    return X;
}