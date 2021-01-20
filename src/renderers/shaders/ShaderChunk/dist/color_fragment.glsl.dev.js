"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default =
/* glsl */
"\n#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n";
exports["default"] = _default;