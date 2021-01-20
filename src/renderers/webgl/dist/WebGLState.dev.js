"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLState = WebGLState;

var _constants = require("../../constants.js");

var _Vector = require("../../math/Vector4.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function WebGLState(gl, extensions, capabilities) {
  var _equationToGL, _factorToGL;

  var isWebGL2 = capabilities.isWebGL2;

  function ColorBuffer() {
    var locked = false;
    var color = new _Vector.Vector4();
    var currentColorMask = null;
    var currentColorClear = new _Vector.Vector4(0, 0, 0, 0);
    return {
      setMask: function setMask(colorMask) {
        if (currentColorMask !== colorMask && !locked) {
          gl.colorMask(colorMask, colorMask, colorMask, colorMask);
          currentColorMask = colorMask;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(r, g, b, a, premultipliedAlpha) {
        if (premultipliedAlpha === true) {
          r *= a;
          g *= a;
          b *= a;
        }

        color.set(r, g, b, a);

        if (currentColorClear.equals(color) === false) {
          gl.clearColor(r, g, b, a);
          currentColorClear.copy(color);
        }
      },
      reset: function reset() {
        locked = false;
        currentColorMask = null;
        currentColorClear.set(-1, 0, 0, 0); // set to invalid state
      }
    };
  }

  function DepthBuffer() {
    var locked = false;
    var currentDepthMask = null;
    var currentDepthFunc = null;
    var currentDepthClear = null;
    return {
      setTest: function setTest(depthTest) {
        if (depthTest) {
          enable(gl.DEPTH_TEST);
        } else {
          disable(gl.DEPTH_TEST);
        }
      },
      setMask: function setMask(depthMask) {
        if (currentDepthMask !== depthMask && !locked) {
          gl.depthMask(depthMask);
          currentDepthMask = depthMask;
        }
      },
      setFunc: function setFunc(depthFunc) {
        if (currentDepthFunc !== depthFunc) {
          if (depthFunc) {
            switch (depthFunc) {
              case _constants.NeverDepth:
                gl.depthFunc(gl.NEVER);
                break;

              case _constants.AlwaysDepth:
                gl.depthFunc(gl.ALWAYS);
                break;

              case _constants.LessDepth:
                gl.depthFunc(gl.LESS);
                break;

              case _constants.LessEqualDepth:
                gl.depthFunc(gl.LEQUAL);
                break;

              case _constants.EqualDepth:
                gl.depthFunc(gl.EQUAL);
                break;

              case _constants.GreaterEqualDepth:
                gl.depthFunc(gl.GEQUAL);
                break;

              case _constants.GreaterDepth:
                gl.depthFunc(gl.GREATER);
                break;

              case _constants.NotEqualDepth:
                gl.depthFunc(gl.NOTEQUAL);
                break;

              default:
                gl.depthFunc(gl.LEQUAL);
            }
          } else {
            gl.depthFunc(gl.LEQUAL);
          }

          currentDepthFunc = depthFunc;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(depth) {
        if (currentDepthClear !== depth) {
          gl.clearDepth(depth);
          currentDepthClear = depth;
        }
      },
      reset: function reset() {
        locked = false;
        currentDepthMask = null;
        currentDepthFunc = null;
        currentDepthClear = null;
      }
    };
  }

  function StencilBuffer() {
    var locked = false;
    var currentStencilMask = null;
    var currentStencilFunc = null;
    var currentStencilRef = null;
    var currentStencilFuncMask = null;
    var currentStencilFail = null;
    var currentStencilZFail = null;
    var currentStencilZPass = null;
    var currentStencilClear = null;
    return {
      setTest: function setTest(stencilTest) {
        if (!locked) {
          if (stencilTest) {
            enable(gl.STENCIL_TEST);
          } else {
            disable(gl.STENCIL_TEST);
          }
        }
      },
      setMask: function setMask(stencilMask) {
        if (currentStencilMask !== stencilMask && !locked) {
          gl.stencilMask(stencilMask);
          currentStencilMask = stencilMask;
        }
      },
      setFunc: function setFunc(stencilFunc, stencilRef, stencilMask) {
        if (currentStencilFunc !== stencilFunc || currentStencilRef !== stencilRef || currentStencilFuncMask !== stencilMask) {
          gl.stencilFunc(stencilFunc, stencilRef, stencilMask);
          currentStencilFunc = stencilFunc;
          currentStencilRef = stencilRef;
          currentStencilFuncMask = stencilMask;
        }
      },
      setOp: function setOp(stencilFail, stencilZFail, stencilZPass) {
        if (currentStencilFail !== stencilFail || currentStencilZFail !== stencilZFail || currentStencilZPass !== stencilZPass) {
          gl.stencilOp(stencilFail, stencilZFail, stencilZPass);
          currentStencilFail = stencilFail;
          currentStencilZFail = stencilZFail;
          currentStencilZPass = stencilZPass;
        }
      },
      setLocked: function setLocked(lock) {
        locked = lock;
      },
      setClear: function setClear(stencil) {
        if (currentStencilClear !== stencil) {
          gl.clearStencil(stencil);
          currentStencilClear = stencil;
        }
      },
      reset: function reset() {
        locked = false;
        currentStencilMask = null;
        currentStencilFunc = null;
        currentStencilRef = null;
        currentStencilFuncMask = null;
        currentStencilFail = null;
        currentStencilZFail = null;
        currentStencilZPass = null;
        currentStencilClear = null;
      }
    };
  } //


  var colorBuffer = new ColorBuffer();
  var depthBuffer = new DepthBuffer();
  var stencilBuffer = new StencilBuffer();
  var maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  var newAttributes = new Uint8Array(maxVertexAttributes);
  var enabledAttributes = new Uint8Array(maxVertexAttributes);
  var attributeDivisors = new Uint8Array(maxVertexAttributes);
  var enabledCapabilities = {};
  var currentProgram = null;
  var currentBlendingEnabled = null;
  var currentBlending = null;
  var currentBlendEquation = null;
  var currentBlendSrc = null;
  var currentBlendDst = null;
  var currentBlendEquationAlpha = null;
  var currentBlendSrcAlpha = null;
  var currentBlendDstAlpha = null;
  var currentPremultipledAlpha = false;
  var currentFlipSided = null;
  var currentCullFace = null;
  var currentLineWidth = null;
  var currentPolygonOffsetFactor = null;
  var currentPolygonOffsetUnits = null;
  var maxTextures = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  var lineWidthAvailable = false;
  var version = 0;
  var glVersion = gl.getParameter(gl.VERSION);

  if (glVersion.indexOf('WebGL') !== -1) {
    version = parseFloat(/^WebGL\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 1.0;
  } else if (glVersion.indexOf('OpenGL ES') !== -1) {
    version = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(glVersion)[1]);
    lineWidthAvailable = version >= 2.0;
  }

  var currentTextureSlot = null;
  var currentBoundTextures = {};
  var currentScissor = new _Vector.Vector4();
  var currentViewport = new _Vector.Vector4();

  function createTexture(type, target, count) {
    var data = new Uint8Array(4); // 4 is required to match default unpack alignment of 4.

    var texture = gl.createTexture();
    gl.bindTexture(type, texture);
    gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    for (var i = 0; i < count; i++) {
      gl.texImage2D(target + i, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }

    return texture;
  }

  var emptyTextures = {};
  emptyTextures[gl.TEXTURE_2D] = createTexture(gl.TEXTURE_2D, gl.TEXTURE_2D, 1);
  emptyTextures[gl.TEXTURE_CUBE_MAP] = createTexture(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_CUBE_MAP_POSITIVE_X, 6); // init

  colorBuffer.setClear(0, 0, 0, 1);
  depthBuffer.setClear(1);
  stencilBuffer.setClear(0);
  enable(gl.DEPTH_TEST);
  depthBuffer.setFunc(_constants.LessEqualDepth);
  setFlipSided(false);
  setCullFace(_constants.CullFaceBack);
  enable(gl.CULL_FACE);
  setBlending(_constants.NoBlending); //

  function initAttributes() {
    for (var i = 0, l = newAttributes.length; i < l; i++) {
      newAttributes[i] = 0;
    }
  }

  function enableAttribute(attribute) {
    enableAttributeAndDivisor(attribute, 0);
  }

  function enableAttributeAndDivisor(attribute, meshPerAttribute) {
    newAttributes[attribute] = 1;

    if (enabledAttributes[attribute] === 0) {
      gl.enableVertexAttribArray(attribute);
      enabledAttributes[attribute] = 1;
    }

    if (attributeDivisors[attribute] !== meshPerAttribute) {
      var extension = isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');
      extension[isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
      attributeDivisors[attribute] = meshPerAttribute;
    }
  }

  function disableUnusedAttributes() {
    for (var i = 0, l = enabledAttributes.length; i !== l; ++i) {
      if (enabledAttributes[i] !== newAttributes[i]) {
        gl.disableVertexAttribArray(i);
        enabledAttributes[i] = 0;
      }
    }
  }

  function enable(id) {
    if (enabledCapabilities[id] !== true) {
      gl.enable(id);
      enabledCapabilities[id] = true;
    }
  }

  function disable(id) {
    if (enabledCapabilities[id] !== false) {
      gl.disable(id);
      enabledCapabilities[id] = false;
    }
  }

  function useProgram(program) {
    if (currentProgram !== program) {
      gl.useProgram(program);
      currentProgram = program;
      return true;
    }

    return false;
  }

  var equationToGL = (_equationToGL = {}, _defineProperty(_equationToGL, _constants.AddEquation, gl.FUNC_ADD), _defineProperty(_equationToGL, _constants.SubtractEquation, gl.FUNC_SUBTRACT), _defineProperty(_equationToGL, _constants.ReverseSubtractEquation, gl.FUNC_REVERSE_SUBTRACT), _equationToGL);

  if (isWebGL2) {
    equationToGL[_constants.MinEquation] = gl.MIN;
    equationToGL[_constants.MaxEquation] = gl.MAX;
  } else {
    var extension = extensions.get('EXT_blend_minmax');

    if (extension !== null) {
      equationToGL[_constants.MinEquation] = extension.MIN_EXT;
      equationToGL[_constants.MaxEquation] = extension.MAX_EXT;
    }
  }

  var factorToGL = (_factorToGL = {}, _defineProperty(_factorToGL, _constants.ZeroFactor, gl.ZERO), _defineProperty(_factorToGL, _constants.OneFactor, gl.ONE), _defineProperty(_factorToGL, _constants.SrcColorFactor, gl.SRC_COLOR), _defineProperty(_factorToGL, _constants.SrcAlphaFactor, gl.SRC_ALPHA), _defineProperty(_factorToGL, _constants.SrcAlphaSaturateFactor, gl.SRC_ALPHA_SATURATE), _defineProperty(_factorToGL, _constants.DstColorFactor, gl.DST_COLOR), _defineProperty(_factorToGL, _constants.DstAlphaFactor, gl.DST_ALPHA), _defineProperty(_factorToGL, _constants.OneMinusSrcColorFactor, gl.ONE_MINUS_SRC_COLOR), _defineProperty(_factorToGL, _constants.OneMinusSrcAlphaFactor, gl.ONE_MINUS_SRC_ALPHA), _defineProperty(_factorToGL, _constants.OneMinusDstColorFactor, gl.ONE_MINUS_DST_COLOR), _defineProperty(_factorToGL, _constants.OneMinusDstAlphaFactor, gl.ONE_MINUS_DST_ALPHA), _factorToGL);

  function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {
    if (blending === _constants.NoBlending) {
      if (currentBlendingEnabled) {
        disable(gl.BLEND);
        currentBlendingEnabled = false;
      }

      return;
    }

    if (!currentBlendingEnabled) {
      enable(gl.BLEND);
      currentBlendingEnabled = true;
    }

    if (blending !== _constants.CustomBlending) {
      if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {
        if (currentBlendEquation !== _constants.AddEquation || currentBlendEquationAlpha !== _constants.AddEquation) {
          gl.blendEquation(gl.FUNC_ADD);
          currentBlendEquation = _constants.AddEquation;
          currentBlendEquationAlpha = _constants.AddEquation;
        }

        if (premultipliedAlpha) {
          switch (blending) {
            case _constants.NormalBlending:
              gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;

            case _constants.AdditiveBlending:
              gl.blendFunc(gl.ONE, gl.ONE);
              break;

            case _constants.SubtractiveBlending:
              gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
              break;

            case _constants.MultiplyBlending:
              gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
              break;

            default:
              console.error('THREE.WebGLState: Invalid blending: ', blending);
              break;
          }
        } else {
          switch (blending) {
            case _constants.NormalBlending:
              gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
              break;

            case _constants.AdditiveBlending:
              gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
              break;

            case _constants.SubtractiveBlending:
              gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
              break;

            case _constants.MultiplyBlending:
              gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
              break;

            default:
              console.error('THREE.WebGLState: Invalid blending: ', blending);
              break;
          }
        }

        currentBlendSrc = null;
        currentBlendDst = null;
        currentBlendSrcAlpha = null;
        currentBlendDstAlpha = null;
        currentBlending = blending;
        currentPremultipledAlpha = premultipliedAlpha;
      }

      return;
    } // custom blending


    blendEquationAlpha = blendEquationAlpha || blendEquation;
    blendSrcAlpha = blendSrcAlpha || blendSrc;
    blendDstAlpha = blendDstAlpha || blendDst;

    if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {
      gl.blendEquationSeparate(equationToGL[blendEquation], equationToGL[blendEquationAlpha]);
      currentBlendEquation = blendEquation;
      currentBlendEquationAlpha = blendEquationAlpha;
    }

    if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {
      gl.blendFuncSeparate(factorToGL[blendSrc], factorToGL[blendDst], factorToGL[blendSrcAlpha], factorToGL[blendDstAlpha]);
      currentBlendSrc = blendSrc;
      currentBlendDst = blendDst;
      currentBlendSrcAlpha = blendSrcAlpha;
      currentBlendDstAlpha = blendDstAlpha;
    }

    currentBlending = blending;
    currentPremultipledAlpha = null;
  }

  function setMaterial(material, frontFaceCW) {
    material.side === _constants.DoubleSide ? disable(gl.CULL_FACE) : enable(gl.CULL_FACE);
    var flipSided = material.side === _constants.BackSide;
    if (frontFaceCW) flipSided = !flipSided;
    setFlipSided(flipSided);
    material.blending === _constants.NormalBlending && material.transparent === false ? setBlending(_constants.NoBlending) : setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);
    depthBuffer.setFunc(material.depthFunc);
    depthBuffer.setTest(material.depthTest);
    depthBuffer.setMask(material.depthWrite);
    colorBuffer.setMask(material.colorWrite);
    var stencilWrite = material.stencilWrite;
    stencilBuffer.setTest(stencilWrite);

    if (stencilWrite) {
      stencilBuffer.setMask(material.stencilWriteMask);
      stencilBuffer.setFunc(material.stencilFunc, material.stencilRef, material.stencilFuncMask);
      stencilBuffer.setOp(material.stencilFail, material.stencilZFail, material.stencilZPass);
    }

    setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);
  } //


  function setFlipSided(flipSided) {
    if (currentFlipSided !== flipSided) {
      if (flipSided) {
        gl.frontFace(gl.CW);
      } else {
        gl.frontFace(gl.CCW);
      }

      currentFlipSided = flipSided;
    }
  }

  function setCullFace(cullFace) {
    if (cullFace !== _constants.CullFaceNone) {
      enable(gl.CULL_FACE);

      if (cullFace !== currentCullFace) {
        if (cullFace === _constants.CullFaceBack) {
          gl.cullFace(gl.BACK);
        } else if (cullFace === _constants.CullFaceFront) {
          gl.cullFace(gl.FRONT);
        } else {
          gl.cullFace(gl.FRONT_AND_BACK);
        }
      }
    } else {
      disable(gl.CULL_FACE);
    }

    currentCullFace = cullFace;
  }

  function setLineWidth(width) {
    if (width !== currentLineWidth) {
      if (lineWidthAvailable) gl.lineWidth(width);
      currentLineWidth = width;
    }
  }

  function setPolygonOffset(polygonOffset, factor, units) {
    if (polygonOffset) {
      enable(gl.POLYGON_OFFSET_FILL);

      if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {
        gl.polygonOffset(factor, units);
        currentPolygonOffsetFactor = factor;
        currentPolygonOffsetUnits = units;
      }
    } else {
      disable(gl.POLYGON_OFFSET_FILL);
    }
  }

  function setScissorTest(scissorTest) {
    if (scissorTest) {
      enable(gl.SCISSOR_TEST);
    } else {
      disable(gl.SCISSOR_TEST);
    }
  } // texture


  function activeTexture(webglSlot) {
    if (webglSlot === undefined) webglSlot = gl.TEXTURE0 + maxTextures - 1;

    if (currentTextureSlot !== webglSlot) {
      gl.activeTexture(webglSlot);
      currentTextureSlot = webglSlot;
    }
  }

  function bindTexture(webglType, webglTexture) {
    if (currentTextureSlot === null) {
      activeTexture();
    }

    var boundTexture = currentBoundTextures[currentTextureSlot];

    if (boundTexture === undefined) {
      boundTexture = {
        type: undefined,
        texture: undefined
      };
      currentBoundTextures[currentTextureSlot] = boundTexture;
    }

    if (boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
      gl.bindTexture(webglType, webglTexture || emptyTextures[webglType]);
      boundTexture.type = webglType;
      boundTexture.texture = webglTexture;
    }
  }

  function unbindTexture() {
    var boundTexture = currentBoundTextures[currentTextureSlot];

    if (boundTexture !== undefined && boundTexture.type !== undefined) {
      gl.bindTexture(boundTexture.type, null);
      boundTexture.type = undefined;
      boundTexture.texture = undefined;
    }
  }

  function compressedTexImage2D() {
    try {
      gl.compressedTexImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }

  function texImage2D() {
    try {
      gl.texImage2D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  }

  function texImage3D() {
    try {
      gl.texImage3D.apply(gl, arguments);
    } catch (error) {
      console.error('THREE.WebGLState:', error);
    }
  } //


  function scissor(scissor) {
    if (currentScissor.equals(scissor) === false) {
      gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
      currentScissor.copy(scissor);
    }
  }

  function viewport(viewport) {
    if (currentViewport.equals(viewport) === false) {
      gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
      currentViewport.copy(viewport);
    }
  } //


  function reset() {
    for (var i = 0; i < enabledAttributes.length; i++) {
      if (enabledAttributes[i] === 1) {
        gl.disableVertexAttribArray(i);
        enabledAttributes[i] = 0;
      }
    }

    enabledCapabilities = {};
    currentTextureSlot = null;
    currentBoundTextures = {};
    currentProgram = null;
    currentBlending = null;
    currentFlipSided = null;
    currentCullFace = null;
    colorBuffer.reset();
    depthBuffer.reset();
    stencilBuffer.reset();
  }

  return {
    buffers: {
      color: colorBuffer,
      depth: depthBuffer,
      stencil: stencilBuffer
    },
    initAttributes: initAttributes,
    enableAttribute: enableAttribute,
    enableAttributeAndDivisor: enableAttributeAndDivisor,
    disableUnusedAttributes: disableUnusedAttributes,
    enable: enable,
    disable: disable,
    useProgram: useProgram,
    setBlending: setBlending,
    setMaterial: setMaterial,
    setFlipSided: setFlipSided,
    setCullFace: setCullFace,
    setLineWidth: setLineWidth,
    setPolygonOffset: setPolygonOffset,
    setScissorTest: setScissorTest,
    activeTexture: activeTexture,
    bindTexture: bindTexture,
    unbindTexture: unbindTexture,
    compressedTexImage2D: compressedTexImage2D,
    texImage2D: texImage2D,
    texImage3D: texImage3D,
    scissor: scissor,
    viewport: viewport,
    reset: reset
  };
}