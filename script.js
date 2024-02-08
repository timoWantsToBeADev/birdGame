const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blueyColor = "#00a0ce";
let a = 0;
let direction = "down";
const gravity = 0.2;


canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


class Sprite {
  constructor({ position, velocity, height, width }) {
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
  }

  draw() {
    ctx.fillStyle = blueyColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    }
    this.draw();
    this.position.y += this.velocity.y;

  }
}

const bluey = new Sprite({
  position: {
    x: 50,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  height: 50,
  width: 50
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  bluey.velocity.y += gravity;
  bluey.update()
}


