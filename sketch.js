var score = 0
var gameState = "PLAY";

function setup() {
  createCanvas(windowWidth,windowHeight);


  bg = createSprite(windowWidth/2,windowHeight/2)
  bg.scale = 1.5
  bg.addImage(bgs)
  player = createSprite(100,500,0,100)
  player.addAnimation("donkeyKong",plimg)

  gameover = createSprite(windowWidth/2,windowHeight/2-200,0,0)
  gameover.addImage(gover)
  gameover.scale = 2
  gameover.visible = false;

  restart = createSprite(windowWidth/2,windowHeight/2,0,0)
  restart.addImage(grestart)
  restart.scale = 0.7
  restart.visible = false;

  player.addAnimation("donkeyKing",pj)
  invisground = createSprite(0,600,3000,5)
  invisground.visible = false;

  coinGroup = new Group()
  stoneGroup = new Group()
}

function preload(){

  s1 = loadImage("imgs/stone.png")
  s2 = loadImage("imgs/stone2.png")
  s3 = loadImage("imgs/stone3.png")
  coinsound = loadSound("imgs/coinsound.wav")
  endsound = loadSound("imgs/endsound.wav")
  bgs = loadImage("imgs/jungle.jpg")
  coinimg = loadAnimation("imgs/o1.png","imgs/o2.png","imgs/o3.png","imgs/o4.png",)
  gover = loadImage("imgs/gameover.png")
  grestart = loadImage("imgs/grestart.png")
  pj = loadAnimation("imgs/j1.png","imgs/j2.png","imgs/j3.png","imgs/j4.png","imgs/j5.png","imgs/j6.png","imgs/j7.png","imgs/j8.png",)
  plimg = loadAnimation("imgs/p1.png","imgs/p2.png","imgs/p3.png","imgs/p4.png","imgs/p5.png","imgs/p6.png","imgs/p7.png","imgs/p8.png","imgs/p9.png","imgs/p10.png",)
}

function draw() {
  background(255)

  if(gameState === "PLAY"){
  if(bg.x<625){
    bg.x = 750
  }
  bg.velocityX = -3

  player.velocityY = player.velocityY +1.2
  
  
  if(keyWentDown("space")&& player.y>=450){
    player.velocityY = -25
    player.changeAnimation("donkeyKing",pj)
  }

  if(keyWentUp("space")){
    player.changeAnimation("donkeyKong",plimg)
  }

  for(var i = 0;i<coinGroup.length;i++){
    if(coinGroup.isTouching(player)){
      score+=1
      coinsound.play()
      coinGroup.get(i).destroy()
   }
  }

  spawnObstacles();
  spawnCoins()
  
  if(stoneGroup.isTouching(player)){
    gameState = "END"
    endsound.play()
  }
}
  else if(gameState === "END"){
    bg.velocityX = 0
    coinGroup.setVelocityXEach(0)
    stoneGroup.setVelocityXEach(0)
    coinGroup.setLifetimeEach(-1)
    stoneGroup.setLifetimeEach(-1)
    gameover.visible = true;
    restart.visible = true;
  }
  player.collide(invisground)
  drawSprites();
  fill ("white")
  textSize(30)
  text("Score:"+score,1200,100)

  if(mousePressedOver(restart)){
    reset ();
  }
  }



function spawnCoins(){
  if(frameCount % 60===0){
    coin = createSprite(1500,Math.round(random(225,500)),0,0)
    coin.addAnimation("donkosaurus",coinimg)
    coin.velocityX = -8
    coin.scale = 0.2
    coin.lifetime = 300
    coinGroup.add(coin)
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    stone = createSprite(1500,550,0,0)
    var rand = Math.round(random(1,3))
    switch(rand){
      case 1:
        stone.addImage(s1)
        break;
      case 2:
        stone.addImage(s2)
        break;
      case 3:
        stone.addImage(s3)
        break;
      default: break;
    }
    stone.velocityX = -8
    stone.scale = 0.7
    stone.lifetime = 300
    stoneGroup.add(stone)
    player.depth = stone.depth
    player.depth +=1
  }
}

function reset(){
  gameState = "PLAY"
  coinGroup.destroyEach()
  stoneGroup.destroyEach()
  score = 0
  gameover.visible = false;
  restart.visible = false;
}