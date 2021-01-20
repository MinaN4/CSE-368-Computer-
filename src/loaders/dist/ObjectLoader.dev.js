"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectLoader = ObjectLoader;

var _constants = require("../constants.js");

var _BufferAttribute = require("../core/BufferAttribute.js");

var _Color = require("../math/Color.js");

var _Object3D = require("../core/Object3D.js");

var _Group = require("../objects/Group.js");

var _InstancedMesh = require("../objects/InstancedMesh.js");

var _Sprite = require("../objects/Sprite.js");

var _Points = require("../objects/Points.js");

var _Line = require("../objects/Line.js");

var _LineLoop = require("../objects/LineLoop.js");

var _LineSegments = require("../objects/LineSegments.js");

var _LOD = require("../objects/LOD.js");

var _Mesh = require("../objects/Mesh.js");

var _SkinnedMesh = require("../objects/SkinnedMesh.js");

var _Shape = require("../extras/core/Shape.js");

var _Fog = require("../scenes/Fog.js");

var _FogExp = require("../scenes/FogExp2.js");

var _HemisphereLight = require("../lights/HemisphereLight.js");

var _SpotLight = require("../lights/SpotLight.js");

var _PointLight = require("../lights/PointLight.js");

var _DirectionalLight = require("../lights/DirectionalLight.js");

var _AmbientLight = require("../lights/AmbientLight.js");

var _RectAreaLight = require("../lights/RectAreaLight.js");

var _OrthographicCamera = require("../cameras/OrthographicCamera.js");

var _PerspectiveCamera = require("../cameras/PerspectiveCamera.js");

var _Scene = require("../scenes/Scene.js");

var _CubeTexture = require("../textures/CubeTexture.js");

var _Texture = require("../textures/Texture.js");

var _ImageLoader = require("./ImageLoader.js");

var _LoadingManager = require("./LoadingManager.js");

var _AnimationClip = require("../animation/AnimationClip.js");

var _MaterialLoader = require("./MaterialLoader.js");

var _LoaderUtils = require("./LoaderUtils.js");

var _BufferGeometryLoader = require("./BufferGeometryLoader.js");

var _Loader = require("./Loader.js");

var _FileLoader = require("./FileLoader.js");

var Geometries = _interopRequireWildcard(require("../geometries/Geometries.js"));

var Curves = _interopRequireWildcard(require("../extras/curves/Curves.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author mrdoob / http://mrdoob.com/
 */
function ObjectLoader(manager) {
  _Loader.Loader.call(this, manager);
}

ObjectLoader.prototype = Object.assign(Object.create(_Loader.Loader.prototype), {
  constructor: ObjectLoader,
  load: function load(url, onLoad, onProgress, onError) {
    var scope = this;
    var path = this.path === '' ? _LoaderUtils.LoaderUtils.extractUrlBase(url) : this.path;
    this.resourcePath = this.resourcePath || path;
    var loader = new _FileLoader.FileLoader(scope.manager);
    loader.setPath(this.path);
    loader.load(url, function (text) {
      var json = null;

      try {
        json = JSON.parse(text);
      } catch (error) {
        if (onError !== undefined) onError(error);
        console.error('THREE:ObjectLoader: Can\'t parse ' + url + '.', error.message);
        return;
      }

      var metadata = json.metadata;

      if (metadata === undefined || metadata.type === undefined || metadata.type.toLowerCase() === 'geometry') {
        console.error('THREE.ObjectLoader: Can\'t load ' + url);
        return;
      }

      scope.parse(json, onLoad);
    }, onProgress, onError);
  },
  parse: function parse(json, onLoad) {
    var shapes = this.parseShape(json.shapes);
    var geometries = this.parseGeometries(json.geometries, shapes);
    var images = this.parseImages(json.images, function () {
      if (onLoad !== undefined) onLoad(object);
    });
    var textures = this.parseTextures(json.textures, images);
    var materials = this.parseMaterials(json.materials, textures);
    var object = this.parseObject(json.object, geometries, materials);

    if (json.animations) {
      object.animations = this.parseAnimations(json.animations);
    }

    if (json.images === undefined || json.images.length === 0) {
      if (onLoad !== undefined) onLoad(object);
    }

    return object;
  },
  parseShape: function parseShape(json) {
    var shapes = {};

    if (json !== undefined) {
      for (var i = 0, l = json.length; i < l; i++) {
        var shape = new _Shape.Shape().fromJSON(json[i]);
        shapes[shape.uuid] = shape;
      }
    }

    return shapes;
  },
  parseGeometries: function parseGeometries(json, shapes) {
    var geometries = {};

    if (json !== undefined) {
      var bufferGeometryLoader = new _BufferGeometryLoader.BufferGeometryLoader();

      for (var i = 0, l = json.length; i < l; i++) {
        var geometry;
        var data = json[i];

        switch (data.type) {
          case 'PlaneGeometry':
          case 'PlaneBufferGeometry':
            geometry = new Geometries[data.type](data.width, data.height, data.widthSegments, data.heightSegments);
            break;

          case 'BoxGeometry':
          case 'BoxBufferGeometry':
          case 'CubeGeometry':
            // backwards compatible
            geometry = new Geometries[data.type](data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
            break;

          case 'CircleGeometry':
          case 'CircleBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.segments, data.thetaStart, data.thetaLength);
            break;

          case 'CylinderGeometry':
          case 'CylinderBufferGeometry':
            geometry = new Geometries[data.type](data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
            break;

          case 'ConeGeometry':
          case 'ConeBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
            break;

          case 'SphereGeometry':
          case 'SphereBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
            break;

          case 'DodecahedronGeometry':
          case 'DodecahedronBufferGeometry':
          case 'IcosahedronGeometry':
          case 'IcosahedronBufferGeometry':
          case 'OctahedronGeometry':
          case 'OctahedronBufferGeometry':
          case 'TetrahedronGeometry':
          case 'TetrahedronBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.detail);
            break;

          case 'RingGeometry':
          case 'RingBufferGeometry':
            geometry = new Geometries[data.type](data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength);
            break;

          case 'TorusGeometry':
          case 'TorusBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc);
            break;

          case 'TorusKnotGeometry':
          case 'TorusKnotBufferGeometry':
            geometry = new Geometries[data.type](data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q);
            break;

          case 'TubeGeometry':
          case 'TubeBufferGeometry':
            // This only works for built-in curves (e.g. CatmullRomCurve3).
            // User defined curves or instances of CurvePath will not be deserialized.
            geometry = new Geometries[data.type](new Curves[data.path.type]().fromJSON(data.path), data.tubularSegments, data.radius, data.radialSegments, data.closed);
            break;

          case 'LatheGeometry':
          case 'LatheBufferGeometry':
            geometry = new Geometries[data.type](data.points, data.segments, data.phiStart, data.phiLength);
            break;

          case 'PolyhedronGeometry':
          case 'PolyhedronBufferGeometry':
            geometry = new Geometries[data.type](data.vertices, data.indices, data.radius, data.details);
            break;

          case 'ShapeGeometry':
          case 'ShapeBufferGeometry':
            var geometryShapes = [];

            for (var j = 0, jl = data.shapes.length; j < jl; j++) {
              var shape = shapes[data.shapes[j]];
              geometryShapes.push(shape);
            }

            geometry = new Geometries[data.type](geometryShapes, data.curveSegments);
            break;

          case 'ExtrudeGeometry':
          case 'ExtrudeBufferGeometry':
            var geometryShapes = [];

            for (var j = 0, jl = data.shapes.length; j < jl; j++) {
              var shape = shapes[data.shapes[j]];
              geometryShapes.push(shape);
            }

            var extrudePath = data.options.extrudePath;

            if (extrudePath !== undefined) {
              data.options.extrudePath = new Curves[extrudePath.type]().fromJSON(extrudePath);
            }

            geometry = new Geometries[data.type](geometryShapes, data.options);
            break;

          case 'BufferGeometry':
          case 'InstancedBufferGeometry':
            geometry = bufferGeometryLoader.parse(data);
            break;

          case 'Geometry':
            if ('THREE' in window && 'LegacyJSONLoader' in THREE) {
              var geometryLoader = new THREE.LegacyJSONLoader();
              geometry = geometryLoader.parse(data, this.resourcePath).geometry;
            } else {
              console.error('THREE.ObjectLoader: You have to import LegacyJSONLoader in order load geometry data of type "Geometry".');
            }

            break;

          default:
            console.warn('THREE.ObjectLoader: Unsupported geometry type "' + data.type + '"');
            continue;
        }

        geometry.uuid = data.uuid;
        if (data.name !== undefined) geometry.name = data.name;
        if (geometry.isBufferGeometry === true && data.userData !== undefined) geometry.userData = data.userData;
        geometries[data.uuid] = geometry;
      }
    }

    return geometries;
  },
  parseMaterials: function parseMaterials(json, textures) {
    var cache = {}; // MultiMaterial

    var materials = {};

    if (json !== undefined) {
      var loader = new _MaterialLoader.MaterialLoader();
      loader.setTextures(textures);

      for (var i = 0, l = json.length; i < l; i++) {
        var data = json[i];

        if (data.type === 'MultiMaterial') {
          // Deprecated
          var array = [];

          for (var j = 0; j < data.materials.length; j++) {
            var material = data.materials[j];

            if (cache[material.uuid] === undefined) {
              cache[material.uuid] = loader.parse(material);
            }

            array.push(cache[material.uuid]);
          }

          materials[data.uuid] = array;
        } else {
          if (cache[data.uuid] === undefined) {
            cache[data.uuid] = loader.parse(data);
          }

          materials[data.uuid] = cache[data.uuid];
        }
      }
    }

    return materials;
  },
  parseAnimations: function parseAnimations(json) {
    var animations = [];

    for (var i = 0; i < json.length; i++) {
      var data = json[i];

      var clip = _AnimationClip.AnimationClip.parse(data);

      if (data.uuid !== undefined) clip.uuid = data.uuid;
      animations.push(clip);
    }

    return animations;
  },
  parseImages: function parseImages(json, onLoad) {
    var scope = this;
    var images = {};

    function loadImage(url) {
      scope.manager.itemStart(url);
      return loader.load(url, function () {
        scope.manager.itemEnd(url);
      }, undefined, function () {
        scope.manager.itemError(url);
        scope.manager.itemEnd(url);
      });
    }

    if (json !== undefined && json.length > 0) {
      var manager = new _LoadingManager.LoadingManager(onLoad);
      var loader = new _ImageLoader.ImageLoader(manager);
      loader.setCrossOrigin(this.crossOrigin);

      for (var i = 0, il = json.length; i < il; i++) {
        var image = json[i];
        var url = image.url;

        if (Array.isArray(url)) {
          // load array of images e.g CubeTexture
          images[image.uuid] = [];

          for (var j = 0, jl = url.length; j < jl; j++) {
            var currentUrl = url[j];
            var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(currentUrl) ? currentUrl : scope.resourcePath + currentUrl;
            images[image.uuid].push(loadImage(path));
          }
        } else {
          // load single image
          var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(image.url) ? image.url : scope.resourcePath + image.url;
          images[image.uuid] = loadImage(path);
        }
      }
    }

    return images;
  },
  parseTextures: function parseTextures(json, images) {
    function parseConstant(value, type) {
      if (typeof value === 'number') return value;
      console.warn('THREE.ObjectLoader.parseTexture: Constant should be in numeric form.', value);
      return type[value];
    }

    var textures = {};

    if (json !== undefined) {
      for (var i = 0, l = json.length; i < l; i++) {
        var data = json[i];

        if (data.image === undefined) {
          console.warn('THREE.ObjectLoader: No "image" specified for', data.uuid);
        }

        if (images[data.image] === undefined) {
          console.warn('THREE.ObjectLoader: Undefined image', data.image);
        }

        var texture;

        if (Array.isArray(images[data.image])) {
          texture = new _CubeTexture.CubeTexture(images[data.image]);
        } else {
          texture = new _Texture.Texture(images[data.image]);
        }

        texture.needsUpdate = true;
        texture.uuid = data.uuid;
        if (data.name !== undefined) texture.name = data.name;
        if (data.mapping !== undefined) texture.mapping = parseConstant(data.mapping, TEXTURE_MAPPING);
        if (data.offset !== undefined) texture.offset.fromArray(data.offset);
        if (data.repeat !== undefined) texture.repeat.fromArray(data.repeat);
        if (data.center !== undefined) texture.center.fromArray(data.center);
        if (data.rotation !== undefined) texture.rotation = data.rotation;

        if (data.wrap !== undefined) {
          texture.wrapS = parseConstant(data.wrap[0], TEXTURE_WRAPPING);
          texture.wrapT = parseConstant(data.wrap[1], TEXTURE_WRAPPING);
        }

        if (data.format !== undefined) texture.format = data.format;
        if (data.type !== undefined) texture.type = data.type;
        if (data.encoding !== undefined) texture.encoding = data.encoding;
        if (data.minFilter !== undefined) texture.minFilter = parseConstant(data.minFilter, TEXTURE_FILTER);
        if (data.magFilter !== undefined) texture.magFilter = parseConstant(data.magFilter, TEXTURE_FILTER);
        if (data.anisotropy !== undefined) texture.anisotropy = data.anisotropy;
        if (data.flipY !== undefined) texture.flipY = data.flipY;
        if (data.premultiplyAlpha !== undefined) texture.premultiplyAlpha = data.premultiplyAlpha;
        if (data.unpackAlignment !== undefined) texture.unpackAlignment = data.unpackAlignment;
        textures[data.uuid] = texture;
      }
    }

    return textures;
  },
  parseObject: function parseObject(data, geometries, materials) {
    var object;

    function getGeometry(name) {
      if (geometries[name] === undefined) {
        console.warn('THREE.ObjectLoader: Undefined geometry', name);
      }

      return geometries[name];
    }

    function getMaterial(name) {
      if (name === undefined) return undefined;

      if (Array.isArray(name)) {
        var array = [];

        for (var i = 0, l = name.length; i < l; i++) {
          var uuid = name[i];

          if (materials[uuid] === undefined) {
            console.warn('THREE.ObjectLoader: Undefined material', uuid);
          }

          array.push(materials[uuid]);
        }

        return array;
      }

      if (materials[name] === undefined) {
        console.warn('THREE.ObjectLoader: Undefined material', name);
      }

      return materials[name];
    }

    switch (data.type) {
      case 'Scene':
        object = new _Scene.Scene();

        if (data.background !== undefined) {
          if (Number.isInteger(data.background)) {
            object.background = new _Color.Color(data.background);
          }
        }

        if (data.fog !== undefined) {
          if (data.fog.type === 'Fog') {
            object.fog = new _Fog.Fog(data.fog.color, data.fog.near, data.fog.far);
          } else if (data.fog.type === 'FogExp2') {
            object.fog = new _FogExp.FogExp2(data.fog.color, data.fog.density);
          }
        }

        break;

      case 'PerspectiveCamera':
        object = new _PerspectiveCamera.PerspectiveCamera(data.fov, data.aspect, data.near, data.far);
        if (data.focus !== undefined) object.focus = data.focus;
        if (data.zoom !== undefined) object.zoom = data.zoom;
        if (data.filmGauge !== undefined) object.filmGauge = data.filmGauge;
        if (data.filmOffset !== undefined) object.filmOffset = data.filmOffset;
        if (data.view !== undefined) object.view = Object.assign({}, data.view);
        break;

      case 'OrthographicCamera':
        object = new _OrthographicCamera.OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far);
        if (data.zoom !== undefined) object.zoom = data.zoom;
        if (data.view !== undefined) object.view = Object.assign({}, data.view);
        break;

      case 'AmbientLight':
        object = new _AmbientLight.AmbientLight(data.color, data.intensity);
        break;

      case 'DirectionalLight':
        object = new _DirectionalLight.DirectionalLight(data.color, data.intensity);
        break;

      case 'PointLight':
        object = new _PointLight.PointLight(data.color, data.intensity, data.distance, data.decay);
        break;

      case 'RectAreaLight':
        object = new _RectAreaLight.RectAreaLight(data.color, data.intensity, data.width, data.height);
        break;

      case 'SpotLight':
        object = new _SpotLight.SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay);
        break;

      case 'HemisphereLight':
        object = new _HemisphereLight.HemisphereLight(data.color, data.groundColor, data.intensity);
        break;

      case 'SkinnedMesh':
        console.warn('THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.');

      case 'Mesh':
        var geometry = getGeometry(data.geometry);
        var material = getMaterial(data.material);

        if (geometry.bones && geometry.bones.length > 0) {
          object = new _SkinnedMesh.SkinnedMesh(geometry, material);
        } else {
          object = new _Mesh.Mesh(geometry, material);
        }

        break;

      case 'InstancedMesh':
        var geometry = getGeometry(data.geometry);
        var material = getMaterial(data.material);
        var count = data.count;
        var instanceMatrix = data.instanceMatrix;
        object = new _InstancedMesh.InstancedMesh(geometry, material, count);
        object.instanceMatrix = new _BufferAttribute.BufferAttribute(new Float32Array(instanceMatrix.array), 16);
        break;

      case 'LOD':
        object = new _LOD.LOD();
        break;

      case 'Line':
        object = new _Line.Line(getGeometry(data.geometry), getMaterial(data.material), data.mode);
        break;

      case 'LineLoop':
        object = new _LineLoop.LineLoop(getGeometry(data.geometry), getMaterial(data.material));
        break;

      case 'LineSegments':
        object = new _LineSegments.LineSegments(getGeometry(data.geometry), getMaterial(data.material));
        break;

      case 'PointCloud':
      case 'Points':
        object = new _Points.Points(getGeometry(data.geometry), getMaterial(data.material));
        break;

      case 'Sprite':
        object = new _Sprite.Sprite(getMaterial(data.material));
        break;

      case 'Group':
        object = new _Group.Group();
        break;

      default:
        object = new _Object3D.Object3D();
    }

    object.uuid = data.uuid;
    if (data.name !== undefined) object.name = data.name;

    if (data.matrix !== undefined) {
      object.matrix.fromArray(data.matrix);
      if (data.matrixAutoUpdate !== undefined) object.matrixAutoUpdate = data.matrixAutoUpdate;
      if (object.matrixAutoUpdate) object.matrix.decompose(object.position, object.quaternion, object.scale);
    } else {
      if (data.position !== undefined) object.position.fromArray(data.position);
      if (data.rotation !== undefined) object.rotation.fromArray(data.rotation);
      if (data.quaternion !== undefined) object.quaternion.fromArray(data.quaternion);
      if (data.scale !== undefined) object.scale.fromArray(data.scale);
    }

    if (data.castShadow !== undefined) object.castShadow = data.castShadow;
    if (data.receiveShadow !== undefined) object.receiveShadow = data.receiveShadow;

    if (data.shadow) {
      if (data.shadow.bias !== undefined) object.shadow.bias = data.shadow.bias;
      if (data.shadow.radius !== undefined) object.shadow.radius = data.shadow.radius;
      if (data.shadow.mapSize !== undefined) object.shadow.mapSize.fromArray(data.shadow.mapSize);
      if (data.shadow.camera !== undefined) object.shadow.camera = this.parseObject(data.shadow.camera);
    }

    if (data.visible !== undefined) object.visible = data.visible;
    if (data.frustumCulled !== undefined) object.frustumCulled = data.frustumCulled;
    if (data.renderOrder !== undefined) object.renderOrder = data.renderOrder;
    if (data.userData !== undefined) object.userData = data.userData;
    if (data.layers !== undefined) object.layers.mask = data.layers;
    if (data.drawMode !== undefined) object.setDrawMode(data.drawMode);

    if (data.children !== undefined) {
      var children = data.children;

      for (var i = 0; i < children.length; i++) {
        object.add(this.parseObject(children[i], geometries, materials));
      }
    }

    if (data.type === 'LOD') {
      if (data.autoUpdate !== undefined) object.autoUpdate = data.autoUpdate;
      var levels = data.levels;

      for (var l = 0; l < levels.length; l++) {
        var level = levels[l];
        var child = object.getObjectByProperty('uuid', level.object);

        if (child !== undefined) {
          object.addLevel(child, level.distance);
        }
      }
    }

    return object;
  }
});
var TEXTURE_MAPPING = {
  UVMapping: _constants.UVMapping,
  CubeReflectionMapping: _constants.CubeReflectionMapping,
  CubeRefractionMapping: _constants.CubeRefractionMapping,
  EquirectangularReflectionMapping: _constants.EquirectangularReflectionMapping,
  EquirectangularRefractionMapping: _constants.EquirectangularRefractionMapping,
  SphericalReflectionMapping: _constants.SphericalReflectionMapping,
  CubeUVReflectionMapping: _constants.CubeUVReflectionMapping,
  CubeUVRefractionMapping: _constants.CubeUVRefractionMapping
};
var TEXTURE_WRAPPING = {
  RepeatWrapping: _constants.RepeatWrapping,
  ClampToEdgeWrapping: _constants.ClampToEdgeWrapping,
  MirroredRepeatWrapping: _constants.MirroredRepeatWrapping
};
var TEXTURE_FILTER = {
  NearestFilter: _constants.NearestFilter,
  NearestMipmapNearestFilter: _constants.NearestMipmapNearestFilter,
  NearestMipmapLinearFilter: _constants.NearestMipmapLinearFilter,
  LinearFilter: _constants.LinearFilter,
  LinearMipmapNearestFilter: _constants.LinearMipmapNearestFilter,
  LinearMipmapLinearFilter: _constants.LinearMipmapLinearFilter
};