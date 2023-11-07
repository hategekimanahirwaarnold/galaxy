import utils, { randomColor, randomIntFromRange } from './utils'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', 'orange','#FFF6E5', '#FF7F66']

let { cos, sin, PI, abs, random } = Math
let center = {
  x: canvas.width / 2,
  y: canvas.height / 2
}
// Event Listeners
let mouseDown = false;
addEventListener('mousedown', (event) => {
  mouseDown = true;
})

addEventListener('mouseup', (event) => {
  mouseDown = false;
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x 
    this.y = y 
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }

}
function findBigSize () {
  if (canvas.width > canvas.height)
    return canvas.width + 300;
  else
    return canvas.height + 300;
}

// Implementation
let particles;
function init() { 
  particles = [];
  let particlesCount = 800;
  for (let i = 0; i < particlesCount; i++) {
    let color = randomColor(colors);
    let radius = 2 * random() + 0.08;
    let x = findBigSize() * random() - canvas.width / 2;
    let y = findBigSize() * random() - canvas.height / 2;
    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
let rotateRadians = 0;
let a = 1;
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(8, 8, 8, ${a})`
  c.fillRect(0, 0, canvas.width, canvas.height);

 c.save()
 c.translate( canvas.width / 2, canvas.height / 2)
 c.rotate(rotateRadians)
  particles.forEach((particle) => {
    particle.update();
  })
 c.restore()
 rotateRadians += 0.001;
 if (mouseDown && a > 0.05) {
  a -= 0.01;
 } else if (!mouseDown && a < 1) {
  a += 0.01
 }
}

init()
animate()