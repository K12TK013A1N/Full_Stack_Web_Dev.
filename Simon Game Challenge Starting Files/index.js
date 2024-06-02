var gameSequence = [];
var userSequence = [];
var gameStarted = false;
var level = 0;
$(document).keydown(function (e) { 
  if(!gameStarted){
    $("#level-title").html("Level "+level);
    gameStarted = true;
    nextSequence();
  }
});

const buttonColors = ["green","red","yellow","blue"];

function nextSequence(){
  level++;
  $("#level-title").html("Level "+level);
  userSequence = [];
  var currentIndex = Math.floor(Math.random() * 4);
  var currentColor = buttonColors[currentIndex];
  gameSequence.push(currentColor);
  console.log(gameSequence);
  buttonAnimation(currentColor);
  playSound(currentColor);
}

function buttonAnimation(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}

function playSound(color){
  var audio = new Audio('./sounds/'+color+'.mp3');
  audio.play();
}

$(".btn").click(function (e) { 
  e.preventDefault();
  var userColor = e.target.getAttribute("id");
  userSequence.push(userColor);
  buttonAnimation(userColor);
  playSound(userColor);
  checkAnswer(userSequence.length-1);
});

function checkAnswer(matchIndex){
  if(userSequence[matchIndex] == gameSequence[matchIndex]){
    if(userSequence.length == gameSequence.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("you are done MR WHITE");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over Press Any Key to Restart");
    resetGame();
  }
}

function resetGame(){
  level = 0;
  gameSequence = [];
  gameStarted = false;
}