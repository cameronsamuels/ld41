// refresh the cat's movement
cat.refresh = function() {
  if (innerWidth > innerHeight) {
    cat.vx += cat.ay;
    cat.vy += cat.ax;
  } else {
    cat.vy -= cat.ay;
    cat.vx += cat.ax;
  }
  cat.vx *= .98;
  cat.vy *= .98;
  cat.y = parseInt(cat.y + cat.vy / 40);
  cat.x = parseInt(cat.x + cat.vx / 40);

  if (cat.x < 0) cat.x = 0, cat.vx *= -.5;
  if (cat.y < innerHeight * .08) cat.y = innerHeight * .08 + 2, cat.vy *= -.5;
  if (cat.x > innerWidth - 75) cat.x = innerWidth - 75, cat.vx *= -.5;
  if (cat.y > innerHeight - 75) cat.y = innerHeight - 75, cat.vy *= -.5;
    
  el.cat.style.left = cat.x + "px";
  el.cat.style.top = cat.y + "px";
};

// function for the device's accelerometer
window.addEventListener("devicemotion", function(e) {
  cat.ax = 4 * event.accelerationIncludingGravity.x;
  cat.ay = 4 * event.accelerationIncludingGravity.y;
});
