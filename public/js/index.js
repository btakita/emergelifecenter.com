(function() {
  var ctx;

  var slides = {
    "dimensions-of-health-index": function(key) {
      var ctx;

      function main() {
        resetCtx();
        Reveal.addEventListener("slidechanged", start);
        start();
      }

      function resetCtx() {
        ctx = {};
      }

      function start() {
        if (Reveal.getCurrentSlide().id == "dimensions-of-health-index") {
          console.info(ctx.renderer);
          if (!ctx.renderer) {
            setWindowHalf();
            init();
            animate();
          }
        } else {
          console.info("herere");
          ctx.renderer && ctx.renderer.domElement.remove();
          resetCtx();
        }
      }

      function init() {
        ctx.container = document.getElementsByClassName("reveal")[0];

        ctx.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        ctx.camera.position.z = 500;

        ctx.scene = new THREE.Scene();

        ctx.group = new THREE.Object3D();
        ctx.scene.add( ctx.group );

        // earth

        var earthTexture = new THREE.Texture();
        var loader = new THREE.ImageLoader();

        loader.addEventListener( 'load', function ( event ) {

          earthTexture.image = event.content;
          earthTexture.needsUpdate = true;

        } );

        loader.load( '/img/textures/land_ocean_ice_cloud_2048.jpg' );

        var geometry = new THREE.SphereGeometry( 275, 40, 40 );
        var material = new THREE.MeshBasicMaterial( { map: earthTexture, overdraw: true } );

        var mesh = new THREE.Mesh( geometry, material );
        ctx.group.add( mesh );

        ctx.canvas = document.createElement( 'canvas' );

        var texture = new THREE.Texture( ctx.canvas );

        texture.needsUpdate = true;

        var geometry = new THREE.PlaneGeometry( 375, 300, 3, 3 );
        var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = - 250;
        mesh.rotation.x = - Math.PI / 2;
        ctx.group.add( mesh );

        ctx.renderer = new THREE.CanvasRenderer();
        setSize();

        ctx.container.appendChild( ctx.renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
      }

      function onWindowResize() {
        setWindowHalf();

        ctx.camera.aspect = window.innerWidth / window.innerHeight;
        ctx.camera.updateProjectionMatrix();

        setSize();
      }

      function setWindowHalf() {
        ctx.windowHalfX = window.innerWidth / 2;
        ctx.windowHalfY = window.innerHeight / 2;
      }

      function setSize() {
        ctx.renderer.setSize( window.innerWidth, window.innerHeight );
      }

      function animate() {
        requestAnimationFrame( animate );
        render();
      }

      function render() {
        ctx.camera.lookAt( ctx.scene.position );
        ctx.group.rotation.y -= 0.00005;
        ctx.renderer.render( ctx.scene, ctx.camera );
      }

      main();
    }
  };

  function main() {
    _.each(slides, function(fn, key) {
      fn(key);
    });
  }

  main();
})();