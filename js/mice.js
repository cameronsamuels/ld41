// refresh the mice on the screen
mice.refresh = function() {
  for (i = 0; i < mice.list.length; i++) {
    var ele = el.main.querySelectorAll("img")[i + 1];
    var obj = mice.list[i];
    
    if (obj.x + 40 >= cat.x && obj.x <= cat.x + 75 && obj.y + 25 >= cat.y && obj.y <= cat.y + 75) {
        ele.remove();
        mice.list.splice(i, 1);
        mice.create();
        
        game.score++;
    } else {
      obj.x += obj.speedX;
      obj.y += obj.speedY;
      ele.style.left = obj.x + "px";
      ele.style.top = obj.y + "px";
      
      if (obj.x <= 0 || obj.y <= innerHeight * .08 || obj.x + ele.clientWidth + 2 >= innerWidth || obj.y + ele.clientHeight + 2 >= innerHeight) {
        ele.remove();
        mice.list.splice(i, 1);
        mice.create();
        
        game.lives--;
        el.lives.querySelectorAll("img")[8 - game.lives].src = "images/heart-outline.svg";
        if (game.lives == 0) game.end();
      }
    }
  }
};

// create a mouse object
mice.create = function(amount) {
  for (i = 0; i < (amount || 1); i++) {
    mice.list.push(new mice.mouse());
    
    var mouse = document.createElement("img");
    mouse.src = "images/mouse.svg";
    el.main.appendChild(mouse);
    mouse.style.left = mice.list[mice.list.length - 1].x + "px";
    mouse.style.top = mice.list[mice.list.length - 1].y + "px";
    
    var a = mice.list[mice.list.length - 1].speedX > 0 ? 45 : 135;
    var b = mice.list[mice.list.length - 1].speedY > 0 ? 1 : -1;
    mouse.style.transform = "rotate(" + (a * b) + "deg) scaleY(" + (a == 135 ? -1 : 1) + ")";
  }
}

// the mouse master object
mice.mouse = function() {
  this.x = Math.round(Math.random() * innerWidth);
  this.y = Math.round(Math.random() * innerHeight);
  
  if (this.x < 0 + 30) this.x = 30;
  if (this.y < innerHeight * .08 + 30) this.y = innerHeight * .08 + 32;
  if (this.x > innerWidth - 90) this.x = innerWidth - 90;
  if (this.y > innerHeight - 70) this.y = innerHeight - 70;
  
  this.speedX = Math.round(Math.random()) == 1 ? 1 : -1;
  this.speedY = Math.round(Math.random()) == 1 ? 1 : -1;
};
