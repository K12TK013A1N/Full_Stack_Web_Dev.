var a = Math.random();
a = Math.round(a*6);
var srcOne = "./images/dice6.png";
var srcTwo = "./images/dice6.png";
switch (a){
  case 1:
    srcOne = "./images/dice1.png";
    break;   
  case 2:
    srcOne = "./images/dice2.png";
    break;
  case 3:
    srcOne = "./images/dice3.png";
    break;
  case 4:
    srcOne = "./images/dice4.png";
    break;
  case 5:
    srcOne = "./images/dice5.png";
    break;    
  case 6:
    srcOne = "./images/dice6.png";
    break;
}
var b = Math.random();
b = Math.round(b*6);
switch (b){
  case 1:
    srcTwo = "./images/dice1.png";
    break;   
  case 2:
    srcTwo = "./images/dice2.png";
    break;
  case 3:
    srcTwo = "./images/dice3.png";
    break;
  case 4:
    srcTwo = "./images/dice4.png";
    break;
  case 5:
    srcTwo = "./images/dice5.png";
    break;    
  case 6:
    srcTwo = "./images/dice6.png";
    break;
}
document.getElementsByClassName("img1")[0].setAttribute("src",srcOne);
document.getElementsByClassName("img2")[0].setAttribute("src",srcTwo);
if(a>b){
  document.querySelector("h1").innerHTML = "PLAYER 1 WINS 🚩";
}else if(a==b){
  document.querySelector("h1").innerHTML = "REFRESH ME";
}else{
  document.querySelector("h1").innerHTML = "PLAYER 2 WINS 🚩";
}