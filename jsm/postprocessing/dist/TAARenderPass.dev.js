"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAARenderPass = void 0;

var _threeModule = require("../../../build/three.module.js");

var _SSAARenderPass = require("../postprocessing/SSAARenderPass.js");

/**
 *
 * Temporal Anti-Aliasing Render Pass
 *
 * @author bhouston / http://clara.io/
 *
 * When there is no motion in the scene, the TAA render pass accumulates jittered camera samples across frames to create a high quality anti-aliased result.
 *
 * References:
 *
 * TODO: Add support for motion vector pas so that accumulation of samples across frames can occur on dynamics scenes.
 *
 */
var TAARenderPass = function TAARenderPass(scene, camera, clearColor, clearAlpha) {
  if (_SSAARenderPass.SSAARenderPass === undefined) {
    console.error("TAARenderPass relies on SSAARenderPass");
  }

  _SSAARenderPass.SSAARenderPass.call(this, scene, camera, clearColor, clearAlpha);

  this.sampleLevel = 0;
  this.accumulate = false;
};

exports.TAARenderPass = TAARenderPass;
TAARenderPass.JitterVectors = _SSAARenderPass.SSAARenderPass.JitterVectors;
TAARenderPass.prototype = Object.assign(Object.create(_SSAARenderPass.SSAARenderPass.prototype), {
  constructor: TAARenderPass,
  render: function render(renderer, writeBuffer, readBuffer, deltaTime) {
    if (!this.accumulate) {
      _SSAARenderPass.SSAARenderPass.prototype.render.call(this, renderer, writeBuffer, readBuffer, deltaTime);

      this.accumulateIndex = -1;
      return;
    }

    var jitterOffsets = TAARenderPass.JitterVectors[5];

    if (!this.sampleRenderTarget) {
      this.sampleRenderTarget = new _threeModule.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
      this.sampleRenderTarget.texture.name = "TAARenderPass.sample";
    }

    if (!this.holdRenderTarget) {
      this.holdRenderTarget = new _threeModule.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
      this.holdRenderTarget.texture.name = "TAARenderPass.hold";
    }

    if (this.accumulate && this.accumulateIndex === -1) {
      _SSAARenderPass.SSAARenderPass.prototype.render.call(this, renderer, this.holdRenderTarget, readBuffer, deltaTime);

      this.accumulateIndex = 0;
    }

    var autoClear = renderer.autoClear;
    renderer.autoClear = false;
    var sampleWeight = 1.0 / jitterOffsets.length;

    if (this.accumulateIndex >= 0 && this.accumulateIndex < jitterOffsets.length) {
      this.copyUniforms["opacity"].value = sampleWeight;
      this.copyUniforms["tDiffuse"].value = writeBuffer.texture; // render the scene multiple times, each slightly jitter offset from the last and accumulate the results.

      var numSamplesPerFrame = Math.pow(2, this.sampleLevel);

      for (var i = 0; i < numSamplesPerFrame; i++) {
        var j = this.accumulateIndex;
        var jitterOffset = jitterOffsets[j];

        if (this.camera.setViewOffset) {
          this.camera.setViewOffset(readBuffer.width, readBuffer.height, jitterOffset[0] * 0.0625, jitterOffset[1] * 0.0625, // 0.0625 = 1 / 16
          readBuffer.width, readBuffer.height);
        }

        renderer.setRenderTarget(writeBuffer);
        renderer.clear();
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(this.sampleRenderTarget);
        if (this.accumulateIndex === 0) renderer.clear();
        this.fsQuad.render(renderer);
        this.accumulateIndex++;
        if (this.accumulateIndex >= jitterOffsets.length) break;
      }

      if (this.camera.clearViewOffset) this.camera.clearViewOffset();
    }

    var accumulationWeight = this.accumulateIndex * sampleWeight;

    if (accumulationWeight > 0) {
      this.copyUniforms["opacity"].value = 1.0;
      this.copyUniforms["tDiffuse"].value = this.sampleRenderTarget.texture;
      renderer.setRenderTarget(writeBuffer);
      renderer.clear();
      this.fsQuad.render(renderer);
    }

    if (accumulationWeight < 1.0) {
      this.copyUniforms["opacity"].value = 1.0 - accumulationWeight;
      this.copyUniforms["tDiffuse"].value = this.holdRenderTarget.texture;
      renderer.setRenderTarget(writeBuffer);
      if (accumulationWeight === 0) renderer.clear();
      this.fsQuad.render(renderer);
    }

    renderer.autoClear = autoClear;
  }
});