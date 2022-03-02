const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let x = 200;
let y = 200;

c.fillStyle = "rgba(0, 0, 255)";
const colorArray = ["#2c3e50", "#ecf0f1", "#3498db", "#298089", "#e74c3c"];

const Mouse = {
  x: undefined,
  y: undefined,
};

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.maxRadius = 30;
  this.minRadius = radius;
  this.colors = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colors;
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      this.radius < this.maxRadius &&
      Mouse.x - this.x < 50 &&
      Mouse.x - this.x > -50 &&
      Mouse.y - this.y < 50 &&
      Mouse.y - this.y > -50
    ) {
      this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}
let circleArray = [];

for (let i = 0; i < 2000; i++) {
  let radius = Math.random() * 3 + 1;
  let dy = Math.random() * 3;
  let dx = Math.random() * 3;
  let xRandom = Math.random() * (innerWidth - radius * 2) + radius;
  let yRandom = Math.random() * (innerHeight - radius * 2) + radius;
  circleArray.push(new Circle(xRandom, yRandom, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

window.addEventListener("mousemove", (event) => {
  Mouse.x = event.x;
  Mouse.y = event.y;
});

function init() {
  circleArray = [];
  for (let i = 0; i < 2000; i++) {
    let radius = Math.random() * 3 + 1;
    let dy = Math.random() * 3;
    let dx = Math.random() * 3;
    let xRandom = Math.random() * (innerWidth - radius * 2) + radius;
    let yRandom = Math.random() * (innerHeight - radius * 2) + radius;
    circleArray.push(new Circle(xRandom, yRandom, dx, dy, radius));
  }
}
init();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

console.log("Have Fun =)");
