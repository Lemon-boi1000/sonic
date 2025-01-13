var sonic,sonic_1;

var forest,forest_1;

var invisibleground;

var edges;

var enemy,enemy1Img;
var enemy1,enemy2Img;
var enemy2,enemy3Img;

var obstacle,obstacle_1;

var enemygroup,enemy1group,enemy2group;

var obstaclegroup;

var enemyspotted;
var stonedead;
var defaultS;
var enemydead;
var enemydead1;
var score10000;
var score50000;
var score5000;
var jumpsound;
var restartsound;

var restartbutton;
var restartimage;

var coffin,coffinimage;
var gameState = "play";

var laugh,laughimage;

var sad,sadimg;

var score = 0;


function preload(){
  
sonic_1 = loadAnimation("images/sonicStill.png","images/sonicRunning.png");
  
forest_1 = loadImage("images/forest.png");
  
enemy1Img = loadImage("images/enemy.png");
enemy2Img = loadImage("images/enemy 2.png");
enemy3Img = loadImage("images/enemy3.png");
  
obstacle_1 = loadImage("images/rock.png");

enemyspotted = loadSound("sounds/enemyspotted.mp3");
stonedead = loadSound("sounds/stone.mp3");
defaultS = loadSound("sounds/Run.mp3");
enemydead = loadSound("sounds/enemy.mp3");
enemydead1 = loadSound("sounds/enemy1.mp3");
score5000 = loadSound("sounds/Five.mp3");
score10000 = loadSound("sounds/Ten.mp3");
score50000 = loadSound("sounds/fifty.mp3");
jumpsound = loadSound("sounds/jump.mp3");
restartsound = loadSound("sounds/restart.mp3");

coffinimage = loadImage("images/coffindance.png");

restartimage = loadImage("images/restartimage.png");

laughimage = loadImage("images/laughingimage.png");

sadimg = loadImage("images/sad.png");
}

function setup() {
 createCanvas(600,600);
 invisibleground = createSprite(300,570,600,50);
  
 forest = createSprite(400,350,20,20);
 forest.addImage("forestI",forest_1);
 forest.scale = 2;
 forest.velocityX = -7;
  
 sonic = createSprite(50,500,20,20);
 sonic.addAnimation("sonicRun",sonic_1);
 sonic.scale = 0.4;
 sonic.setCollider("rectangle", 0, 0, sonic.width, sonic.height);
  
 enemygroup = createGroup();
 enemy1group = createGroup();
 enemy2group = createGroup();
 obstaclegroup = createGroup();
 
 coffin = createSprite(300,300,20,20);
 coffin.addImage("coffindance",coffinimage);

 restartbutton = createSprite(300,500,20,20);
 restartbutton.addImage("restart",restartimage);
 restartbutton.scale = 0.2;

 laugh = createSprite(300,200,20,20);
 laugh.addImage("laugh",laughimage);
 laugh.scale = 0.6;

 sad = createSprite(300,300,20,20);
 sad.addImage("sad",sadimg);
 sad.scale = 0.5;

 
}

function draw() {
  background(255);
  
  
  createEdgeSprites();
  
  sonic.collide(invisibleground);
  
  edges = createEdgeSprites();
  
  sonic.collide(edges);
  
  
  //score = score + Math.round(getFrameRate()/60);


  if(gameState === "play"){
    coffin.visible = false;
    restartbutton.visible = false;
    laugh.visible = false;
    sad.visible = false;
    
    
    if(forest.x < 200 ){
      forest.x = 400;
   }

   if(keyDown("space") && sonic.y > 490){
    sonic.velocityY = -20;
 }
    sonic.velocityY = sonic.velocityY + 1

    
    if(keyDown(LEFT_ARROW) ){
      sonic.x = sonic.x - 5;
   }
   
   if(keyDown(RIGHT_ARROW)){
      sonic.x = sonic.x + 5;
   }
   
   var rand = Math.round(random(1,3));
   
   switch(rand){
     case 1 : 
       
       spawnenemy();
       
       break;
       
     case 2 :
       
       spawnenemy1();
       
       break;
       
     case 3 :
       
       spawnenemy2();
       
       break;
   }
   
  
   if(score === 1000){
     score5000.play();
   }

   if(score === 10000){
    score10000.play();
  }

  if(score === 50000){
    score50000.play();
  }

   obstacles();
   stonehitting();
   enemydeadS();
   
   score = score + Math.round(getFrameRate()/10);

  }

  if(gameState === "end"){
    sonic.visible = false;
    forest.velocityX = 0;
    enemygroup.destroyEach();
    enemy1group.destroyEach();
    enemy2group.destroyEach();
    obstaclegroup.destroyEach();
    restartbutton.visible = true;
    
    reset();

  }
  drawSprites();
  
  textSize(20);
  fill(255);
  text("Score: " + score, 300, 50);

  

}

function spawnenemy(){
  if(frameCount % 160 === 0 ){
    enemy = createSprite(600,500);
    enemy.addImage("enemy1",enemy1Img);
    enemy.scale = 0.03;
    enemy.velocityX = -5;
    enemy.lifetime = 150;
    enemyspotted.play();
    enemygroup.add(enemy);
  }
  
}

function spawnenemy1(){
   if(frameCount % 160 === 0){
  enemy1 = createSprite(600,500);
  enemy1.addImage("enemy2I",enemy2Img);
  enemy1.scale = 0.3;
  enemy1.velocityX = -5;
  enemy1.lifetime = 150;
  enemyspotted.play();
  enemy1group.add(enemy1);
}
   
}

function spawnenemy2(){
  if(frameCount % 160 === 0){
    enemy2 = createSprite(600,500);
    enemy2.addImage("enemy3I",enemy3Img);
    enemy2.scale = 0.3;
    enemy2.velocityX = -5;
    enemy2.lifetime = 150;
    enemyspotted.play();
    enemy2group.add(enemy2);
  }
  
  
}

function obstacles(){
  if(frameCount % 240 === 0){
    obstacle = createSprite(200,0);
    obstacle.x = Math.round(random(100,300));
    
    obstacle.addImage("obstacleI",obstacle_1);
    obstacle.scale = 0.05;
    obstacle.velocityY = 7;
    obstaclegroup.add(obstacle);
    //obstacle.debug = true;
  }
  
  
}

 function stonehitting(){
   if(obstaclegroup.isTouching(sonic)){
     gameState = "end";
      stonedead.play();
      sad.visible = true;

   }
 }

 function enemydeadS(){
      if(enemygroup.isTouching(sonic) || enemy1group.isTouching(sonic) || enemy2group.isTouching(sonic)){
        gameState = "end";
        var rand = Math.round(random(1,2));
        
        if(rand === 1){
          enemydead.play();
          coffin.visible = true;
        }

        else {
          enemydead1.play();
          laugh.visible = true;
        }
      }
 }

 function reset(){
   if(mousePressedOver(restartbutton)){
      gameState = "play";
      sonic.visible = true;
      forest.velocityX = -7;
      sonic.x = 50;
      sonic.y = 500;
      coffin.visible = false;
      laugh.visible = false;
      enemydead.stop();
      stonedead.stop();
      enemydead1.stop();
      score = 0;
   }
 }

