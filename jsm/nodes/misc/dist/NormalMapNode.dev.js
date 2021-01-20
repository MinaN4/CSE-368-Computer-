"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalMapNode = NormalMapNode;

var _threeModule = require("../../../../build/three.module.js");

var _TempNode = require("../core/TempNode.js");

var _Vector2Node = require("../inputs/Vector2Node.js");

var _FunctionNode = require("../core/FunctionNode.js");

var _UVNode = require("../accessors/UVNode.js");

var _NormalNode = require("../accessors/NormalNode.js");

var _PositionNode = require("../accessors/PositionNode.js");

/**
 * @author sunag / http://www.sunag.com.br/
 */
function NormalMapNode(value, scale) {
  _TempNode.TempNode.call(this, 'v3');

  this.value = value;
  this.scale = scale || new _Vector2Node.Vector2Node(1, 1);
}

NormalMapNode.Nodes = function () {
  var perturbNormal2Arb = new _FunctionNode.FunctionNode( // Per-Pixel Tangent Space Normal Mapping
  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html
  "vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 map, vec2 vUv, vec2 normalScale ) {\n\n\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\tvec2 st0 = dFdx( vUv.st );\n\tvec2 st1 = dFdy( vUv.st );\n\n\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\tvec3 N = normalize( surf_norm );\n\n\tvec3 mapN = map * 2.0 - 1.0;\n\n\tmapN.xy *= normalScale;\n\n\t#ifdef DOUBLE_SIDED\n\n\t\t// Workaround for Adreno GPUs gl_FrontFacing bug. See #15850 and #10331\n\n\t\tif ( dot( cross( S, T ), N ) < 0.0 ) mapN.xy *= - 1.0;\n\n\t#else\n\n\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t#endif\n\n\tmat3 tsn = mat3( S, T, N );\n\treturn normalize( tsn * mapN );\n\n}", null, {
    derivatives: true
  });
  return {
    perturbNormal2Arb: perturbNormal2Arb
  };
}();

NormalMapNode.prototype = Object.create(_TempNode.TempNode.prototype);
NormalMapNode.prototype.constructor = NormalMapNode;
NormalMapNode.prototype.nodeType = "NormalMap";

NormalMapNode.prototype.generate = function (builder, output) {
  if (builder.isShader('fragment')) {
    var perturbNormal2Arb = builder.include(NormalMapNode.Nodes.perturbNormal2Arb);
    this.normal = this.normal || new _NormalNode.NormalNode();
    this.position = this.position || new _PositionNode.PositionNode(_PositionNode.PositionNode.VIEW);
    this.uv = this.uv || new _UVNode.UVNode();
    var scale = this.scale.build(builder, 'v2');

    if (builder.material.side === _threeModule.BackSide) {
      scale = '-' + scale;
    }

    return builder.format(perturbNormal2Arb + '( -' + this.position.build(builder, 'v3') + ', ' + this.normal.build(builder, 'v3') + ', ' + this.value.build(builder, 'v3') + ', ' + this.uv.build(builder, 'v2') + ', ' + scale + ' )', this.getType(builder), output);
  } else {
    console.warn("THREE.NormalMapNode is not compatible with " + builder.shader + " shader.");
    return builder.format('vec3( 0.0 )', this.getType(builder), output);
  }
};

NormalMapNode.prototype.copy = function (source) {
  _TempNode.TempNode.prototype.copy.call(this, source);

  this.value = source.value;
  this.scale = source.scale;
  return this;
};

NormalMapNode.prototype.toJSON = function (meta) {
  var data = this.getJSONNode(meta);

  if (!data) {
    data = this.createJSONNode(meta);
    data.value = this.value.toJSON(meta).uuid;
    data.scale = this.scale.toJSON(meta).uuid;
  }

  return data;
};