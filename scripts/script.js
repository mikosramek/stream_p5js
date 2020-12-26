let capture;
let tracker

let hat;

function setup() {
   
    const videoInput = createCapture(VIDEO);
    videoInput.size(800, 600);
    videoInput.position(0, 0);
    videoInput.alphac = 0.5;
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);
    videoInput.elt.style.zIndex = -1;

    const canvas = createCanvas(800, 600);
    canvas.position(0, 0);

    hat = loadImage('./assets/santa-hat.png');
}

function getPositions(positions, pointIndex) {
    const x = positions[pointIndex] ? positions[pointIndex][0] : -1000;
    const y = positions[pointIndex] ? positions[pointIndex][1] : -1000;
    return { x, y };
}
  
function draw() {
    background(200);
    clear();
    noStroke();
    const detectionScore = ctracker.getScore();
    if (detectionScore > 0) {
    
        // get array of face marker positions [x, y] format
        const positions = ctracker.getCurrentPosition();
    
        /*
        You can find all the points here
        https://camo.githubusercontent.com/e967f92904c8ef84228b8950d3a278efb895b9d2/68747470733a2f2f617564756e6f2e6769746875622e696f2f636c6d747261636b722f6578616d706c65732f6d656469612f666163656d6f64656c5f6e756d626572696e675f6e65775f736d616c6c2e706e67
        */

        const { x : leftEyeX,  y : leftEyeY } = this.getPositions(positions, 32);
    
        const { x : rightEyeX,  y :rightEyeY } = this.getPositions(positions, 27);
    
        const { x : noseX,  y : noseY } = this.getPositions(positions, 62);
        
        const { x : faceLeftX,  y : faceLeftY } = this.getPositions(positions, 1);

        const { x : faceRightX,  y : faceRightY } = this.getPositions(positions, 13);

        const { x : faceUpperMiddleX,  y : faceUpperMiddleY } = this.getPositions(positions, 33);
        const { x : faceBottomX,  y : faceBottomY } = this.getPositions(positions, 7);
        
        //draw the eyes
        // fill(0);
        // ellipse(rightEyeX, rightEyeY, 15, 15);
        // ellipse(leftEyeX, leftEyeY, 15, 15);



        const faceWidth = dist(faceLeftX, faceLeftY, faceRightX, faceRightY);
        
        
        fill(255, 0, 0, 75);
        const blushSize = 50;
        const cheekY = faceLeftY + dist(faceLeftX, faceLeftY, faceLeftX, noseY) * 0.5;
        const cheekOffset = faceWidth * 0.125;

        ellipse(faceLeftX + cheekOffset, cheekY, blushSize, blushSize);
        ellipse(faceRightX - cheekOffset, cheekY, blushSize, blushSize);


        const halfFaceSize = dist(faceBottomX, faceBottomY, faceUpperMiddleX, faceUpperMiddleY);

        // draw a hat
        imageMode(CENTER);
        image(hat, faceUpperMiddleX - 25, faceUpperMiddleY - halfFaceSize * 0.5);
        
        //draw a nose
        // const noseSize = 80;
        // fill(255, 0, 0);
        // ellipse(noseX, noseY, noseSize, noseSize);
    
      }
}