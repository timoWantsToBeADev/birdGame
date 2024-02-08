const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const blueyColor = "#00a0ce";
let a = 0;
const gravity = 0.7;



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
    this.lastkey
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



  bluey.velocity.x = 0;
  if (keys.a.pressed === true && bluey.lastkey === "a") { bluey.velocity.x = -3 }
  if (keys.d.pressed === true && bluey.lastkey === "d") { bluey.velocity.x = 3 }


}


const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  }
}





window.addEventListener("keydown", (event) => {
  console.log(`key down = ${event.key}`)

  switch (event.key) {
    case "w": bluey.velocity.y = -15;
      //console.log(keys.ArrowUp.pressed); break;
      break;
    case "a": keys.a.pressed = true;
      bluey.lastkey = "a";
      break;
    //console.log(keys.ArrowUp.pressed); break;

    case "d": keys.d.pressed = true;
      bluey.lastkey = "d";
      break;
    //console.log(keys.ArrowUp.pressed); break;

    case "s": keys.s.pressed = true;
      break;
    //console.log(keys.ArrowUp.pressed); break;

    default:
      break;
  }

});


window.addEventListener("keyup", (event) => {
  //console.log(`key up = ${event.key}`)

  switch (event.key) {
    case "w": keys.w.pressed = false;
    //console.log(keys.ArrowUp.pressed)

    case "a": keys.a.pressed = false;
    //console.log(keys.ArrowUp.pressed); break;

    case "d": keys.d.pressed = false;
    //console.log(keys.ArrowUp.pressed); break;

    case "s": keys.s.pressed = false;
    //console.log(keys.ArrowUp.pressed); break;


    default:
      break;
  }

});

