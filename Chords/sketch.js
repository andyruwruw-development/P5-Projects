const width = window.innerWidth;
const height = window.innerHeight;

const circle = new Circle(width / 2, height / 2, height / 2 - 50);

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(250);
  circle.newChord();
  circle.show();
}

