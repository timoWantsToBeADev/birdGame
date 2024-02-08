const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blueyColor = "#00a0ce";
let a = 0;
let direction = "down";



canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    ctx.fillStyle = blueyColor;
    ctx.fillRect(this.position.x, this.position.y, 50, 50);
  }
  update() {
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
    x: 1,
    y: 1,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  if (direction === "down") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bluey.update();
    console.log("going down");
  }
  if (bluey.position.y >= (canvas.height - 50) && direction === "down") {
    flipDirection()
  }
  if (bluey.position.y <= 0 && direction === "up") {
    flipDirection()
  }


  if (direction === "up") {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bluey.update();
    console.log("going up");
  }


}


function flipDirection() {
  if (direction === "up") {
    direction = "down";
    bluey.velocity.y = 1
  } else {
    direction = "up";
    bluey.velocity.y = -1;
  }
}
