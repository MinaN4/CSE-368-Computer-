"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLShader = WebGLShader;

/**
 * @author mrdoob / http://mrdoob.com/
 */
function WebGLShader(gl, type, string) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, string);
  gl.compileShader(shader);
  return shader;
}