"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("../build/three.module.js"));

var _statsModule = _interopRequireDefault(require("./jsm/libs/stats.module.js"));

var _OrbitControls = require("./jsm/controls/OrbitControls.js");

var _Water = require("./jsm/objects/Water.js");

var _GLTFLoader = require("./jsm/loaders/GLTFLoader.js");

var _RGBELoader = require("./jsm/loaders/RGBELoader.js");

var _OBJLoader = require("./jsm/loaders/OBJLoader2.js");

var _MTLLoader = require("./jsm/loaders/MTLLoader.js");

var _MtlObjBridge = require("./jsm/loaders/obj2/bridge/MtlObjBridge.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var container, stats, clock;
var camera, scene, renderer, light, ambient_light;
var controls, water, shark;
var mixer, mixer2, mesh, mesh2, mesh3, mesh4, mesh5, mesh6;
init();
animate();

function init() {
  container = document.getElementById('container'); //

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement); //

  clock = new THREE.Clock();
  scene = new THREE.Scene(); //

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 200000);
  camera.position.set(10000, 10000, 10000); //

  light = new THREE.DirectionalLight(0xffffff, 0.8);
  scene.add(light);
  ambient_light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient_light); // Water

  {
    var waterGeometry = new THREE.PlaneBufferGeometry(100000, 100000, 25, 25);
    water = new _Water.Water(waterGeometry, {
      textureWidth: 4096,
      textureHeight: 2160,
      //water texture
      waterNormals: new THREE.TextureLoader().load('textures/water/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: light.position.clone().normalize(),
      sunColor: 0xECF5FF,
      waterColor: 0xBEC2C6,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);
  } // Skybox

  {
    // 	sky textures
    var aCubeMap = THREE.ImageUtils.loadTextureCube(['textures/north/blizzard_ft.jpg', 'textures/north/blizzard_bk.jpg', 'textures/north/blizzard_up.jpg', 'textures/north/blizzard_dn.jpg', 'textures/north/blizzard_rt.jpg', 'textures/north/blizzard_lf.jpg']);
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
    var aSkybox = new THREE.Mesh(new THREE.BoxGeometry(100000, 100000, 100000), aSkyBoxMaterial);
    scene.add(aSkybox);
  } // Load Static Models

  {
    // Ship
    var mtlLoader = new _MTLLoader.MTLLoader();
    mtlLoader.load('models/obj/ship/ship.mtl', function (mtlParseResult) {
      var materials = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);

      var objLoader = new _OBJLoader.OBJLoader2();
      objLoader.addMaterials(materials);
      objLoader.load('models/obj/ship/ship.obj', function (root) {
        root.scale.set(5, 5, 5);
        root.dire;
        root.position.set(11500, -100, -11000);
        mesh = root;
        scene.add(root);
      });
    }); // Airplane

    var mtlLoader2 = new _MTLLoader.MTLLoader();
    mtlLoader2.load('models/obj/Airplane/Airplane.mtl', function (mtlParseResult2) {
      var materials2 = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult2);

      var objLoader2 = new _OBJLoader.OBJLoader2();
      objLoader2.addMaterials(materials2);
      objLoader2.load('models/obj/Airplane/Airplane.obj', function (root2) {
        root2.scale.set(1, -2, 1);
        root2.rotation.x = -190;
        root2.position.set(-12500, 6000, 1000);
        mesh2 = root2;
        scene.add(root2);
      });
    }); // Mountain

    var mtlLoader4 = new _MTLLoader.MTLLoader();
    mtlLoader4.load('models/obj/mountains/mountains.mtl', function (mtlParseResult4) {
      var materials4 = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult4);

      var objLoader4 = new _OBJLoader.OBJLoader2();
      objLoader4.addMaterials(materials4);
      objLoader4.load('models/obj/mountains/mountains.obj', function (root4) {
        root4.scale.set(13, 9, 13);
        root4.position.set(3000, -1100, 200);
        mesh4 = root4;
        scene.add(root4);
      });
    }); // snow

    var mtlLoader5 = new _MTLLoader.MTLLoader();
    mtlLoader5.load('models/obj/snow/snow.mtl', function (mtlParseResult5) {
      var materials5 = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult5);

      materials5.polygonOffset = true;
      materials5.polygonOffsetFactor = -0.1;
      var objLoader5 = new _OBJLoader.OBJLoader2();
      objLoader5.addMaterials(materials5);
      objLoader5.load('models/obj/snow/snow.obj', function (root5) {
        root5.scale.set(500, 100, 500);
        root5.position.set(10000, -150, 0);
        mesh5 = root5;
        scene.add(root5);
      });
    }); // snow2

    var mtlLoader6 = new _MTLLoader.MTLLoader();
    mtlLoader6.load('models/obj/snow/snow.mtl', function (mtlParseResult6) {
      var materials6 = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult6);

      materials6.polygonOffset = true;
      materials6.polygonOffsetFactor = -0.1;
      var objLoader6 = new _OBJLoader.OBJLoader2();
      objLoader6.addMaterials(materials6);
      objLoader6.load('models/obj/snow/snow.obj', function (root6) {
        root6.scale.set(200, 100, 200);
        root6.rotation.set(0, 50, 0);
        root6.position.set(-5000, -150, 4000);
        mesh6 = root6;
        scene.add(root6);
      });
    }); // snow3

    var mtlLoader3 = new _MTLLoader.MTLLoader();
    mtlLoader3.load('models/obj/snow/snow.mtl', function (mtlParseResult3) {
      var materials3 = _MtlObjBridge.MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult3);

      materials3.polygonOffset = true;
      materials3.polygonOffsetFactor = -0.1;
      var objLoader3 = new _OBJLoader.OBJLoader2();
      objLoader3.addMaterials(materials3);
      objLoader3.load('models/obj/snow/snow.obj', function (root3) {
        root3.scale.set(1000, 100, 1000);
        root3.rotation.set(0, 50, 0);
        root3.position.set(-10000, -150, -30000);
        mesh3 = root3;
        scene.add(root3);
      });
    });
  } // Load shark animated model

  {
    new _RGBELoader.RGBELoader().setDataType(THREE.UnsignedByteType).setPath('textures/equirectangular/').load('pedestrian_overpass_2k.hdr', function (texture) {
      var options = {
        minFilter: texture.minFilter,
        magFilter: texture.magFilter
      };
      var loader = new _GLTFLoader.GLTFLoader().setPath('models/gltf/shark/');
      loader.load('shark.gltf', function (gltf) {
        gltf.scene.traverse(function (child) {});
        mixer = new THREE.AnimationMixer(gltf.scene);
        var action = mixer.clipAction(gltf.animations[0]);
        action.play();
        gltf.scene.scale.set(200, 200, 200);
        gltf.scene.position.y = -100;
        gltf.scene.position.x = -4000;
        shark = gltf.scene;
        shark.rotation.y = 80;
        scene.add(gltf.scene);
      });
    });
  } //Control

  {
    controls = new _OrbitControls.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 10000.0;
    controls.update(); //Stats(FPS)

    stats = new _statsModule["default"]();
    container.appendChild(stats.dom);
    window.addEventListener('resize', onWindowResize, false);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  if (mixer2) mixer2.update(delta);
  render(scene, camera);
  stats.update();
}

function render() {
  var time = performance.now() * 0.001;
  mesh.position.x += -10;
  mesh2.position.x += 20;
  shark.position.x -= 4;
  water.material.uniforms['time'].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}