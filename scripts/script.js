const snowflakes = [];
const SNOWFLAKE_COUNT = 100;

function setup() {
    createCanvas(1920 / 2, 1080 / 2);
    for (let i = 0; i < SNOWFLAKE_COUNT; i += 1) {
        snowflakes.push(new Snowflake());
    }
}
  
function draw() {
    background(0, 0, 255, 0);
    clear();
    for(let i = 0; i < snowflakes.length; i += 1) {
        snowflakes[i].update();
    }
}