"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLBackground = WebGLBackground;

var _constants = require("../../constants.js");

var _BoxGeometry = require("../../geometries/BoxGeometry.js");

var _PlaneGeometry = require("../../geometries/PlaneGeometry.js");

var _ShaderMaterial = require("../../materials/ShaderMaterial.js");

var _Color = require("../../math/Color.js");

var _Mesh = require("../../objects/Mesh.js");

var _ShaderLib = require("../shaders/ShaderLib.js");

var _UniformsUtils = require("../shaders/UniformsUtils.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */
function WebGLBackground(renderer, state, objects, premultipliedAlpha) {
  var clearColor = new _Color.Color(0x000000);
  var clearAlpha = 0;
  var planeMesh;
  var boxMesh; // Store the current background texture and its `version`
  // so we can recompile the material accordingly.

  var currentBackground = null;
  var currentBackgroundVersion = 0;

  function render(renderList, scene, camera, forceClear) {
    var background = scene.background; // Ignore background in AR
    // TODO: Reconsider this.

    var vr = renderer.vr;
    var session = vr.getSession && vr.getSession();

    if (session && session.environmentBlendMode === 'additive') {
      background = null;
    }

    if (background === null) {
      setClear(clearColor, clearAlpha);
      currentBackground = null;
      currentBackgroundVersion = 0;
    } else if (background && background.isColor) {
      setClear(background, 1);
      forceClear = true;
      currentBackground = null;
      currentBackgroundVersion = 0;
    }

    if (renderer.autoClear || forceClear) {
      renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    }

    if (background && (background.isCubeTexture || background.isWebGLRenderTargetCube)) {
      if (boxMesh === undefined) {
        boxMesh = new _Mesh.Mesh(new _BoxGeometry.BoxBufferGeometry(1, 1, 1), new _ShaderMaterial.ShaderMaterial({
          type: 'BackgroundCubeMaterial',
          uniforms: (0, _UniformsUtils.cloneUniforms)(_ShaderLib.ShaderLib.cube.uniforms),
          vertexShader: _ShaderLib.ShaderLib.cube.vertexShader,
          fragmentShader: _ShaderLib.ShaderLib.cube.fragmentShader,
          side: _constants.BackSide,
          depthTest: false,
          depthWrite: false,
          fog: false
        }));
        boxMesh.geometry.deleteAttribute('normal');
        boxMesh.geometry.deleteAttribute('uv');

        boxMesh.onBeforeRender = function (renderer, scene, camera) {
          this.matrixWorld.copyPosition(camera.matrixWorld);
        }; // enable code injection for non-built-in material


        Object.defineProperty(boxMesh.material, 'map', {
          get: function get() {
            return this.uniforms.tCube.value;
          }
        });
        objects.update(boxMesh);
      }

      var texture = background.isWebGLRenderTargetCube ? background.texture : background;
      boxMesh.material.uniforms.tCube.value = texture;
      boxMesh.material.uniforms.tFlip.value = background.isWebGLRenderTargetCube ? 1 : -1;

      if (currentBackground !== background || currentBackgroundVersion !== texture.version) {
        boxMesh.material.needsUpdate = true;
        currentBackground = background;
        currentBackgroundVersion = texture.version;
      } // push to the pre-sorted opaque render list


      renderList.unshift(boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null);
    } else if (background && background.isTexture) {
      if (planeMesh === undefined) {
        planeMesh = new _Mesh.Mesh(new _PlaneGeometry.PlaneBufferGeometry(2, 2), new _ShaderMaterial.ShaderMaterial({
          type: 'BackgroundMaterial',
          uniforms: (0, _UniformsUtils.cloneUniforms)(_ShaderLib.ShaderLib.background.uniforms),
          vertexShader: _ShaderLib.ShaderLib.background.vertexShader,
          fragmentShader: _ShaderLib.ShaderLib.background.fragmentShader,
          side: _constants.FrontSide,
          depthTest: false,
          depthWrite: false,
          fog: false
        }));
        planeMesh.geometry.deleteAttribute('normal'); // enable code injection for non-built-in material

        Object.defineProperty(planeMesh.material, 'map', {
          get: function get() {
            return this.uniforms.t2D.value;
          }
        });
        objects.update(planeMesh);
      }

      planeMesh.material.uniforms.t2D.value = background;

      if (background.matrixAutoUpdate === true) {
        background.updateMatrix();
      }

      planeMesh.material.uniforms.uvTransform.value.copy(background.matrix);

      if (currentBackground !== background || currentBackgroundVersion !== background.version) {
        planeMesh.material.needsUpdate = true;
        currentBackground = background;
        currentBackgroundVersion = background.version;
      } // push to the pre-sorted opaque render list


      renderList.unshift(planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null);
    }
  }

  function setClear(color, alpha) {
    state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);
  }

  return {
    getClearColor: function getClearColor() {
      return clearColor;
    },
    setClearColor: function setClearColor(color, alpha) {
      clearColor.set(color);
      clearAlpha = alpha !== undefined ? alpha : 1;
      setClear(clearColor, clearAlpha);
    },
    getClearAlpha: function getClearAlpha() {
      return clearAlpha;
    },
    setClearAlpha: function setClearAlpha(alpha) {
      clearAlpha = alpha;
      setClear(clearColor, clearAlpha);
    },
    render: render
  };
}