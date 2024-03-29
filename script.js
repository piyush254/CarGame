let score = document.querySelector(".score");
let statrScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");
let btn = "";
function addingBtn() {
  btn = document.createElement("button");
  btn.className = "startbtn";
  btn.innerText = "Start";
  statrScreen.append(btn);
}
addingBtn();
statrScreen.addEventListener("click", start);
let keyObj = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  " ": false,
};

let player = {
  speed: 5,
  x: 0,
  y: 0,
};

document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

function keyPressed(event) {
  // console.log(event.key);
  let pressedKey = event.key;
  if (pressedKey in keyObj) {
    keyObj[pressedKey] = true;
  }
}
function keyReleased(event) {
  // console.log(event.key);
  let relesedKey = event.key;
  if (relesedKey in keyObj) {
    if (relesedKey == " ") {
      player.start = !player.start;
      console.log(player.start);
    }
    keyObj[relesedKey] = false;
  }
}

function gamePlay() {
  //  console.log('game started');
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  //  console.log(road);
  moveLines();
  if (player.start) {
    if (keyObj.ArrowUp == true && road.top < player.y) {
      // console.log(road.top, player.y);
      player.y = player.y - player.speed;
    }
    if (keyObj.ArrowDown && player.y < road.bottom - 100) {
      player.y = player.y + player.speed;
    }
    if (keyObj.ArrowLeft && player.x > 0) {
      player.x = player.x - player.speed;
    }
    if (keyObj.ArrowRight && player.x <= road.width - 55) {
      player.x = player.x + player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    requestAnimationFrame(gamePlay);
  }
}

// start Game Logic
function start() {
  statrScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  player.start = true;
  requestAnimationFrame(gamePlay);
  gernatingCar();
  lineFormation();
}

// Lines formation
function lineFormation() {
  for (let x = 0; x < 10; x++) {
    let line = document.createElement("div");
    line.className = "line";
    line.y = x * 150; // sir i missed to write this finally error was here
    line.style.top = x * 75 + "px";
    gameArea.append(line);
  }
}

// For moving of lines
function moveLines() {
  let lines = document.querySelectorAll(".line");
  for (let t of lines) {
    //  console.log(t);
    if (t.y >= 662) {
      t.y = t.y - 750;
    }

    t.y = t.y + player.speed; // 5px
    t.style.top = t.y + "px";
  }
}
function gernatingCar() {
  // gernate Car
  let car = document.createElement("div");
  car.innerText = "";
  car.className = "car";
  gameArea.append(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}
// game playing
