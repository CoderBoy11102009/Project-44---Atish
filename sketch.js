//Variables
var cannon, cannonImg;
var cannonBase, cBaseImg;
var plane, planeImg;
var ball;
var balls = [];
var planes;

//Function preload
function preload() {
  planeImg = loadImage("./assets/animatedPlane1.png");
  cBaseImg = loadImage("./assets/cannonBase.png");
}

//Function setup
function setup() {
  //Canvas
  createCanvas(windowWidth, windowHeight);

  //creating the planes group
  planes = new Group();

  // Creating the sprites
  cannon = new Cannon(windowWidth/2, windowHeight-120, 150, 150, -10);
  cannon.scale = 1

  cannonBase = createSprite(windowWidth-700, windowHeight-90, 50, 10);
  cannonBase.scale = 0.1;
  cannonBase.addImage("cBase", cBaseImg);
}


function draw() {
  //Background
  background("skyblue")

  cannon.display();
  showCannonBalls();
  spawnPlanes();
  drawSprites();
}

function spawnPlanes() {
  if (frameCount%90 === 0) {
    var y= Math.round(random(50, windowHeight/2))
    console.log(y);
    plane = createSprite(0, y, 60,60);
    plane.scale = 0.4;
    plane.velocityX = 10;
    plane.lifetime = 150;
    plane.addImage("plane", planeImg);
    planes.add(plane);
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      if(!ball.isSink){
        cWater.play();
        ball.remove(index);
      }
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cExplosion.play();
    balls[balls.length - 1].shoot();
  }
}




