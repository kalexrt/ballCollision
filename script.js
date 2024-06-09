function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = 500;

const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = 500;

class Ball {
  constructor(x = 0, y = 0, w = 20, h = 20, color = '#000') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.element = document.createElement('div');

    this.element.style.width = `${this.w}px`;
    this.element.style.height = `${this.h}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.position = `absolute`;
    this.element.style.background = this.color;
    this.element.style.borderRadius = '50%';

    this.element.addEventListener('click', () => {
      console.log(this);
    })
  }
}

const BALL_COUNT = 10;

const ballArray = [];

for (let i = 0; i < BALL_COUNT; i++) {
  const ball = new Ball(
    getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX),
    getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX),
  );

  document.body.appendChild(ball.element);

  ballArray.push(ball);
}


