const LAYER_COUNT = 15;
class Snowflake {
    constructor() {
        this.randomizeStats();
    }
    randomizeStats() {
        this.x = floor(random(-100, 1920 / 2 + 100));
        this.y = floor(random(-10, -500));
        this.r = floor(random(0.25, 3));
        this.time = 0;
        this.timeDelta = random(0.01, 0.05);
        this.xRange = random(1, 2);
        this.yRange = random(-1, 1);
        this.ySpeed = random(0.2, 0.9);
    }
    update() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
        fill(255,255,255,100);
        ellipse(this.x, this.y, this.r, this.r * 1.5);
        const baseAlpha = 100;
        const alphaStep = baseAlpha / LAYER_COUNT;
        for (let i = 0; i < LAYER_COUNT; i += 1) {
            const alpha = baseAlpha - alphaStep * i;
            fill(255,255,255, alpha);
            const size = this.r + (this.r * 0.5) * i;
            ellipse(this.x, this.y, size, size);
        }

        this.time += this.timeDelta;
        this.x += Math.sin(this.time) * this.xRange;
        this.y += Math.cos(this.time * 2) * this.yRange + this.ySpeed;
        if (this.y >= height + 50) {
            this.randomizeStats();
        }
    }
}

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