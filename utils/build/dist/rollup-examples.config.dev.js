"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var path = require('path');

var fs = require('fs'); // Creates a rollup config object for the given file to
// be converted to umd


function createOutput(file) {
  var inputPath = path.resolve(file);
  var outputPath = inputPath.replace(/[\\\/]examples[\\\/]jsm[\\\/]/, '/examples/js/'); // Every import is marked as external so the output is 1-to-1. We
  // assume that that global object should be the THREE object so we
  // replicate the existing behavior.

  return {
    input: inputPath,
    treeshake: false,
    external: function external(p) {
      return p !== inputPath;
    },
    plugins: [{
      generateBundle: function generateBundle(options, bundle) {
        for (var key in bundle) {
          bundle[key].code = bundle[key].code.replace(/three_module_js/g, 'THREE');
        }
      }
    }],
    output: {
      format: 'umd',
      name: 'THREE',
      file: outputPath,
      globals: function globals() {
        return 'THREE';
      },
      paths: function paths(p) {
        return /three\.module\.js$/.test(p) ? 'three' : p;
      },
      extend: true,
      banner: '/**\n' + " * Generated from '".concat(path.relative('.', inputPath).replace(/\\/g, '/'), "'\n") + ' */\n',
      esModule: false
    }
  };
} // Walk the file structure starting at the given directory and fire
// the callback for every js file.


function walk(dir, cb) {
  var files = fs.readdirSync(dir);
  files.forEach(function (f) {
    var p = path.join(dir, f);
    var stats = fs.statSync(p);

    if (stats.isDirectory()) {
      walk(p, cb);
    } else if (f.endsWith('.js')) {
      cb(p);
    }
  });
} // Gather up all the files


var files = [];
walk('examples/jsm/', function (p) {
  return files.push(p);
}); // Create a rollup config for each module.js file

var _default = files.map(function (p) {
  return createOutput(p);
});

exports["default"] = _default;