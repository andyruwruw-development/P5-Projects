const width = window.innerWidth;
const height = window.innerHeight;

const perception = 50;

const boundary = new Rectangle(width / 2, height / 2, width, height);

let boids = [];

let alignSlider, cohesionSlider, separationSlider;

function preload() {
  boidImg = loadImage('https://i.ibb.co/HNpn6Wy/ant.png');
}



function setup() {
  createCanvas(width, height);

  for (let i = 0; i < 800; i++) {
    boids[i] = new Boid(random(width), random(height), perception);
  }

  setupSliders();
}



function draw() {
  background(0);
  let quadtree = new QuadTree(boundary, 4, false);

  for (let boid of boids) {
    let point = new Point(boid.x, boid.y, boid);
    quadtree.insert(point);
  }  
  for (let boid of boids) {
    let view = new Circle(boid.x, boid.y, perception / 2);
    let other = quadtree.query(view).map(findReference);
    boid.edges();
    boid.flock(other);
    boid.update();
    drawCircle(view, other.length);
    boid.show();
  }
}

function setupSliders() {
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
}

function findReference(point) {
  return point.data;
}

function drawCircle(circle, color) {
  color -= 1;
  if (color > 3)
  {
    color = 3;
  }
  colors = ['rgba(0,0,255,0.05)','rgba(0,255,0,0.05)','rgba(0,255,255,0.05)','rgba(255,0,0,0.05)'];
  fill(colors[color]);
  stroke(colors[color]);
  strokeWeight(1);
  ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
}

