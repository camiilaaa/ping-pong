//crie o sprite da bola
var ball = createSprite(200,200,10,10);
ball.setAnimation("soccer_yellow_1");

//crie o sprite da raquete do jogador na borda direita
var playerPaddle = createSprite(390,200,10,100);
playerPaddle.shapeColor = "red";

//crie o sprite da raquete do computador na borda esquerda
var computerPaddle = createSprite(10,200,10,100);
computerPaddle.shapeColor = "purple";



//variável para armazenar diferentes estados de jogo
var gameState = "serve";

//variáveis para armazenar a pontuação
var compScore = 0;
var playerScore = 0;

//criar limites de borda
createEdgeSprites();
  
function draw() {
  //limpar a tela
  background("white");
  textSize(20);
  
  //coloque o texto de informação no centro
  if (gameState == "serve") {
    text("Clique no mouse para lançar",120,180);
  }
  //mostrar pontuações
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //faça com que a raquete do jogador se mova com a posição y do mouse
  playerPaddle.y = World.mouseY;
  
  //IA para o raquete do computador
  computerPaddle.y = ball.y; //automatizar
  //faça-a se mover com a posição y da bola
  
  
  
  //faça a bola rebater nas bordas superior e inferior
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  
  //rebata a bola da raquete do jogador
  ball.bounceOff(playerPaddle);
  
  //rebata a bola da raquete do computador
  ball.bounceOff(computerPaddle);
 
  //reinicie a bola no centro se ela cruzar a tela
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1; //aumentar a pontuação do computador
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1; //aumentar a pontuação do jogador
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore == 5 || compScore == 5){
    gameState = "over";
    text("Fim de Jogo!",160,160);
  }
  
  drawSprites();
  //aumente a velocidade da bola em cada passe
  ball.velocityX = ball.velocityX *1.003;
  ball.velocityY = ball.velocityY *1.003;
  

  
}

function mousePressed() {
  ball.velocityX = 3;
  ball.velocityY = 4;
  gameState ="play";
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
