var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
var backimage
var fire,fireImg,fireGroup;
function preload()
{
  marioAnimation=loadAnimation("images/c2.png","images/c3.png","images/c4.png");
  obstacleAnimation=loadAnimation("images/o1.png");
  wallAnimation=loadAnimation("images/platform.png");
  groundAnimation=loadAnimation("images/ground2.jpg");  
  flagAnimation=loadAnimation("images/spaceship.png");
  backimage=loadImage("images/bg1.jpg");
  fireImg=loadAnimation("images/f1.png","images/f2.png","images/f3.png","images/f4.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668); 
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  fireGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      fire=new Fire(countDistanceX)
      fireGroup.add(fire.spt)
      }
  }
  flag=createSprite(countDistanceX-150,height-203);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.4;
  flag.setCollider("rectangle",0,0,500,500);
  flag.debug=true;  
}

function draw() {
  //background('#bc4fbc');
  background(backimage)
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
       //changing the game states
       if(obstacleGroup.isTouching(mario.spt) || fireGroup.isTouching(mario.spt) || mario.spt.y>height)
       {  
         gameState=LOSE;
       } 
    
       if(flag.isTouching(mario.spt))
       {
          gameState=WIN;
       }
       //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }


   }

  if(gameState==LOSE)//END State
  {  
    stroke("red");
    fill("red");
    textSize(40);
    text("GAME OVER",mario.spt.x,300);
    obstacleGroup.destroyEach();
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
    
  }

  if(gameState==WIN)//WIN state
  {  
    stroke("green");
    fill("green");
    textSize(40);
    text("Winner",mario.spt.x,300);
    obstacleGroup.destroyEach();
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
  }
  

   drawSprites();
}



