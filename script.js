getScores();
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const scorelineEl = document.getElementById("scoreline");
const startbtnEl = document.getElementById("start-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const eatAudio = document.getElementById("eat-audio");
const btnAudio = document.getElementById("btn-audio");
const soundtrackAudio = document.getElementById("soundtrack-audio");


soundtrackAudio.volume = 0.5;
canvas.width = 1024;
canvas.height = 576;
let fps = 120;

const blueyColor = "#00a0ce";
const gravity = 0.7;
const maxJump = 3;
let points = 0;
let calories = 0;
let duration = 7;
let timeLeft = duration;
let lives = 3;
let gameRunning = true;
let speedModifier = 1;

const randomX = () => {
  return Math.floor(Math.random() * (canvas.width - 20 + 1));
};
const randomY = () => {
  return Math.floor(Math.random() * 350) + 50;
};
const randomW = () => {
  return Math.floor(Math.random() * 10) + 10;
};
const randomH = () => {
  return Math.floor(Math.random() * 10) + 10;
};

let playerName = window.prompt("Enter your name");
console.log(highScores);
highScoresContainerEl.hidden = false


function runGame() {
  btnAudio.play();
  soundtrackAudio.loop = true;
  soundtrackAudio.volume = 0.25;
  soundtrackAudio.play();
  animate();
  startbtnEl.hidden = true;
  gameRunning = true;

  const speedUp = setInterval(() => {
    if (duration > 3) {
      duration -= 1;
      console.log(`duration ${duration}`);
    } else clearInterval(speedUp);
  }, 15000);
}

// drawing the canvas
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// class Sprite {
//   constructor({ position, velocity, height, width }) {
//     this.position = position;
//     this.velocity = velocity;
//     this.height = height;
//     this.width = width;
//     this.jump = false;
//     this.jumpcount = 0;
//   }

//   draw() {
//     ctx.fillStyle = blueyColor;
//     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
//   update() {
//     if (this.position.y + this.height + this.velocity.y >= canvas.height) {
//       this.velocity.y = 0;
//       this.jumpcount = 0;
//     }

//     if (this.position.x < 0) {
//       this.position.x = 0;
//     } else if (this.position.x + this.width > 1024) {
//       this.position.x = 1024 - this.width;
//     } else if (this.position.y < 0) {
//       this.position.y = 0;
//     }

//     bluey.velocity.x = 0;

//     if (liveKeys[0] === "a") { this.velocity.x = -3 }
//     else if (liveKeys[0] === "d") { this.velocity.x = 3 }

//     if (this.jump === true && this.jumpcount < maxJump && bluey.position.y > 30) {
//       this.velocity.y = -12;
//       //////////<---- jump timer in update!

//     }

//     this.draw();
//     this.position.y += this.velocity.y;
//     this.position.x += this.velocity.x;
//   }
// }

class Charachter {
  constructor({ position, velocity, height, width }) {
    this.position = position;
    this.velocity = velocity;
    this.height = height;
    this.width = width;
    this.jump = false;
    this.jumpcount = 0;
    this.image = new Image(this.width, this.height);
    this.image.src = "./img/bird.png";
    this.glideMultiplier = 0; 
    // this.gliding = false;
  }

  glide(velocityY){
    if(velocityY > 0) {
      console.log(`Added speed: ${(velocityY / 5)}`)
    return 1 + (velocityY / 10)
  } else {return 1}
  }
    
  draw() {
    // ctx.fillStyle = blueyColor;
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.jumpcount = 0;
    }

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + this.width > 1024) {
      this.position.x = 1024 - this.width;
    } else if (this.position.y < 0) {
      this.position.y = 0;
    }

      this.velocity.x = 0;

    if (liveKeys[0] === "a") {
      this.velocity.x = -3;
      this.image.src = "./img/birdLeft.png";
    } else if (liveKeys[0] === "d") {
      this.velocity.x = 3;
      this.image.src = "./img/bird.png";
    }

    if (
      this.jump === true &&
      this.jumpcount < maxJump &&
      this.position.y > 30
    ) {
      this.velocity.y = -12;
    }

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += (this.velocity.x * this.glide(this.velocity.y)); 
    }

}

class Cheese {
  constructor({ position, width, height }) {
    this.position = position;
    this.height = height;
    this.width = width;
    this.image = new Image(this.width, this.height);
    this.image.src = "./img/kaas.png";
    this.id = crypto.randomUUID();
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, 30, 30);
  }

  update() {
    this.draw();
    countDown();
  }
}

const bluey = new Charachter({
  position: {
    x: 50,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  height: 50,
  width: 50,
});

let kaas = new Cheese({
  position: { x: randomX(), y: randomY() },
  width: 10,
  height: 10,
});

function animate() {
  if (lives > 0) {
    setTimeout(() => {
      window.requestAnimationFrame(animate);
      drawBG();
      bluey.velocity.y += gravity;
      bluey.update();
      kaas.update();
      checkCol();
    }, 1000 / fps);
  } else {
    gameOVer(points);
  }
}

let liveKeys = []; //liveKeys[0] is leading direction

window.addEventListener("keydown", (event) => {
  if (
    !liveKeys.includes(event.key) &&
    (event.key === "a" || event.key === "d")
  ) {
    liveKeys.unshift(event.key);
  }
});

///separate jump eventlistener
window.addEventListener("keydown", (event) => {
  if (event.key === "w" && bluey.jumpcount < maxJump && !bluey.jump) {
    bluey.jump = true;
    bluey.jumpcount++;
    setTimeout(() => {
      bluey.jump = false;
    }, 100);
  }
});

window.addEventListener("keyup", (event) => {
  if (
    liveKeys.includes(event.key) &&
    (event.key === "a" || event.key === "d")
  ) {
    liveKeys = liveKeys.filter((key) => key != event.key);
  }

  if (event.key === "w") {
    bluey.jump = false;
  }
});


// window.addEventListener("keydown", (event) => {
//   if(event.code === "ShiftLeft"){
//     bluey.gliding = true;  
//   }
// });

// window.addEventListener("keyup", (event) => {
//   if(event.code === "ShiftLeft"){
//     bluey.gliding = false;    
//   }
// });



function checkCol() {
  if (
    bluey.position.x + bluey.width >= kaas.position.x &&
    bluey.position.x <= kaas.position.x + kaas.width &&
    bluey.position.y <= kaas.position.y + kaas.height &&
    bluey.position.y + bluey.height >= kaas.position.y
  ) {
    eatAudio.play();
    kaas = new Cheese({
      position: { x: randomX(), y: randomY() },
      width: randomW(),
      height: randomH(),
    });
    bluey.width += 0.2;
    bluey.height += 0.2;
    points++;
    calories += (kaas.height * kaas.width) / 2;
    if (scorelineEl.hidden) {
      scorelineEl.hidden = false;
    }

    scoreEl.textContent = points;
    livesEl.textContent = lives;
    bluey.jumpcount--;
  }
}

function drawBG() {
  bg = new Image(canvas.width, canvas.height);
  bg.src = "./img/background.png";
  ctx.drawImage(bg, 0, 0, bg.width, bg.height);
}

function countDown() {
  if (!kaas.counting) {
    kaas.counting = true;
    let countingId = kaas.id;
    setTimeout(() => {
      if (countingId === kaas.id) {
        kaas = new Cheese({
          position: { x: randomX(), y: randomY() },
          width: 10,
          height: 10,
        });
        lives--;
        livesEl.textContent = lives;
        console.log(kaas.id);
      }
    }, 1000 * duration);
  }
}

function gameOVer(points) {
  window.alert(`Game over, your score was ${points}`);

  let score = {
    name: playerName,
    score: points,
    combo: 0,
  }

  postScore(score)

  setTimeout(() => {
    location.reload();
  }, 5000);

}
