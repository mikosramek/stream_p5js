const layers = 15;
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
        const alphaStep = baseAlpha / layers;
        for (let i = 0; i < layers; i += 1) {
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