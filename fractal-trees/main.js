let angle = 0;
let slider;

function setup() { 
    createCanvas(window.innerWidth, 0.75 * window.innerHeight);
    slider = createSlider(0, 2 * PI, PI / 4, 0.01);
} 
  
function draw() {
    background(0);

    stroke(255);
    translate(width / 2, height);

    const len = 200;
    const lenFactor = 0.7;
    const branching = 2;
    branch(len, lenFactor, 0);
}

const branch = (len, factor, level) => {
    line(0, 0, 0, -len);
    translate(0, -len);
    
    if (len > 4){
        angle = slider.value();
        /*
        for (let i = 0; i < branching; i++) {
            push();
            rotate(angle);
            branch(len * factor, factor, branching);
            pop();
        }
        */
       
        push();
        rotate(angle);
        branch(len * factor, factor, level + 1);
        pop();
        /*push();
        branch(len * factor, factor, level + 1);
        pop();*/
        push();
        rotate(-angle);
        branch(len * factor, factor, level + 1);
        pop();
        
    }
}