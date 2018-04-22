// global variables
var el = {};
var game = {};
var cat = {};
var mice = {};
var holes = {};
var enemies = {};
var touchMode = false;
var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

// reset variables to default values
game.resetData = function() {
  game.score = 0;
  game.lives = 9;
  
  cat.x = innerWidth / 2 - 37.5;
  cat.y = innerHeight / 2 - 37.5;
  cat.vx = 0;
  cat.vy = 0;
  cat.ax = 0;
  cat.ay = 0;
  
  mice.list = [];
  
  game.over = false;
}

// refresh game
game.refresh = function() {
  if (!game.over && !(innerWidth > innerHeight && innerHeight <= 450)) {
    if (!touchMode) cat.refresh();
    else cat.x = -100, cat.y = -100;
    mice.refresh();
    
    el.score.textContent = game.score;
  }
  
  requestAnimationFrame(game.refresh);
}

// game over
game.end = function() {
  game.over = true;
  el.cat.style.display = "none";
  el.main.querySelectorAll("img")[1].style.display = "none";
  el.main.querySelectorAll("img")[2].style.display = "none";
  var itemName = "ld41HighScore" + (touchMode ? "Touch" : "Tilt");
  localStorage[itemName] = localStorage[itemName] || game.score;
  var highScore = parseInt(localStorage[itemName]);
  localStorage[itemName] = highScore > game.score ? highScore : game.score;
  el.gameOverPopup.querySelectorAll("div")[2].textContent = "High Score: " + localStorage[itemName];
  el.gameOverPopup.style.display = "";
}

// on page load
window.addEventListener("DOMContentLoaded", function() {
  el.header = document.querySelector("header");
  el.score = el.header.querySelector("h1");
  el.lives = el.header.querySelector("div");
  
  el.main = document.querySelector("main");
  el.cat = el.main.querySelector("img");
  
  el.startPopup = document.querySelector("body>div");
  el.playPopup = document.querySelectorAll("body>div")[1];
  el.morePopup = document.querySelectorAll("body>div")[2];
  el.gameOverPopup = document.querySelectorAll("body>div")[3];
  
  el.cat.style.display = "none";
  el.playPopup.style.display = "none";
  el.morePopup.style.display = "none";
  el.gameOverPopup.style.display = "none";
  
  for (i = 0; i < 9; i++) {
    var heart = document.createElement("img");
    heart.src = "images/heart.svg";
    el.lives.appendChild(heart);
  }
  
  el.cat.src = "images/cat.svg";
  checkSupport();
  
  var start = function() {
    if (!touchMode) el.cat.style.display = "block";
    el.startPopup.style.display = "none";
    el.playPopup.style.display = "none";
    
    game.resetData();
    game.refresh();
  
    mice.create(2);
  };
  
  el.startPopup.querySelectorAll("div")[1].addEventListener(iOS?"touchend":"click", function() {
    if (iOS) {
      el.startPopup.style.display = "none";
      el.playPopup.style.display = "";
    }
    else start();
  });
  el.startPopup.querySelectorAll("div")[2].addEventListener(iOS?"touchend":"click", function() {
      el.startPopup.style.display = "none";
      el.morePopup.style.display = "";
  });
  
  el.playPopup.querySelectorAll("div")[1].addEventListener(iOS?"touchend":"click", function() {
    if (!touchMode) useTouchMode();
    start();
  });
  el.playPopup.querySelectorAll("div")[2].addEventListener(iOS?"touchend":"click", start);
  el.playPopup.querySelectorAll("div")[3].addEventListener(iOS?"touchend":"click", function() {
    el.playPopup.style.display = "none";
    el.startPopup.style.display = "";
  });
  
  el.morePopup.querySelectorAll("div")[2].addEventListener(iOS?"touchend":"click", function() {
      el.morePopup.style.display = "none";
      el.startPopup.style.display = "";
  });
  
  el.gameOverPopup.querySelectorAll("div")[3].addEventListener(iOS?"touchend":"click", function() {
      location.reload();
  });
  
  document.addEventListener("touchmove", function(e){ e.preventDefault() });
  document.addEventListener("dragstart", function(e){ e.preventDefault() });
  
});
