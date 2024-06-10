//define constant variables
const colors=['#2D572C','#E6D690','#5B3A29','#2271B3','#F5D033','#1C1C1C','#F4A900','#A52019','#DE4C8A','#ED760E','#89AC76','#354D73']
const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = 1500;
const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = 700;
const BALL_COUNT = 50;
const ballArray = [];

// define box style
const box = document.createElement('div');
box.id = 'box';
box.style.width=`${BOUNDARY_X_MAX}px`;
box.style.height=`${BOUNDARY_Y_MAX}px`;
box.style.border='2px solid #000';
box.style.position='relative';
box.style.overflow='hidden';
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
    // Check for boundary collisions
    if (this.x - this.w/2 <= BOUNDARY_X_MIN || this.x + this.w >= BOUNDARY_X_MAX) {
      this.vx *= -1;
    }
    if (this.y - this.w/2 <= BOUNDARY_Y_MIN || this.y + this.w >= BOUNDARY_Y_MAX) {
      this.vy *= -1;
    }


    this.x += this.vx;
    this.y += this.vy;

    
    //update x and y
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
      //angle of collision in radian and speed
      const angle = Math.atan2(dy, dx);
      const speed1 = Math.sqrt(this.vx ** 2 + this.vy ** 2);
      const speed2 = Math.sqrt(other.vx ** 2 + other.vy ** 2);
      
      //direction in radian of first and 2nd ball
      const direction1 = Math.atan2(this.vy, this.vx);
      const direction2 = Math.atan2(other.vy, other.vx);
      
      //actual x and y velocity disregarding angle
      const velocityX1 = speed1 * Math.cos(direction1 - angle);
      const velocityY1 = speed1 * Math.sin(direction1 - angle);
      const velocityX2 = speed2 * Math.cos(direction2 - angle);
      const velocityY2 = speed2 * Math.sin(direction2 - angle);
      
      //actual final speed after collision
      const finalVelocityX = ((this.w - other.w) * velocityX1 + (other.w + other.w) * velocityX2) / (this.w + other.w);
      const finalVelocityY = ((this.w + this.w) * velocityX1 + (other.w - this.w) * velocityX2) / (this.w + other.w);
      
      //breakdown the speed into x and y velocity
      this.vx = Math.cos(angle) * finalVelocityX - Math.sin(angle) * velocityY1;
      this.vy = Math.sin(angle) * finalVelocityX + Math.cos(angle) * velocityY1;
      other.vx = Math.cos(angle) * finalVelocityY - Math.sin(angle) * velocityY2;
      other.vy = Math.sin(angle) * finalVelocityY + Math.cos(angle) * velocityY2;

      //fixes overlap
      const overlap = (this.w / 2 + other.w / 2 - distance) / 2;
      this.x += overlap;
      this.y += overlap;
      other.x -= overlap;
      other.y -= overlap;
    }
  }
}

// loop through ball count and generate
for (let i = 0; i < BALL_COUNT; i++) {
  //random size between 20pcx and 70px
  var ballSize = getRandomInt(2,5);
  const ball = new Ball(
    //making sure the ball renders inside the boundary
    getRandomInt(BOUNDARY_X_MIN + ballSize * 10, BOUNDARY_X_MAX - ballSize * 10),
    getRandomInt(BOUNDARY_Y_MIN + ballSize * 10, BOUNDARY_Y_MAX - ballSize * 10),
    ballSize * 10
  );
  box.appendChild(ball.element);
  //pushing element into array
  ballArray.push(ball);
}

function render() {
  // 'i' makes sure that we don't check collision of balls multiple times
  let i = 0;
  for(let ball of ballArray){
    
    for (let j = i + 1; j < ballArray.length; j++) {
      ball.detectCollision(ballArray[j]);
    }
    i += 1;
    ball.move();
  };
  requestAnimationFrame(render);
}

render();
