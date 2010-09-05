$(function() {
  
  $('#sidebar').html(' \
  <h3>Unveil.js</h3> \
  <p> \
  Unveil is a data exploration and visualization toolkit that utilizes data-driven software design. \
  It features a <em>Scenegraph</em> implementation \
  on top of HTML5 Canvas as well as generic data abstraction through Collections and DataGraphs.<br/><br/> \
  <a href="http://github.com/michael/unveil">More</a> \
  </p> \
  <h3>Framerate on demand</h3> \
  <p>Unveil.js features event-based framerate determination. It detects mouse interaction \
  and running motion tweens and aquires a high framerate only on when needed. This allows \
  the scene to run at zero frames per second in idle mode, which means zero cpu utilization. \
  You\'re looking at a static image when no interaction or animation takes place. \
  Watch the values of <em>FPS</em> and <em>Framerate requests</em> as you interact with \
  the bullets.</p>\
  ');
  
  setTimeout(function() {
    vis = new Bullets();
    vis.render();    
  }, 300);
});
