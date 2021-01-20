"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTTNode = RTTNode;

var _threeModule = require("../../../../build/three.module.js");

var _NodeBuilder = require("../core/NodeBuilder.js");

var _NodeMaterial = require("../materials/NodeMaterial.js");

var _TextureNode = require("./TextureNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function RTTNode(width, height, input, options) {
  options = options || {};
  this.input = input;
  this.clear = options.clear !== undefined ? options.clear : true;
  this.renderTarget = new _threeModule.WebGLRenderTarget(width, height, options);
  this.material = new _NodeMaterial.NodeMaterial();
  this.camera = new _threeModule.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new _threeModule.Scene();
  this.quad = new _threeModule.Mesh(new _threeModule.PlaneBufferGeometry(2, 2), this.material);
  this.quad.frustumCulled = false; // Avoid getting clipped

  this.scene.add(this.quad);
  this.render = true;

  _TextureNode.TextureNode.call(this, this.renderTarget.texture);
}

RTTNode.prototype = Object.create(_TextureNode.TextureNode.prototype);
RTTNode.prototype.constructor = RTTNode;
RTTNode.prototype.nodeType = "RTT";

RTTNode.prototype.build = function (builder, output, uuid) {
  var rttBuilder = new _NodeBuilder.NodeBuilder();
  rttBuilder.nodes = builder.nodes;
  rttBuilder.updaters = builder.updaters;
  this.material.fragment.value = this.input;
  this.material.build({
    builder: rttBuilder
  });
  return _TextureNode.TextureNode.prototype.build.call(this, builder, output, uuid);
};

RTTNode.prototype.updateFramesaveTo = function (frame) {
  this.saveTo.render = false;

  if (this.saveTo !== this.saveToCurrent) {
    if (this.saveToMaterial) this.saveToMaterial.dispose();
    var material = new _NodeMaterial.NodeMaterial();
    material.fragment.value = this;
    material.build();
    var scene = new _threeModule.Scene();
    var quad = new _threeModule.Mesh(new _threeModule.PlaneBufferGeometry(2, 2), material);
    quad.frustumCulled = false; // Avoid getting clipped

    scene.add(quad);
    this.saveToScene = scene;
    this.saveToMaterial = material;
  }

  this.saveToCurrent = this.saveTo;
  frame.renderer.setRenderTarget(this.saveTo.renderTarget);
  if (this.saveTo.clear) frame.renderer.clear();
  frame.renderer.render(this.saveToScene, this.camera);
};

RTTNode.prototype.updateFrame = function (frame) {
  if (frame.renderer) {
    // from the second frame
    if (this.saveTo && this.saveTo.render === false) {
      this.updateFramesaveTo(frame);
    }

    if (this.render) {
      if (this.material.uniforms.renderTexture) {
        this.material.uniforms.renderTexture.value = frame.renderTexture;
      }

      frame.renderer.setRenderTarget(this.renderTarget);
      if (this.clear) frame.renderer.clear();
      frame.renderer.render(this.scene, this.camera);
    } // first frame


    if (this.saveTo && this.saveTo.render === true) {
      this.updateFramesaveTo(frame);
    }
  } else {
    console.warn("RTTNode need a renderer in NodeFrame");
  }
};

RTTNode.prototype.copy = function (source) {
  _TextureNode.TextureNode.prototype.copy.call(this, source);

  this.saveTo = source.saveTo;
  return this;
};

RTTNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = _TextureNode.TextureNode.prototype.toJSON.call(this, meta);
    if (this.saveTo) data.saveTo = this.saveTo.toJSON(meta).uuid;
  }

  return data;
};