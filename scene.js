        import * as THREE from '../build/three.module.js';
		import Stats from './jsm/libs/stats.module.js';
		import { OrbitControls } from './jsm/controls/OrbitControls.js';
		import { Water } from './jsm/objects/Water.js';
		import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
		import { RGBELoader } from './jsm/loaders/RGBELoader.js';
		import {OBJLoader2} from './jsm/loaders/OBJLoader2.js';
		import {MTLLoader} from './jsm/loaders/MTLLoader.js';
		import {MtlObjBridge} from './jsm/loaders/obj2/bridge/MtlObjBridge.js';
		var container, stats,clock;
		var camera, scene, renderer, light,ambient_light;
		var controls, water,shark;
		var mixer,mixer2,mesh,mesh2,mesh3,mesh4,mesh5,mesh6;
		init();
		animate();
	function init() {
		container = document.getElementById( 'container' );
		//
		renderer = new THREE.WebGLRenderer({ antialias: true,powerPreference: "high-performance" });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				//
				clock = new THREE.Clock();
				scene = new THREE.Scene();
				//
				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 200000 );
				camera.position.set( 10000, 10000,10000 );
				//
				light = new THREE.DirectionalLight( 0xffffff, 0.8 );
				scene.add( light );
				ambient_light = new THREE.AmbientLight( 0xffffff, 0.8 );
				scene.add( ambient_light );
		// Water
		{ 
			var waterGeometry = new THREE.PlaneBufferGeometry( 100000, 100000 , 25 , 25 );
			water = new Water(
			waterGeometry,
					{
						textureWidth: 4096,
						textureHeight: 2160,
						//water texture
						waterNormals: new THREE.TextureLoader().load( 'textures/water/waternormals.jpg', function ( texture ) {
							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
						} ),
						alpha: 1.0,
						sunDirection: light.position.clone().normalize(),
						sunColor: 0xECF5FF,
						waterColor: 0xBEC2C6,
						distortionScale: 3.7,
						fog: scene.fog !== undefined
					}
			);
			water.rotation.x = - Math.PI / 2;
			scene.add( water );
		}
		// Skybox
		{ 
		// 	sky textures
		var aCubeMap = THREE.ImageUtils.loadTextureCube([
		  'textures/north/blizzard_ft.jpg',
		  'textures/north/blizzard_bk.jpg',
		  'textures/north/blizzard_up.jpg',
		  'textures/north/blizzard_dn.jpg',
		  'textures/north/blizzard_rt.jpg',
		  'textures/north/blizzard_lf.jpg'
		]);
		aCubeMap.format = THREE.RGBFormat;
		var aShader = THREE.ShaderLib['cube'];
		aShader.uniforms['tCube'].value = aCubeMap;
		var aSkyBoxMaterial = new THREE.ShaderMaterial({
		  fragmentShader: aShader.fragmentShader,
		  vertexShader: aShader.vertexShader,
		  uniforms: aShader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});
		var aSkybox = new THREE.Mesh(new THREE.BoxGeometry(100000, 100000, 100000),aSkyBoxMaterial);
		scene.add(aSkybox);
	}
		// Load Static Models
		{
			// Ship
  			const mtlLoader = new MTLLoader();
  			mtlLoader.load('models/obj/ship/ship.mtl', (mtlParseResult) => {
    		const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
			const objLoader = new OBJLoader2();
			objLoader.addMaterials(materials);
    		objLoader.load('models/obj/ship/ship.obj', (root) => {
				root.scale.set(5,5,5);
				root.dire
				root.position.set(11500,-100,-11000);
				mesh = root;
				scene.add(root);
 			   });
		  });
			// Airplane
		  const mtlLoader2 = new MTLLoader();
  			mtlLoader2.load('models/obj/Airplane/Airplane.mtl', (mtlParseResult2) => {
    		const materials2 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult2);
			const objLoader2 = new OBJLoader2();
			objLoader2.addMaterials(materials2);
    		objLoader2.load('models/obj/Airplane/Airplane.obj', (root2) => {
				root2.scale.set(1,-2,1);
				root2.rotation.x = -190;
				root2.position.set(-12500,6000,1000);
				mesh2 = root2;
				scene.add(root2);
			  });
		  });
		  // Mountain
		  const mtlLoader4 = new MTLLoader();
  			mtlLoader4.load('models/obj/mountains/mountains.mtl', (mtlParseResult4) => {
    		const materials4 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult4);
			const objLoader4 = new OBJLoader2();
			objLoader4.addMaterials(materials4);
    		objLoader4.load('models/obj/mountains/mountains.obj', (root4) => {
				root4.scale.set(13,9,13);
				root4.position.set(3000,-1100,200);
				mesh4 = root4;
				scene.add(root4);
			  });
		  });

		  // snow
		  const mtlLoader5 = new MTLLoader();
  			mtlLoader5.load('models/obj/snow/snow.mtl', (mtlParseResult5) => {
            const materials5 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult5);
            materials5.polygonOffset = true;
            materials5.polygonOffsetFactor = -0.1;
			const objLoader5 = new OBJLoader2();
			objLoader5.addMaterials(materials5);
    		objLoader5.load('models/obj/snow/snow.obj', (root5) => {
				root5.scale.set(500,100,500);
				root5.position.set(10000,-150,0);
				mesh5 = root5;
				scene.add(root5);
			  });
		  });
	       // snow2
		  const mtlLoader6 = new MTLLoader();
		  mtlLoader6.load('models/obj/snow/snow.mtl', (mtlParseResult6) => {
		const materials6 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult6);
		materials6.polygonOffset = true;
		materials6.polygonOffsetFactor = -0.1;
		const objLoader6 = new OBJLoader2();
		objLoader6.addMaterials(materials6);
		objLoader6.load('models/obj/snow/snow.obj', (root6) => {
			root6.scale.set(200,100,200);
			root6.rotation.set(0,50,0);
			root6.position.set(-5000,-150,4000);
			mesh6 = root6;
			scene.add(root6);
		  });
	  });
		   // snow3
		   const mtlLoader3 = new MTLLoader();
		   mtlLoader3.load('models/obj/snow/snow.mtl', (mtlParseResult3) => {
		 const materials3 =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult3);
		 materials3.polygonOffset = true;
		 materials3.polygonOffsetFactor = -0.1;
		 const objLoader3 = new OBJLoader2();
		 objLoader3.addMaterials(materials3);
		 objLoader3.load('models/obj/snow/snow.obj', (root3) => {
			 root3.scale.set(1000,100,1000);
			 root3.rotation.set(0,50,0);
			 root3.position.set(-10000,-150,-30000);
			 mesh3 = root3;
			 scene.add(root3);
		   });
	   });
		}
		// Load shark animated model
		{ 
		new RGBELoader()
		.setDataType( THREE.UnsignedByteType )
		.setPath( 'textures/equirectangular/' )
		.load( 'pedestrian_overpass_2k.hdr', function ( texture ) {
		var options = {
		minFilter: texture.minFilter,
		magFilter: texture.magFilter
		};				
		var loader = new GLTFLoader().setPath( 'models/gltf/shark/' );
		loader.load( 'shark.gltf', function ( gltf ) {
		gltf.scene.traverse( function ( child ) {
		} );
		mixer = new THREE.AnimationMixer( gltf.scene );
		var action = mixer.clipAction( gltf.animations[ 0 ] );
		action.play();
		gltf.scene.scale.set(200,200,200)
		gltf.scene.position.y = -100;
		gltf.scene.position.x =-4000;
        shark = gltf.scene;
        shark.rotation.y = 80;
		scene.add( gltf.scene );
		} );
		} );
        }
		//Control
		{ 
				controls = new OrbitControls( camera, renderer.domElement );
				// controls.maxPolarAngle = Math.PI * 0.495;
				controls.target.set( 0, 10, 0 );
				controls.minDistance = 40.0;
				controls.maxDistance = 1000000.0;
				controls.update();
				//Stats(FPS)
				stats = new Stats();
				container.appendChild( stats.dom );
				window.addEventListener( 'resize', onWindowResize, false );
			}
		}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	function animate() {
		requestAnimationFrame( animate );
		var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        if ( mixer2 ) mixer2.update( delta );
		render( scene, camera );
		stats.update();
		}
	function render() {
		var time = performance.now() * 0.001;	
		mesh.position.x += -10;
		mesh2.position.x += 20;
        shark.position.x -= 4;
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
		renderer.render( scene, camera );
		}