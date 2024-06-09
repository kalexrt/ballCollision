//define constant variables
const colors=['#2D572C','#E6D690','#5B3A29','#2271B3','#F5D033','#1C1C1C','#F4A900','#A52019','#DE4C8A','#ED760E','#89AC76','#354D73']
const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = 1400;
const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = 800;
const BALL_COUNT = 20;
const ballArray = [];

// define box style
const box = document.createElement('div');
box.id = 'box';
box.style.width=`${BOUNDARY_X_MAX}px`;
box.style.height=`${BOUNDARY_Y_MAX}px`;
box.style.border='2px solid #000';
box.style.position='relative';
document.body.appendChild(box);


// random int function from class
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// ball class
class Ball {
  // x and y = current position, d = diameter
  constructor(x, y, d ) {
    this.x = x; 
    this.y = y;
    this.w = d;
    this.h = d;
    //assign random color
    this.color = colors[getRandomInt(0,11)]; 
    //assign random x and y velocity
    this.vx = getRandomInt(-10, 10); 
    this.vy = getRandomInt(-10, 10);

    //set css styles of balls
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
    if (this.y  <= BOUNDARY_Y_MIN || this.y + this.w >= BOUNDARY_Y_MAX) {
      this.vy *= -1;
    }

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  detectCollision(other) {
    // x2 - x1 and y2 - y1
    const dx = this.x - other.x;
    const dy = this.y - other.y;

    //distance between self and other ball
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    //collision condition: distance less than sum of radius(r = w/2)
    if (distance < this.w / 2 + other.w / 2) {
      this.vx *= -1;
      this.vy *= -1;
      other.vx *= -1;
      other.vy *= -1;
    }
  }
}

for (let i = 0; i < BALL_COUNT; i++) {
  var ballSize = getRandomInt(2,7);
  const ball = new Ball(
    getRandomInt(BOUNDARY_X_MIN + ballSize * 10, BOUNDARY_X_MAX - ballSize * 10),
    getRandomInt(BOUNDARY_Y_MIN + ballSize * 10, BOUNDARY_Y_MAX - ballSize * 10),
    ballSize * 10
  );
  box.appendChild(ball.element);
  ballArray.push(ball);
}

function render() {
  let i = 0;
  for(let ball of ballArray){
    ball.move();
    for (let j = i + 1; j < ballArray.length; j++) {
      ball.detectCollision(ballArray[j]);
    }
    i += 1;
  };
  requestAnimationFrame(render);
}

render();
