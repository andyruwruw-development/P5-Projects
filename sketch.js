const width = window.innerWidth;
const height = window.innerHeight - 60;

const perception = 100;

let quadTreeOn = false;

const boundary = new Rectangle(width / 2, height / 2, width, height);

let boids = [];

let alignSlider, cohesionSlider, separationSlider;

function preload() {
  boidImg = loadImage('https://i.ibb.co/HNpn6Wy/ant.png');
}



function setup() {
  setupSliders();
  createCanvas(width, height);
  for (let i = 0; i < 400; i++) {
    boids[i] = new Boid(random(width), random(height), perception);
  }
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
    if (!quadTreeOn)
      drawCircle(view, other.length);
    boid.show();
  }
}

function setupSliders() {
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  alignSlider.position(10, 70);
  alignSlider.style('width', '80px');
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider.position(119, 70);
  cohesionSlider.style('width', '80px');
  separationSlider = createSlider(0, 2, 2, 0.1);
  separationSlider.position(228, 70);
  separationSlider.style('width', '80px');
  checkbox = createCheckbox('', false);
  checkbox.position(347, 73);
  checkbox.changed(quadTreeToggle);
}

function quadTreeToggle() {
  quadTreeOn = !quadTreeOn;
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

