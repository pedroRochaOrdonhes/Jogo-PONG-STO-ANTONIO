//  VARIAVEIS DA BOLINHA
let xBall = 200;
let yBall = 200;
let d = 16;
let r = d / 2;

let velXBall = 2;
let velYBall = 2;

//  VARIAVEIS DA RAQUETE ESQUERDA
let xLBar = 5;
let yLBar = 150;
let wLBar = 7;
let hLBar = 80;

//  VARIAVEIS DA RAQUETE DIREITA
let xRBar = 588;
let yRBar = 200;
let wRBar = 7;
let hRBar = 80;

let velYRBar = 2;

//  VARIAVEIS DE PONTOS
let pointsLBar = 0
let pointsRBar = 0
let pointsLBarX = 40
let pointsRBarX = 540
let pointsBarY = 40

//  COLISAO BOLINHA
let colidiuL = false
let colidiuR = false

//  QUANTIDADE DE JOGADORES
players = 0



function preload(){
  soundBar = loadSound("raquetada.mp3")
  soundPoint = loadSound("ponto.mp3")
  soundGame = loadSound("trilha.mp3")
}


//  FUNÇÕES
function setup() {
  createCanvas(600, 400);
  //soundGame.loop()
}
function draw() {
  if(players == 0){
    selectPlayer()
  }else if(players == 1){
    onePlayer()
  }else if(players == 2){
    twoPlayers()
  }
}
function selectPlayer(){
  noStroke()
  background("rgba(67,101,255,0.8)");
  fill(255)
  textSize(50)
  text("PONG", 240, 180)
  textSize(19)
  rect(125,220,110,40)
  rect(400,220,110,40)
  fill(0)
  text("1 PLAYER",135,246)
  text("2 PLAYERS",405,246)
  if(keyIsDown(49)){
    players = 1
  }else if(keyIsDown(50)){
    players = 2
  }
}

function onePlayer(){
  //  DESENHANDO A BOLINHA
  background("rgba(67,101,255,0.8)");
  circle(xBall, yBall, d);
  noStroke();

  //  MOVENDO A BOLINHA
  xBall += velXBall;
  yBall += velYBall;

  
  //  VERIFICA COLISAO BOLINHA
  if (yBall >= height - r || yBall <= 0 + r) {
    velYBall *= -1;
  }
  if (xBall >= width - r) {
    velXBall *= -1;
    pointsLBar++
    soundPoint.play()
  }else if( xBall <= 0 + r){
    velXBall *= -1;
    pointsRBar++
    soundPoint.play()
  }
  
  
  //  DESENHANDO A RAQUETE ESQUERDA
  rect(xLBar,yLBar,wLBar,hLBar)
  if (keyIsDown(UP_ARROW)&&yLBar>0 || keyIsDown(87)&&yLBar>0) {
    yLBar-=3
  }
  if (keyIsDown(DOWN_ARROW)&&yLBar<height-hLBar || keyIsDown(83)&&yLBar<height-hLBar) {
    yLBar+=3
  }
  

  //  DESENHANDO A RAQUETE DIREITA
  rect(xRBar,yRBar,wRBar,hRBar)
  if(yRBar>0 && yRBar<height-hRBar){
    yRBar += velYRBar
  }
  if(velYBall>0){
    velYRBar = 3
  }else if(velYBall<0){
    velYRBar = -3
  }
  if(yRBar == height-hRBar){
    yRBar = 399
  }else if(yRBar == 0){
    yRBar = 1
  }
  
  
  
  //  VERIFICA COLISAO RAQUETE ESQUERDA
  colidiuL = collideRectCircle(xLBar,yLBar,wLBar,hLBar,xBall,yBall,r)
  if(colidiuL == true){
    velXBall*=-1
    xBall = 21
    soundBar.play()
  }
  
  
  //  VERIFICA COLISAO RAQUETE DIREITA
  colidiuR = collideRectCircle(xRBar,yRBar,wRBar,hRBar,xBall,yBall,r)
  if(colidiuR == true){
    velXBall*=-1
    xBall = 579
    soundBar.play()
  }
  
  
  //  DESENHANDO PONTOS
  fill("white")
  textSize(20)
  text(pointsLBar,pointsLBarX,pointsBarY)
  text(pointsRBar,pointsRBarX,pointsBarY)
}
function twoPlayers(){
  //  DESENHANDO A BOLINHA
  background("rgba(67,101,255,0.8)");
  circle(xBall, yBall, d);
  noStroke();

  //  MOVENDO A BOLINHA
  xBall += velXBall;
  yBall += velYBall;

  
  //  VERIFICA COLISAO BOLINHA
  if (yBall >= height - r || yBall <= 0 + r) {
    velYBall *= -1;
  }
  if (xBall >= width - r) {
    velXBall *= -1;
    pointsLBar++
  }else if( xBall <= 0 + r){
    velXBall *= -1;
    pointsRBar++
  }
  
  //  DESENHANDO A RAQUETE ESQUERDA
  rect(xLBar,yLBar,wLBar,hLBar)
  if (keyIsDown(87)&&yLBar>0) {
    yLBar-=3
  }
  if (keyIsDown(83)&&yLBar<height-hLBar) {
    yLBar+=3
  }
  

  //  DESENHANDO A RAQUETE DIREITA
  rect(xRBar,yRBar,wRBar,hRBar)
    if (keyIsDown(UP_ARROW)&&yRBar>0) {
    yRBar-=3
  }
  if (keyIsDown(DOWN_ARROW)&&yRBar<height-hRBar) {
    yRBar+=3
  }
  
  
  //  VERIFICA COLISAO RAQUETE ESQUERDA
  colidiuL = collideRectCircle(xLBar,yLBar,wLBar,hLBar,xBall,yBall,r)
  if(colidiuL == true){
    velXBall*=-1
    xBall = 21
    soundBar.play()
  }
  
  
  //  VERIFICA COLISAO RAQUETE DIREITA
  colidiuR = collideRectCircle(xRBar,yRBar,wRBar,hRBar,xBall,yBall,r)
  if(colidiuR == true){
    velXBall*=-1
    xBall = 579
    soundBar.play()
  }
  
  
  //  DESENHANDO PONTOS
  fill("white")
  textSize(20)
  text(pointsLBar,pointsLBarX,pointsBarY)
  text(pointsRBar,pointsRBarX,pointsBarY)
}
