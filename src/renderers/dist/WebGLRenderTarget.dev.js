"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLRenderTarget = WebGLRenderTarget;

var _EventDispatcher = require("../core/EventDispatcher.js");

var _Texture = require("../textures/Texture.js");

var _constants = require("../constants.js");

var _Vector = require("../math/Vector4.js");

/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 * @author Marius Kintel / https://github.com/kintel
 */

/*
 In options, we can specify:
 * Texture parameters for an auto-generated target texture
 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
*/
function WebGLRenderTarget(width, height, options) {
  this.width = width;
  this.height = height;
  this.scissor = new _Vector.Vector4(0, 0, width, height);
  this.scissorTest = false;
  this.viewport = new _Vector.Vector4(0, 0, width, height);
  options = options || {};
  this.texture = new _Texture.Texture(undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
  this.texture.image = {};
  this.texture.image.width = width;
  this.texture.image.height = height;
  this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
  this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : _constants.LinearFilter;
  this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
  this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;
  this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
}

WebGLRenderTarget.prototype = Object.assign(Object.create(_EventDispatcher.EventDispatcher.prototype), {
  constructor: WebGLRenderTarget,
  isWebGLRenderTarget: true,
  setSize: function setSize(width, height) {
    if (this.width !== width || this.height !== height) {
      this.width = width;
      this.height = height;
      this.texture.image.width = width;
      this.texture.image.height = height;
      this.dispose();
    }

    this.viewport.set(0, 0, width, height);
    this.scissor.set(0, 0, width, height);
  },
  clone: function clone() {
    return new this.constructor().copy(this);
  },
  copy: function copy(source) {
    this.width = source.width;
    this.height = source.height;
    this.viewport.copy(source.viewport);
    this.texture = source.texture.clone();
    this.depthBuffer = source.depthBuffer;
    this.stencilBuffer = source.stencilBuffer;
    this.depthTexture = source.depthTexture;
    return this;
  },
  dispose: function dispose() {
    this.dispatchEvent({
      type: 'dispose'
    });
  }
});