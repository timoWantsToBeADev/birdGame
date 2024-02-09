const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blueyColor = "#00a0ce";
const gravity = 0.7;
let jump = false;



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
      this.coolDown = false;

    }

    bluey.velocity.x = 0;
    if (liveKeys[0] === "a") { this.velocity.x = -3 }
    else if (liveKeys[0] === "d") { this.velocity.x = 3 }

    if (jump === true && this.coolDown === false) {
      this.velocity.y = -10;
      this.coolDown = true;
    }





    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    // console.log(`lastkey is ${this.lastkey}   A pressed state is ${keys.a.pressed}, D pressed state is ${keys.d.pressed}`)
  }
}


class Cheese {
  constructor({ position, size, duration }) {
    this.position = position
    this.size = size
    this.duration = duration
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);

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


const kaas = new Cheese({
  position: { x: 800, y: 300 },
  size: { width: 10, height: 10 },
  duration: 5
})

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bluey.velocity.y += gravity;
  bluey.update();
  kaas.draw();
}

let liveKeys = []; //liveKeys[0] is leading direction

window.addEventListener("keydown", (event) => {
  console.log(`key down = ${event.key}`)

  if (event.keys === "w") {
    jump = true;
    return;
  }

  if (!liveKeys.includes(event.key)) {
    liveKeys.unshift(event.key);
    console.log(liveKeys);
  }


});


window.addEventListener("keyup", (event) => {
  console.log(`key up= ${event.key}`)

  if (event.keys === "w") {
    jump = false;
    return;
  }

  if (liveKeys.includes(event.key)) {
    liveKeys = liveKeys.filter((key) => key != event.key)
    console.log(liveKeys[0]);
  }
});

