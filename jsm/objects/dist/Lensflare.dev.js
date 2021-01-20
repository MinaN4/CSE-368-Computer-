"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LensflareElement = exports.Lensflare = void 0;

var _threeModule = require("../../../build/three.module.js");

/**
 * @author Mugen87 / https://github.com/Mugen87
 * @author mrdoob / http://mrdoob.com/
 */
var Lensflare = function Lensflare() {
  _threeModule.Mesh.call(this, Lensflare.Geometry, new _threeModule.MeshBasicMaterial({
    opacity: 0,
    transparent: true
  }));

  this.type = 'Lensflare';
  this.frustumCulled = false;
  this.renderOrder = Infinity; //

  var positionScreen = new _threeModule.Vector3();
  var positionView = new _threeModule.Vector3(); // textures

  var tempMap = new _threeModule.DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, _threeModule.RGBFormat);
  tempMap.minFilter = _threeModule.NearestFilter;
  tempMap.magFilter = _threeModule.NearestFilter;
  tempMap.wrapS = _threeModule.ClampToEdgeWrapping;
  tempMap.wrapT = _threeModule.ClampToEdgeWrapping;
  var occlusionMap = new _threeModule.DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, _threeModule.RGBFormat);
  occlusionMap.minFilter = _threeModule.NearestFilter;
  occlusionMap.magFilter = _threeModule.NearestFilter;
  occlusionMap.wrapS = _threeModule.ClampToEdgeWrapping;
  occlusionMap.wrapT = _threeModule.ClampToEdgeWrapping; // material

  var geometry = Lensflare.Geometry;
  var material1a = new _threeModule.RawShaderMaterial({
    uniforms: {
      'scale': {
        value: null
      },
      'screenPosition': {
        value: null
      }
    },
    vertexShader: ['precision highp float;', 'uniform vec3 screenPosition;', 'uniform vec2 scale;', 'attribute vec3 position;', 'void main() {', '	gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );', '}'].join('\n'),
    fragmentShader: ['precision highp float;', 'void main() {', '	gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );', '}'].join('\n'),
    depthTest: true,
    depthWrite: false,
    transparent: false
  });
  var material1b = new _threeModule.RawShaderMaterial({
    uniforms: {
      'map': {
        value: tempMap
      },
      'scale': {
        value: null
      },
      'screenPosition': {
        value: null
      }
    },
    vertexShader: ['precision highp float;', 'uniform vec3 screenPosition;', 'uniform vec2 scale;', 'attribute vec3 position;', 'attribute vec2 uv;', 'varying vec2 vUV;', 'void main() {', '	vUV = uv;', '	gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );', '}'].join('\n'),
    fragmentShader: ['precision highp float;', 'uniform sampler2D map;', 'varying vec2 vUV;', 'void main() {', '	gl_FragColor = texture2D( map, vUV );', '}'].join('\n'),
    depthTest: false,
    depthWrite: false,
    transparent: false
  }); // the following object is used for occlusionMap generation

  var mesh1 = new _threeModule.Mesh(geometry, material1a); //

  var elements = [];
  var shader = LensflareElement.Shader;
  var material2 = new _threeModule.RawShaderMaterial({
    uniforms: {
      'map': {
        value: null
      },
      'occlusionMap': {
        value: occlusionMap
      },
      'color': {
        value: new _threeModule.Color(0xffffff)
      },
      'scale': {
        value: new _threeModule.Vector2()
      },
      'screenPosition': {
        value: new _threeModule.Vector3()
      }
    },
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    blending: _threeModule.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  var mesh2 = new _threeModule.Mesh(geometry, material2);

  this.addElement = function (element) {
    elements.push(element);
  }; //


  var scale = new _threeModule.Vector2();
  var screenPositionPixels = new _threeModule.Vector2();
  var validArea = new _threeModule.Box2();
  var viewport = new _threeModule.Vector4();

  this.onBeforeRender = function (renderer, scene, camera) {
    renderer.getCurrentViewport(viewport);
    var invAspect = viewport.w / viewport.z;
    var halfViewportWidth = viewport.z / 2.0;
    var halfViewportHeight = viewport.w / 2.0;
    var size = 16 / viewport.w;
    scale.set(size * invAspect, size);
    validArea.min.set(viewport.x, viewport.y);
    validArea.max.set(viewport.x + (viewport.z - 16), viewport.y + (viewport.w - 16)); // calculate position in screen space

    positionView.setFromMatrixPosition(this.matrixWorld);
    positionView.applyMatrix4(camera.matrixWorldInverse);
    if (positionView.z > 0) return; // lensflare is behind the camera

    positionScreen.copy(positionView).applyMatrix4(camera.projectionMatrix); // horizontal and vertical coordinate of the lower left corner of the pixels to copy

    screenPositionPixels.x = viewport.x + positionScreen.x * halfViewportWidth + halfViewportWidth - 8;
    screenPositionPixels.y = viewport.y + positionScreen.y * halfViewportHeight + halfViewportHeight - 8; // screen cull

    if (validArea.containsPoint(screenPositionPixels)) {
      // save current RGB to temp texture
      renderer.copyFramebufferToTexture(screenPositionPixels, tempMap); // render pink quad

      var uniforms = material1a.uniforms;
      uniforms["scale"].value = scale;
      uniforms["screenPosition"].value = positionScreen;
      renderer.renderBufferDirect(camera, null, geometry, material1a, mesh1, null); // copy result to occlusionMap

      renderer.copyFramebufferToTexture(screenPositionPixels, occlusionMap); // restore graphics

      var uniforms = material1b.uniforms;
      uniforms["scale"].value = scale;
      uniforms["screenPosition"].value = positionScreen;
      renderer.renderBufferDirect(camera, null, geometry, material1b, mesh1, null); // render elements

      var vecX = -positionScreen.x * 2;
      var vecY = -positionScreen.y * 2;

      for (var i = 0, l = elements.length; i < l; i++) {
        var element = elements[i];
        var uniforms = material2.uniforms;
        uniforms["color"].value.copy(element.color);
        uniforms["map"].value = element.texture;
        uniforms["screenPosition"].value.x = positionScreen.x + vecX * element.distance;
        uniforms["screenPosition"].value.y = positionScreen.y + vecY * element.distance;
        var size = element.size / viewport.w;
        var invAspect = viewport.w / viewport.z;
        uniforms["scale"].value.set(size * invAspect, size);
        material2.uniformsNeedUpdate = true;
        renderer.renderBufferDirect(camera, null, geometry, material2, mesh2, null);
      }
    }
  };

  this.dispose = function () {
    material1a.dispose();
    material1b.dispose();
    material2.dispose();
    tempMap.dispose();
    occlusionMap.dispose();

    for (var i = 0, l = elements.length; i < l; i++) {
      elements[i].texture.dispose();
    }
  };
};

exports.Lensflare = Lensflare;
Lensflare.prototype = Object.create(_threeModule.Mesh.prototype);
Lensflare.prototype.constructor = Lensflare;
Lensflare.prototype.isLensflare = true; //

var LensflareElement = function LensflareElement(texture, size, distance, color) {
  this.texture = texture;
  this.size = size || 1;
  this.distance = distance || 0;
  this.color = color || new _threeModule.Color(0xffffff);
};

exports.LensflareElement = LensflareElement;
LensflareElement.Shader = {
  uniforms: {
    'map': {
      value: null
    },
    'occlusionMap': {
      value: null
    },
    'color': {
      value: null
    },
    'scale': {
      value: null
    },
    'screenPosition': {
      value: null
    }
  },
  vertexShader: ['precision highp float;', 'uniform vec3 screenPosition;', 'uniform vec2 scale;', 'uniform sampler2D occlusionMap;', 'attribute vec3 position;', 'attribute vec2 uv;', 'varying vec2 vUV;', 'varying float vVisibility;', 'void main() {', '	vUV = uv;', '	vec2 pos = position.xy;', '	vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );', '	visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );', '	vVisibility =        visibility.r / 9.0;', '	vVisibility *= 1.0 - visibility.g / 9.0;', '	vVisibility *=       visibility.b / 9.0;', '	gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );', '}'].join('\n'),
  fragmentShader: ['precision highp float;', 'uniform sampler2D map;', 'uniform vec3 color;', 'varying vec2 vUV;', 'varying float vVisibility;', 'void main() {', '	vec4 texture = texture2D( map, vUV );', '	texture.a *= vVisibility;', '	gl_FragColor = texture;', '	gl_FragColor.rgb *= color;', '}'].join('\n')
};

Lensflare.Geometry = function () {
  var geometry = new _threeModule.BufferGeometry();
  var float32Array = new Float32Array([-1, -1, 0, 0, 0, 1, -1, 0, 1, 0, 1, 1, 0, 1, 1, -1, 1, 0, 0, 1]);
  var interleavedBuffer = new _threeModule.InterleavedBuffer(float32Array, 5);
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.setAttribute('position', new _threeModule.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
  geometry.setAttribute('uv', new _threeModule.InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
  return geometry;
}();