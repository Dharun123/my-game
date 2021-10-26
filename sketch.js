var bg,bg_img,bg_img2;
var viking1,viking_A,viking_stop;
var branch,branchimg1,branchimg2
var invisibleGround;
var coin,coinimg;
var branch_group,coin_group;
var Score = 0;
var flag = 0
var viking2;



function preload(){
bg_img = loadImage("background.png");
viking1 = loadAnimation("frame1.png","frame2.png","frame3.png","frame4.png");
viking2 = loadAnimation("frame1_v2.png","frame2_v2.png","frame3_v2.png","frame4_v2.png");
branchimg1 = loadImage("obs1.png");
branchimg2 = loadImage("obs2.png");
coinimg = loadImage("coins.png");
viking_stop = loadAnimation("frame3.png") 
bg_img2 = loadImage("village.jpg") 
}
function setup(){

createCanvas(displayWidth,displayHeight);
 bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight); 
 bg.addImage(bg_img);
 bg.scale = 0.7
 bg.velocityX = -2
 viking_A = createSprite(100,displayHeight-290,40,40);
 viking_A.addAnimation("walking",viking1);
 viking_A.addAnimation("stop",viking_stop); 
 viking_A.addAnimation("walking2",viking2);
 viking_A.changeAnimation("walking",viking1);
 viking_A.scale = 0.6
 invisibleGround = createSprite(displayWidth/2,displayHeight-220,displayWidth,20);
 invisibleGround.visible = false
 branch_group = createGroup();
 coin_group = createGroup();
 viking_A.setCollider("rectangle",0,0,100,270);
 viking_A.debug = true;
 
 
 

  
}

function draw(){
  background(0);
  drawSprites();
 if(bg.x<100)
 {
  bg.x = displayWidth/2;
 }
if(keyDown("space")&&(viking_A.y>displayHeight/2)){
  viking_A.velocityY = -10;
}
viking_A.velocityY += 0.5; 
 spawnbranches();
 viking_A.collide(invisibleGround);
 
 
spawncoins();
if(coin_group.isTouching(viking_A)){
 flag = 1;
 coin_group.setLifetimeEach(0);
}
if(branch_group.isTouching(viking_A))
{
  console.log("touch")
  var txt ="game over".bold()
  textSize(30);
  fill("red");
  text(txt,displayWidth/2,displayHeight/2);
  viking_A.velocityX = 0;
  bg.velocityX = 0;
  branch_group.setVelocityXEach(0);
  coin_group.setVelocityXEach(0);
  if(viking_A.velocityX == 0)
  {
    viking_A.changeAnimation("stop",viking_stop)
  }
  

}
if(Score>4)
{
  viking_A.changeAnimation("walking2",viking2);
  bg.addImage(bg_img2);
  bg.scale = 0.8
}


if(flag == 1){
  Score = Score+5;
}
flag = 0
fill("white");
image(coinimg,67,73,30,30)
textSize(30);
text(Score,100,100);


    
    
  
}
function spawnbranches(){
  if(frameCount%300 == 0){
    console.log(frameCount);
    branch = createSprite(displayWidth,displayHeight-240,40,40);
    var r = Math.round(random(1,2));
   if(r == 1){
     branch.addImage(branchimg1);
   } 
   else{
    branch.addImage(branchimg2);
   }
   branch.velocityX = -3;
   branch.scale = 0.05;
   branch_group.add(branch);



  }
}

function spawncoins()
{
  if(frameCount%350 == 0)
  {

  
  var r = Math.round(random(0,displayWidth));
  var r2 = Math.round(random(450,600));
   coin = createSprite(r,r2,30,30);
   coin.addImage(coinimg);
   coin.scale = 0.1;
   coin.velocityX = -3;
   coin_group.add(coin); 
  
  }


}

