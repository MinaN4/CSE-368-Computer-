"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderLib = void 0;

var _ShaderChunk = require("./ShaderChunk.js");

var _UniformsUtils = require("./UniformsUtils.js");

var _Vector = require("../../math/Vector2.js");

var _Vector2 = require("../../math/Vector3.js");

var _UniformsLib = require("./UniformsLib.js");

var _Color = require("../../math/Color.js");

var _Matrix = require("../../math/Matrix3.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */
var ShaderLib = {
  basic: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.specularmap, _UniformsLib.UniformsLib.envmap, _UniformsLib.UniformsLib.aomap, _UniformsLib.UniformsLib.lightmap, _UniformsLib.UniformsLib.fog]),
    vertexShader: _ShaderChunk.ShaderChunk.meshbasic_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.meshbasic_frag
  },
  lambert: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.specularmap, _UniformsLib.UniformsLib.envmap, _UniformsLib.UniformsLib.aomap, _UniformsLib.UniformsLib.lightmap, _UniformsLib.UniformsLib.emissivemap, _UniformsLib.UniformsLib.fog, _UniformsLib.UniformsLib.lights, {
      emissive: {
        value: new _Color.Color(0x000000)
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.meshlambert_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.meshlambert_frag
  },
  phong: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.specularmap, _UniformsLib.UniformsLib.envmap, _UniformsLib.UniformsLib.aomap, _UniformsLib.UniformsLib.lightmap, _UniformsLib.UniformsLib.emissivemap, _UniformsLib.UniformsLib.bumpmap, _UniformsLib.UniformsLib.normalmap, _UniformsLib.UniformsLib.displacementmap, _UniformsLib.UniformsLib.gradientmap, _UniformsLib.UniformsLib.fog, _UniformsLib.UniformsLib.lights, {
      emissive: {
        value: new _Color.Color(0x000000)
      },
      specular: {
        value: new _Color.Color(0x111111)
      },
      shininess: {
        value: 30
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.meshphong_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.meshphong_frag
  },
  standard: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.envmap, _UniformsLib.UniformsLib.aomap, _UniformsLib.UniformsLib.lightmap, _UniformsLib.UniformsLib.emissivemap, _UniformsLib.UniformsLib.bumpmap, _UniformsLib.UniformsLib.normalmap, _UniformsLib.UniformsLib.displacementmap, _UniformsLib.UniformsLib.roughnessmap, _UniformsLib.UniformsLib.metalnessmap, _UniformsLib.UniformsLib.fog, _UniformsLib.UniformsLib.lights, {
      emissive: {
        value: new _Color.Color(0x000000)
      },
      roughness: {
        value: 0.5
      },
      metalness: {
        value: 0.5
      },
      envMapIntensity: {
        value: 1
      } // temporary

    }]),
    vertexShader: _ShaderChunk.ShaderChunk.meshphysical_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.meshphysical_frag
  },
  matcap: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.bumpmap, _UniformsLib.UniformsLib.normalmap, _UniformsLib.UniformsLib.displacementmap, _UniformsLib.UniformsLib.fog, {
      matcap: {
        value: null
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.meshmatcap_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.meshmatcap_frag
  },
  points: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.points, _UniformsLib.UniformsLib.fog]),
    vertexShader: _ShaderChunk.ShaderChunk.points_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.points_frag
  },
  dashed: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.fog, {
      scale: {
        value: 1
      },
      dashSize: {
        value: 1
      },
      totalSize: {
        value: 2
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.linedashed_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.linedashed_frag
  },
  depth: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.displacementmap]),
    vertexShader: _ShaderChunk.ShaderChunk.depth_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.depth_frag
  },
  normal: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.bumpmap, _UniformsLib.UniformsLib.normalmap, _UniformsLib.UniformsLib.displacementmap, {
      opacity: {
        value: 1.0
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.normal_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.normal_frag
  },
  sprite: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.sprite, _UniformsLib.UniformsLib.fog]),
    vertexShader: _ShaderChunk.ShaderChunk.sprite_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: {
        value: new _Matrix.Matrix3()
      },
      t2D: {
        value: null
      }
    },
    vertexShader: _ShaderChunk.ShaderChunk.background_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.background_frag
  },

  /* -------------------------------------------------------------------------
  //	Cube map shader
   ------------------------------------------------------------------------- */
  cube: {
    uniforms: {
      tCube: {
        value: null
      },
      tFlip: {
        value: -1
      },
      opacity: {
        value: 1.0
      }
    },
    vertexShader: _ShaderChunk.ShaderChunk.cube_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: {
        value: null
      }
    },
    vertexShader: _ShaderChunk.ShaderChunk.equirect_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.equirect_frag
  },
  distanceRGBA: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.common, _UniformsLib.UniformsLib.displacementmap, {
      referencePosition: {
        value: new _Vector2.Vector3()
      },
      nearDistance: {
        value: 1
      },
      farDistance: {
        value: 1000
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.distanceRGBA_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.distanceRGBA_frag
  },
  shadow: {
    uniforms: (0, _UniformsUtils.mergeUniforms)([_UniformsLib.UniformsLib.lights, _UniformsLib.UniformsLib.fog, {
      color: {
        value: new _Color.Color(0x00000)
      },
      opacity: {
        value: 1.0
      }
    }]),
    vertexShader: _ShaderChunk.ShaderChunk.shadow_vert,
    fragmentShader: _ShaderChunk.ShaderChunk.shadow_frag
  }
};
exports.ShaderLib = ShaderLib;
ShaderLib.physical = {
  uniforms: (0, _UniformsUtils.mergeUniforms)([ShaderLib.standard.uniforms, {
    transparency: {
      value: 0
    },
    clearcoat: {
      value: 0
    },
    clearcoatRoughness: {
      value: 0
    },
    sheen: {
      value: new _Color.Color(0x000000)
    },
    clearcoatNormalScale: {
      value: new _Vector.Vector2(1, 1)
    },
    clearcoatNormalMap: {
      value: null
    }
  }]),
  vertexShader: _ShaderChunk.ShaderChunk.meshphysical_vert,
  fragmentShader: _ShaderChunk.ShaderChunk.meshphysical_frag
};