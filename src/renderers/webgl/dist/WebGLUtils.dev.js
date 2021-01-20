"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLUtils = WebGLUtils;

var _constants = require("../../constants.js");

/**
 * @author thespite / http://www.twitter.com/thespite
 */
function WebGLUtils(gl, extensions, capabilities) {
  var isWebGL2 = capabilities.isWebGL2;

  function convert(p) {
    var extension;
    if (p === _constants.UnsignedByteType) return gl.UNSIGNED_BYTE;
    if (p === _constants.UnsignedShort4444Type) return gl.UNSIGNED_SHORT_4_4_4_4;
    if (p === _constants.UnsignedShort5551Type) return gl.UNSIGNED_SHORT_5_5_5_1;
    if (p === _constants.UnsignedShort565Type) return gl.UNSIGNED_SHORT_5_6_5;
    if (p === _constants.ByteType) return gl.BYTE;
    if (p === _constants.ShortType) return gl.SHORT;
    if (p === _constants.UnsignedShortType) return gl.UNSIGNED_SHORT;
    if (p === _constants.IntType) return gl.INT;
    if (p === _constants.UnsignedIntType) return gl.UNSIGNED_INT;
    if (p === _constants.FloatType) return gl.FLOAT;

    if (p === _constants.HalfFloatType) {
      if (isWebGL2) return gl.HALF_FLOAT;
      extension = extensions.get('OES_texture_half_float');

      if (extension !== null) {
        return extension.HALF_FLOAT_OES;
      } else {
        return null;
      }
    }

    if (p === _constants.AlphaFormat) return gl.ALPHA;
    if (p === _constants.RGBFormat) return gl.RGB;
    if (p === _constants.RGBAFormat) return gl.RGBA;
    if (p === _constants.LuminanceFormat) return gl.LUMINANCE;
    if (p === _constants.LuminanceAlphaFormat) return gl.LUMINANCE_ALPHA;
    if (p === _constants.DepthFormat) return gl.DEPTH_COMPONENT;
    if (p === _constants.DepthStencilFormat) return gl.DEPTH_STENCIL;
    if (p === _constants.RedFormat) return gl.RED;

    if (p === _constants.RGB_S3TC_DXT1_Format || p === _constants.RGBA_S3TC_DXT1_Format || p === _constants.RGBA_S3TC_DXT3_Format || p === _constants.RGBA_S3TC_DXT5_Format) {
      extension = extensions.get('WEBGL_compressed_texture_s3tc');

      if (extension !== null) {
        if (p === _constants.RGB_S3TC_DXT1_Format) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (p === _constants.RGBA_S3TC_DXT1_Format) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (p === _constants.RGBA_S3TC_DXT3_Format) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (p === _constants.RGBA_S3TC_DXT5_Format) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else {
        return null;
      }
    }

    if (p === _constants.RGB_PVRTC_4BPPV1_Format || p === _constants.RGB_PVRTC_2BPPV1_Format || p === _constants.RGBA_PVRTC_4BPPV1_Format || p === _constants.RGBA_PVRTC_2BPPV1_Format) {
      extension = extensions.get('WEBGL_compressed_texture_pvrtc');

      if (extension !== null) {
        if (p === _constants.RGB_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (p === _constants.RGB_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (p === _constants.RGBA_PVRTC_4BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (p === _constants.RGBA_PVRTC_2BPPV1_Format) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else {
        return null;
      }
    }

    if (p === _constants.RGB_ETC1_Format) {
      extension = extensions.get('WEBGL_compressed_texture_etc1');

      if (extension !== null) {
        return extension.COMPRESSED_RGB_ETC1_WEBGL;
      } else {
        return null;
      }
    }

    if (p === _constants.RGBA_ASTC_4x4_Format || p === _constants.RGBA_ASTC_5x4_Format || p === _constants.RGBA_ASTC_5x5_Format || p === _constants.RGBA_ASTC_6x5_Format || p === _constants.RGBA_ASTC_6x6_Format || p === _constants.RGBA_ASTC_8x5_Format || p === _constants.RGBA_ASTC_8x6_Format || p === _constants.RGBA_ASTC_8x8_Format || p === _constants.RGBA_ASTC_10x5_Format || p === _constants.RGBA_ASTC_10x6_Format || p === _constants.RGBA_ASTC_10x8_Format || p === _constants.RGBA_ASTC_10x10_Format || p === _constants.RGBA_ASTC_12x10_Format || p === _constants.RGBA_ASTC_12x12_Format) {
      extension = extensions.get('WEBGL_compressed_texture_astc');

      if (extension !== null) {
        // TODO Complete?
        return p;
      } else {
        return null;
      }
    }

    if (p === _constants.UnsignedInt248Type) {
      if (isWebGL2) return gl.UNSIGNED_INT_24_8;
      extension = extensions.get('WEBGL_depth_texture');

      if (extension !== null) {
        return extension.UNSIGNED_INT_24_8_WEBGL;
      } else {
        return null;
      }
    }
  }

  return {
    convert: convert
  };
}