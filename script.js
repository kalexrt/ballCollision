function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}


const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = 1400;
const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = 800;
var speed = 5;
let y = 0;

const box = document.createElement('div');
box.id = 'box';
box.style.width=`${BOUNDARY_X_MAX}px`;
box.style.height=`${BOUNDARY_Y_MAX}px`;
box.style.border='2px solid #000';
box.style.position='relative';
document.body.appendChild(box);


class Ball {
  constructor(x = 0, y = 0, m=20, color = '#000') {
    this.x = x;
    this.y = y;
    this.w = m;
    this.h = m;
    this.color = color;
    this.vx = getRandomInt(-5, 5); 
    this.vy = getRandomInt(-5, 5);

    this.element = document.createElement('div');
    this.element.setAttribute("class","ball")
    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.position = `absolute`;
    this.element.style.background = this.color;
    this.element.style.borderRadius = '50%';
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Check for boundary collisions
    if (this.x <= BOUNDARY_X_MIN || this.x + this.w >= BOUNDARY_X_MAX) {
      this.vx *= -1;
    }
    if (this.y <= BOUNDARY_Y_MIN || this.y + this.h >= BOUNDARY_Y_MAX) {
      this.vy *= -1;
    }

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

const BALL_COUNT = 10;

const ballArray = [];

for (let i = 0; i < BALL_COUNT; i++) {
  var ballSize = getRandomInt(2,7);
  const ball = new Ball(
    getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX - ballSize * 10),
    getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX - ballSize * 10),
    ballSize * 10
  );
  box.appendChild(ball.element);
  ballArray.push(ball);
}

function render() {
  for(let ball of ballArray){
    ball.move();
  };
  requestAnimationFrame(render);
}

render();
