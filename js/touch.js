// check if using a supported device
function checkSupport() {
  if (!iOS) useTouchMode();
}

// use touch mode
function useTouchMode() {
  touchMode = true;
  
  document.body.style.cursor = "url(images/cursor.png) 24 24, default";
  el.cat.style.display = "none";
  cat.x = -100;
  cat.y = -100;
  
  var style = document.createElement("style");
  style.innerHTML = "main img:not(:first-child) { width: 60px; height: 37.5px }";
  document.head.appendChild(style);

  document.addEventListener(iOS?"touchend":"click", function(e) {
    if (game.over) return;
    if (e.target.tagName == "IMG" && e.target.parentElement.tagName == "MAIN") {
      var ele = e.target;
      var obj = mice.list[Array.prototype.slice.call(el.main.querySelectorAll("img")).indexOf(ele) - 1];
      
      ele.remove();
      mice.list.splice(mice.list.indexOf(obj), 1);
      mice.create();
        
      game.score++;
    }
  });
}
