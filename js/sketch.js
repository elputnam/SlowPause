// trying to create an animation of breathing rainbow bubbles

let bubbles = [];
const MIN = 0; 
const MAX = 100;
let grow = 5;
inc = 0.01;

//CCapture
// var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'webm', 
  workersPath: 'js/',
  framerate: 15
});


function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(15);
  background(0);
  for (var i = 0; i < 100; i++){
    bubbles[i] = new Bubble(random(width), random(height), random(20, 100));
  }
}

function draw() {
  if (frameCount==1) capturer.start(); // start the animation capture
  background(0, 1);
  for (let i = 0; i < bubbles.length; i++){
    // bubbles[i].move();
    bubbles[i].breathe();
    bubbles[i].edges();
    bubbles[i].show();
  }
  capturer.capture(document.getElementById('defaultCanvas0'));  
  if (frameCount==3000){
    save_record();
  }
  print(frameCount);
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

class Bubble {
  constructor(x, y, r){
    this.vel = createVector(random(-1,1), createVector(1));
    this.pos = createVector(x, y);
    this.r = r;
    this.hue = random(360);
    this.sat = random(100);
    this.bri = random(100);
  }
  move(){
    this.pos.x += random(-1, 1);
    this.pos.y += random(-1, 1);
  }

  breathe() {
    if (grow  <= MIN || grow >= MAX){
      inc *= -1;
      fill(this.hue, this.sat, this.bri, random(20));
    }
  }

  edges(){
    if (this.pos.x < 0){
      this.pos.x = random(width);
    } else if (this.pos.x > width){
      this.pos.x = random(width);
    }

    if (this.pos.y > height+100){
      this.pos.y = 0;
      
    }
  }
  show(){
    noStroke();
    //stroke(this.hue, this.sat, this.bri);
    //fill(random(360), random(100), random(100), random(5, 30));
    if (frameCount%45 == 0){
    // fill(random(360), this.sat, this.bri, random(20,50));
      // fill(random(360), 100, 100, random(20,70));
    }
    ellipse(this.pos.x, this.pos.y, this.r + grow);
    grow += inc;
  }
}

function save_record() {
  capturer.save();
}
