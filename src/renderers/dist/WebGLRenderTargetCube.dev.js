"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLRenderTargetCube = WebGLRenderTargetCube;

var _constants = require("../constants.js");

var _Scene = require("../scenes/Scene.js");

var _Mesh = require("../objects/Mesh.js");

var _BoxGeometry = require("../geometries/BoxGeometry.js");

var _ShaderMaterial = require("../materials/ShaderMaterial.js");

var _UniformsUtils = require("./shaders/UniformsUtils.js");

var _WebGLRenderTarget = require("./WebGLRenderTarget.js");

var _CubeCamera = require("../cameras/CubeCamera.js");

/**
 * @author alteredq / http://alteredqualia.com
 * @author WestLangley / http://github.com/WestLangley
 */
function WebGLRenderTargetCube(width, height, options) {
  _WebGLRenderTarget.WebGLRenderTarget.call(this, width, height, options);
}

WebGLRenderTargetCube.prototype = Object.create(_WebGLRenderTarget.WebGLRenderTarget.prototype);
WebGLRenderTargetCube.prototype.constructor = WebGLRenderTargetCube;
WebGLRenderTargetCube.prototype.isWebGLRenderTargetCube = true;

WebGLRenderTargetCube.prototype.fromEquirectangularTexture = function (renderer, texture) {
  this.texture.type = texture.type;
  this.texture.format = texture.format;
  this.texture.encoding = texture.encoding;
  var scene = new _Scene.Scene();
  var shader = {
    uniforms: {
      tEquirect: {
        value: null
      }
    },
    vertexShader: ["varying vec3 vWorldDirection;", "vec3 transformDirection( in vec3 dir, in mat4 matrix ) {", "	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );", "}", "void main() {", "	vWorldDirection = transformDirection( position, modelMatrix );", "	#include <begin_vertex>", "	#include <project_vertex>", "}"].join('\n'),
    fragmentShader: ["uniform sampler2D tEquirect;", "varying vec3 vWorldDirection;", "#define RECIPROCAL_PI 0.31830988618", "#define RECIPROCAL_PI2 0.15915494", "void main() {", "	vec3 direction = normalize( vWorldDirection );", "	vec2 sampleUV;", "	sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;", "	sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "	gl_FragColor = texture2D( tEquirect, sampleUV );", "}"].join('\n')
  };
  var material = new _ShaderMaterial.ShaderMaterial({
    type: 'CubemapFromEquirect',
    uniforms: (0, _UniformsUtils.cloneUniforms)(shader.uniforms),
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
    side: _constants.BackSide,
    blending: _constants.NoBlending
  });
  material.uniforms.tEquirect.value = texture;
  var mesh = new _Mesh.Mesh(new _BoxGeometry.BoxBufferGeometry(5, 5, 5), material);
  scene.add(mesh);
  var camera = new _CubeCamera.CubeCamera(1, 10, 1);
  camera.renderTarget = this;
  camera.renderTarget.texture.name = 'CubeCameraTexture';
  camera.update(renderer, scene);
  mesh.geometry.dispose();
  mesh.material.dispose();
  return this;
};