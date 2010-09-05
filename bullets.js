(function() {
  
  var Bullets = function() {
    var params = {
      bulletCount: 10,
      width: $('#canvas').width()-20,
      height: $('#canvas').height()-5
    };
    var colors = pv.Colors.category20().range();
    
    function colorAt(i, alpha) {
      i = i % 20;
      if (!alpha) alpha = 1.0;
      return "rgba("+colors[i].r+","+colors[i].g+","+colors[i].b+","+alpha+")";
    }
    
    var scene = new uv.Scene({
      displays: [{
        container: 'canvas',
        width: params.width,
        height: params.height,
        zooming: true,
        panning: true
      }],
      actors: [
      {
        type: 'rect',
        width: 60,
        height: 20,
        fillStyle: 'rgba(0,0,0, 0.6)',
        x: params.width - 60,
        y: 20,
        preseveShape: true,
        sticky: true,
        actors: [
          {
            y: 15,
            x: 50,
            fillStyle: 'white',
            type: 'label',
            textAlign: 'right',
            font: 'bold 14px Helvetica, Arial',
            sticky: true,
            text: function() { return this.scene.fps+ " fps" }
          }
        ]
      },
      {
        type: 'rect',
        width: 165,
        height: 20,
        fillStyle: 'rgba(0,0,0, 0.6)',
        x: params.width - 165,
        y: 42,
        preseveShape: true,
        sticky: true,
        actors: [
          {
            y: 15,
            x: 155,
            fillStyle: 'white',
            type: 'label',
            textAlign: 'right',
            font: 'bold 14px Helvetica, Arial',
            sticky: true,
            text: function() { return this.scene.commands.RequestFramerate.requests+ " framerate requests" }
          }
        ]
      }
      ]
    });
    
    function build() {
      for (var i=0; i < params.bulletCount; i++) {
        var bullet = scene.add({
          id: 'bullet_' + i,
          type: 'circle',
          x: Math.random() * (params.width-30) + 15,
          y: Math.random() * (params.height-30) + 15,
          preserveShape: true,
          lightColor: colorAt(i, 0.2),
          color: colorAt(i, 0.5),
          activeColor: colorAt(i),
          fillStyle: function() {
            return this.active ? this.p('activeColor') : this.p('color');
          },
          lineWidth: 0,
          reposition: function() {
            this.animate('x', Math.random() * (params.width-30) + 15);
            this.animate('y', Math.random() * (params.height-30) + 15);
          },
          interactive: true,
          radius: 12,
          actors: [
            {
              type: 'circle',
              fillStyle: 'rgba(0,0,0,0.03)',
              lineWidth: 0,
              radius: 45
            },
            {
              type: 'label',
              text: i,
              localX: 0,
              localY: 5,
              textAlign: 'center',
              fillStyle: '#fff',
              font: 'bold 14px Helvetica, Arial',
              preserveShape: true,
              visible: function() {
                return this.parent.active;
              }
            }
          ]
        });
        
        // Attach surrounding bullets
        var numChilds = 6;
        for (var j=0; j < numChilds; j++) {
          var child = bullet.add({
            type: 'rect',
            preserveShape: true,
            rotation: (2*Math.PI/numChilds)*j,
            actors: [
              {
                type: 'circle',
                preserveShape: true,
                fillStyle: function() {
                  return this.parent.parent.active
                    ? this.parent.parent.p('fillStyle')
                    : this.parent.parent.p('lightColor');
                },
                lineWidth: 0,
                radius: Math.random()*4+3,
                x: 30
              }
            ]
          })
        }
        
        bullet.p('reposition');
        bullet.bind('click', function() {
          this.p('reposition');
        });
        
        bullet.bind('mouseover', function() {
          this.animate('rotation', this.p('rotation')+Math.PI, 3000);
          this.animate('radius', 15, 500);
        });
        
        bullet.bind('mouseout', function() {
          this.animate('rotation', this.p('rotation')-Math.PI, 3000);
          this.animate('radius', 12, 500);
        });
      }
    }
    
    build();
    
    return {
      render: function() {
        scene.start();
      }
    };
  }
  
  // Export
  window.Bullets = Bullets;
})();