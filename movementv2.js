const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blueyColor = "#00a0ce";
const gravity = 0.7;
const maxJump = 3;
let points = 0;

function runGame() {
  animate();
}


// drawing the canvas
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
    this.jump = false;
    this.jumpcount = 0;
  }

  draw() {
    ctx.fillStyle = blueyColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.jumpcount = 0;;
    }

    bluey.velocity.x = 0;

    if (liveKeys[0] === "a") { this.velocity.x = -3 }
    else if (liveKeys[0] === "d") { this.velocity.x = 3 }

    if (this.jump === true && this.jumpcount < maxJump && bluey.position.y > 30) {
      this.velocity.y = -12;
      //////////<---- jump timer in update!

    }

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
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
  if (!liveKeys.includes(event.key) && (event.key === "a" || event.key === "d")) {
    liveKeys.unshift(event.key);
  }
});



///separate jump eventlistener
window.addEventListener("keydown", (event) => {
  if (event.key === "w" && bluey.jumpcount < maxJump && !bluey.jump) {
    bluey.jump = true;
    bluey.jumpcount++
    console.log(`jump is ${bluey.jump}`)
    console.log(bluey.jumpcount)
  }

});


window.addEventListener("keyup", (event) => {
  if (liveKeys.includes(event.key) && (event.key === "a" || event.key === "d")) {
    liveKeys = liveKeys.filter((key) => key != event.key)
    console.log(liveKeys[0]);
  }

  if (event.key === "w") {
    bluey.jump = false;

    console.log(`jump is ${bluey.jump}`)
  }
});


if (bluey.position.x > kaas.position.x && bluey.position.x < kaas.position.x + kaas.size.width) {
  console.log("point")
  points += 1;
}
