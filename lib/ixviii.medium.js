module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUniformBuffer = exports.createBuffer = exports.webgl2 = undefined;
exports.set = set;
exports.get = get;

var _Constants = __webpack_require__(7);

var gl = void 0;
var contextType = void 0;
var webgl2 = void 0;
/*
    Set the gl instance
    This is set from the renderer
*/
function set(_gl, _contextType) {
    gl = _gl;
    contextType = _contextType;
    exports.webgl2 = webgl2 = contextType === _Constants.WEBGL2_CONTEXT;
}
/*
    Get the gl instance
*/
function get() {
    return gl;
}
/**
    * createBuffer
    * @return {Buffer}
    */
function createBuffer(type, data) {
    var isDynamic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var buffer = gl.createBuffer();
    var usage = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
    var ArrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
    gl.bindBuffer(type, buffer);
    // https://github.com/nkemnitz/webgl2-ts/blob/master/WebGL2/webgl2-context.d.ts#L276
    if (gl instanceof WebGL2RenderingContext) {
        gl.bufferData(type, new ArrayView(data), usage, 0);
    } else {
        gl.bufferData(type, new ArrayView(data), usage);
    }
    gl.bindBuffer(type, null);
    return buffer;
}
/**
    * createUniformBuffer
    * @return {Buffer}
    */
function createUniformBuffer(data) {
    var buffer = gl.createBuffer();
    if (gl instanceof WebGL2RenderingContext) {
        gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
        gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
        return buffer;
    } else {
        return false;
    }
}
exports.webgl2 = webgl2;
exports.createBuffer = createBuffer;
exports.createUniformBuffer = createUniformBuffer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = __webpack_require__(5);
exports.mat2 = __webpack_require__(72);
exports.mat2d = __webpack_require__(73);
exports.mat3 = __webpack_require__(31);
exports.mat4 = __webpack_require__(74);
exports.quat = __webpack_require__(75);
exports.vec2 = __webpack_require__(76);
exports.vec3 = __webpack_require__(32);
exports.vec4 = __webpack_require__(33);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector3 = function () {
    function Vector3() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Vector3);

        this.v = _glMatrix.vec3.create();
        this.set(x, y, z);
        return this;
    }

    _createClass(Vector3, [{
        key: 'set',
        value: function set(x, y, z) {
            _glMatrix.vec3.set(this.v, x, y, z);
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Vector3(this.v[0], this.v[1], this.v[2]);
        }
    }, {
        key: 'copy',
        value: function copy(vector3) {
            _glMatrix.vec3.copy(this.v, vector3.v);
            return this;
        }
    }, {
        key: 'add',
        value: function add(vector3) {
            _glMatrix.vec3.add(this.v, this.v, vector3.v);
            return this;
        }
    }, {
        key: 'subtract',
        value: function subtract(vector3) {
            _glMatrix.vec3.subtract(this.v, this.v, vector3.v);
            return this;
        }
    }, {
        key: 'subtractVectors',
        value: function subtractVectors(vector0, vector1) {
            var out = _glMatrix.vec3.create();
            _glMatrix.vec3.subtract(out, vector0.v, vector1.v);
            return out;
        }
    }, {
        key: 'scale',
        value: function scale(value) {
            _glMatrix.vec3.scale(this.v, this.v, value);
            return this;
        }
    }, {
        key: 'distance',
        value: function distance(vector3) {
            return _glMatrix.vec3.distance(this.v, vector3.v);
        }
    }, {
        key: 'length',
        value: function length() {
            return _glMatrix.vec3.length(this.v);
        }
    }, {
        key: 'negate',
        value: function negate() {
            _glMatrix.vec3.negate(this.v, this.v);
            return this;
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            _glMatrix.vec3.normalize(this.v, this.v);
            return this;
        }
    }, {
        key: 'dot',
        value: function dot(vector3) {
            return _glMatrix.vec3.dot(this.v, vector3.v);
        }
    }, {
        key: 'cross',
        value: function cross(vector3) {
            _glMatrix.vec3.cross(this.v, this.v, vector3.v);
            return this;
        }
    }, {
        key: 'crossVectors',
        value: function crossVectors(vector0, vector1) {
            var out = _glMatrix.vec3.create();
            _glMatrix.vec3.cross(out, vector0.v, vector1.v);
            return this;
        }
    }, {
        key: 'lerp',
        value: function lerp(vector3, value) {
            _glMatrix.vec3.lerp(this.v, this.v, vector3.v, value);
            return this;
        }
    }, {
        key: 'equals',
        value: function equals(vector3) {
            return _glMatrix.vec3.equals(this.v, vector3.v);
        }
    }, {
        key: 'x',
        set: function set(value) {
            this.v[0] = value;
        },
        get: function get() {
            return this.v[0];
        }
    }, {
        key: 'y',
        set: function set(value) {
            this.v[1] = value;
        },
        get: function get() {
            return this.v[1];
        }
    }, {
        key: 'z',
        set: function set(value) {
            this.v[2] = value;
        },
        get: function get() {
            return this.v[2];
        }
    }]);

    return Vector3;
}();

exports.default = Vector3;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extensions = exports.capabilities = undefined;
exports.set = set;

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Constants = __webpack_require__(7);

var _Console = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
    * https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLCapabilities.js
    */
function getMaxPrecision(gl, precision) {
    if (precision === 'highp') {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
            return 'highp';
        }
        precision = 'mediump';
    }
    if (precision === 'mediump') {
        if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
            return 'mediump';
        }
    }
    return 'lowp';
}
function Capabilities(gl) {
    var precision = _Constants.PRECISION;
    var maxPrecision = getMaxPrecision(gl, precision);
    if (maxPrecision !== precision) {
        (0, _Console.warn)('Capabilities:', precision, 'not supported, using', maxPrecision, 'instead.');
        precision = maxPrecision;
    }
    var maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    var maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    var maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    var maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
    var maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    var maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    var maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
    var maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    return {
        precision: precision,
        maxTextures: maxTextures,
        maxPrecision: maxPrecision,
        maxVertexTextures: maxVertexTextures,
        maxTextureSize: maxTextureSize,
        maxCubemapSize: maxCubemapSize,
        maxAttributes: maxAttributes,
        maxVertexUniforms: maxVertexUniforms,
        maxVaryings: maxVaryings,
        maxFragmentUniforms: maxFragmentUniforms
    };
}
function Extensions(gl) {
    var vertexArrayObject = GL.webgl2 || gl.getExtension('OES_vertex_array_object') || false;
    var angleInstancedArrays = gl.getExtension('ANGLE_instanced_arrays') || false;
    var textureFloat = gl.getExtension('OES_texture_float') || false;
    return {
        angleInstancedArrays: angleInstancedArrays,
        vertexArrayObject: vertexArrayObject,
        textureFloat: textureFloat
    };
}
var capabilities = {};
var extensions = {};
/*
    Set the capabilities once
*/
function set(gl) {
    exports.capabilities = capabilities = Capabilities(gl);
    exports.extensions = extensions = Extensions(gl);
}
/*
    Get capabilities
*/
exports.capabilities = capabilities;
exports.extensions = extensions;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _BufferAttribute = __webpack_require__(21);

var _BufferAttribute2 = _interopRequireDefault(_BufferAttribute);

var _Face = __webpack_require__(60);

var _Face2 = _interopRequireDefault(_Face);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = __webpack_require__(14);

var _Vector4 = _interopRequireDefault(_Vector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;
var bufferNormalsTmp = [];

var Geometry = function () {
    function Geometry(vertices, indices, normals, uvs, colors) {
        _classCallCheck(this, Geometry);

        gl = GL.get();
        this.bufferVertices = vertices;
        this.bufferIndices = indices;
        this.bufferNormals = normals;
        this.bufferUvs = uvs;
        this.bufferColors = colors;
        this.attributes = {};
        this.attributesInstanced = {};
        // Vertex positions
        if (this.bufferVertices) {
            this.addAttribute('aVertexPosition', gl.ARRAY_BUFFER, this.bufferVertices, 3);
            this.generateVertices();
        }
        // Vertex indices
        if (this.bufferIndices) {
            this.addAttribute('aIndex', gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices, 1, false);
            this.generateFaces();
        }
        // Vertex normals
        if (this.bufferNormals) {
            this.addAttribute('aVertexNormal', gl.ARRAY_BUFFER, this.bufferNormals, 3);
        }
        // uvs
        if (this.bufferUvs) {
            this.addAttribute('aUv', gl.ARRAY_BUFFER, this.bufferUvs, 2);
            this.generateUvs();
        }
        // Vertex colors
        if (this.bufferColors) {
            this.addAttribute('aVertexColor', gl.ARRAY_BUFFER, this.bufferColors, 3);
        }
    }

    _createClass(Geometry, [{
        key: 'addAttribute',
        value: function addAttribute(name, type, data, count, shaderAttribute) {
            this.attributes[name] = new _BufferAttribute2.default(type, data, count, shaderAttribute);
        }
    }, {
        key: 'addInstancedBufferAttribute',
        value: function addInstancedBufferAttribute(name, value, count) {
            this.attributesInstanced[name] = new _BufferAttribute2.default(gl.ARRAY_BUFFER, value, count);
        }
    }, {
        key: 'generateVertices',
        value: function generateVertices() {
            this.vertices = [];
            for (var i = 0; i < this.bufferVertices.length; i += 3) {
                var a = this.bufferVertices[i];
                var b = this.bufferVertices[i + 1];
                var c = this.bufferVertices[i + 2];
                var vertex = new _Vector2.default(a, b, c);
                this.vertices.push(vertex);
            }
        }
    }, {
        key: 'generateFaces',
        value: function generateFaces() {
            this.faces = [];
            for (var i = 0; i < this.bufferIndices.length; i += 3) {
                var ia = this.bufferIndices[i];
                var ib = this.bufferIndices[i + 1];
                var ic = this.bufferIndices[i + 2];
                var a = this.vertices[ia];
                var b = this.vertices[ib];
                var c = this.vertices[ic];
                var face = new _Face2.default(ia, ib, ic, a, b, c);
                this.faces.push(face);
            }
        }
    }, {
        key: 'generateUvs',
        value: function generateUvs() {
            this.uvs = [];
            for (var i = 0; i < this.bufferUvs.length; i += 2) {
                var a = this.bufferUvs[i];
                var b = this.bufferUvs[i + 1];
                var uv = new _Vector4.default(a, b);
                this.uvs.push(uv);
            }
        }
    }, {
        key: 'updateVertices',
        value: function updateVertices() {
            var _this = this;

            gl = GL.get();
            this.vertices.forEach(function (vertex, i) {
                _this.bufferVertices.set(vertex.v, i * vertex.v.length);
            });
            this.attributes.aVertexPosition.update(this.bufferVertices);
        }
    }, {
        key: 'updateNormals',
        value: function updateNormals() {
            var normals = [];
            this.faces.forEach(function (face) {
                face.updateFaceNormal();
                normals[face.indices[0]] = face.normal.v;
                normals[face.indices[1]] = face.normal.v;
                normals[face.indices[2]] = face.normal.v;
            });
            // Flatten
            bufferNormalsTmp = [];
            normals.forEach(function (normal) {
                var _bufferNormalsTmp;

                bufferNormalsTmp = (_bufferNormalsTmp = bufferNormalsTmp).concat.apply(_bufferNormalsTmp, _toConsumableArray(normal));
            });
            // Copy from temp
            this.bufferNormals.set(bufferNormalsTmp);
            this.attributes.aVertexNormal.update(this.bufferNormals);
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            var _this2 = this;

            gl = GL.get();
            // Dispose attributes and buffers
            Object.keys(this.attributes).forEach(function (attributeName) {
                _this2.attributes[attributeName].dispose(gl);
                delete _this2.attributes[attributeName];
            });
            Object.keys(this.attributesInstanced).forEach(function (attributeName) {
                _this2.attributesInstanced[attributeName].dispose(gl);
                delete _this2.attributesInstanced[attributeName];
            });
            delete this.attributes;
            delete this.attributesInstanced;
            this.bufferVertices = null;
            this.bufferIndices = null;
            this.bufferNormals = null;
            this.bufferUvs = null;
            this.bufferColors = null;
        }
    }]);

    return Geometry;
}();

exports.default = Geometry;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    glMatrix.ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function(a, b) {
	return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

module.exports = glMatrix;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Es300
exports.default = '#version 300 es';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Contexts
// Contexts
var WEBGL_CONTEXT = exports.WEBGL_CONTEXT = 'webgl';
var WEBGL2_CONTEXT = exports.WEBGL2_CONTEXT = 'webgl2';
// Default ratio
var RENDERER_DEFAULT_CONTEXT = exports.RENDERER_DEFAULT_CONTEXT = WEBGL2_CONTEXT;
var RENDERER_DEFAULT_WIDTH = exports.RENDERER_DEFAULT_WIDTH = 1280;
var RENDERER_DEFAULT_HEIGHT = exports.RENDERER_DEFAULT_HEIGHT = 720;
var RENDERER_DEFAULT_RATIO = exports.RENDERER_DEFAULT_RATIO = RENDERER_DEFAULT_WIDTH / RENDERER_DEFAULT_HEIGHT;
// Precision
var PRECISION = exports.PRECISION = 'highp';
// Culling
var CULL_NONE = exports.CULL_NONE = -1;
var CULL_BACK = exports.CULL_BACK = 0x0405;
var CULL_FRONT = exports.CULL_FRONT = 0x0404;
var CULL_FRONT_AND_BACK = exports.CULL_FRONT_AND_BACK = 0x0408;
// Draw style
var DRAW_POINTS = exports.DRAW_POINTS = 0;
var DRAW_LINES = exports.DRAW_LINES = 1;
var DRAW_LINE_STRIP = exports.DRAW_LINE_STRIP = 2;
var DRAW_TRIANGLES = exports.DRAW_TRIANGLES = 4;
// Uniform location indices
var UNIFORM_PROJECTION_VIEW_LOCATION = exports.UNIFORM_PROJECTION_VIEW_LOCATION = 0;
var UNIFORM_DIRECTIONAL_LIGHTS_LOCATION = exports.UNIFORM_DIRECTIONAL_LIGHTS_LOCATION = 1;
var UNIFORM_SPOT_LIGHTS_LOCATION = exports.UNIFORM_SPOT_LIGHTS_LOCATION = 2;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// Es300
exports.default = "\n\tuniform ProjectionView {\n\t\tmat4 projectionMatrix;\n\t\tmat4 viewMatrix;\n\t} uProjectionView;\n";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Object3D2 = __webpack_require__(19);

var _Object3D3 = _interopRequireDefault(_Object3D2);

var _Vao = __webpack_require__(20);

var _Vao2 = _interopRequireDefault(_Vao);

var _Capabilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gl = void 0;

var Mesh = function (_Object3D) {
    _inherits(Mesh, _Object3D);

    function Mesh(geometry, shader) {
        _classCallCheck(this, Mesh);

        var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this));

        _this.geometry = geometry;
        _this.shader = shader;
        _this.vao = new _Vao2.default();
        _this.visible = true;
        _this.instanceCount = 0;
        // Allow meshes to share shaders and programs
        if (!_this.shader.program.created) {
            _this.shader.create(_this.geometry);
        }
        _this.isInstanced = false;
        gl = GL.get();
        // Setup vao
        _this.vao.bind();
        _this.bindAttributes();
        _this.bindAttributesInstanced();
        _this.bindIndexBuffer();
        _this.vao.unbind();
        return _this;
    }

    _createClass(Mesh, [{
        key: 'setInstanceCount',
        value: function setInstanceCount(value) {
            gl = GL.get();
            this.instanceCount = value;
            this.isInstanced = true;
        }
    }, {
        key: 'bindAttributes',
        value: function bindAttributes() {
            var _this2 = this;

            // Attributes
            Object.keys(this.geometry.attributes).forEach(function (attributeName) {
                if (attributeName !== 'aIndex') {
                    // enableVertexAttribArray
                    _this2.shader.program.setAttributeLocation(attributeName);
                    // Bind buffer
                    _this2.geometry.attributes[attributeName].bind();
                    // vertexAttribPointer
                    _this2.shader.program.setAttributePointer(attributeName, _this2.geometry.attributes[attributeName].itemSize);
                }
            });
        }
    }, {
        key: 'bindAttributesInstanced',
        value: function bindAttributesInstanced() {
            var _this3 = this;

            // Instanced Attributes
            Object.keys(this.geometry.attributesInstanced).forEach(function (attributeName) {
                if (attributeName !== 'aIndex') {
                    // enableVertexAttribArray
                    _this3.shader.program.setAttributeLocation(attributeName);
                    // Bind buffer
                    _this3.geometry.attributesInstanced[attributeName].bind();
                    // vertexAttribPointer
                    _this3.shader.program.setAttributeInstancedPointer(attributeName, _this3.geometry.attributesInstanced[attributeName].itemSize);
                    if (gl instanceof WebGL2RenderingContext) {
                        gl.vertexAttribDivisor(_this3.shader.program.attributeLocations[attributeName], 1);
                    } else {
                        _Capabilities.extensions.angleInstancedArrays.vertexAttribDivisorANGLE(_this3.shader.program.attributeLocations[attributeName], 1);
                    }
                }
            });
        }
    }, {
        key: 'bindIndexBuffer',
        value: function bindIndexBuffer() {
            // Bind index buffer
            if (this.geometry.bufferIndices) {
                this.geometry.attributes.aIndex.bind();
            }
        }
    }, {
        key: 'draw',
        value: function draw(modelViewMatrix, projectionMatrix, camera) {
            if (!this.visible) return;
            gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            this.shader.program.bind();
            // Culling enable
            if (this.shader.culling !== -1) {
                gl.enable(gl.CULL_FACE);
                gl.cullFace(this.shader.culling);
            }
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            if (this.geometry.attributes.aIndex) {
                gl.drawElements(this.shader.drawType, this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0);
            } else {
                gl.drawArrays(this.shader.drawType, 0, this.geometry.attributes.aVertexPosition.numItems);
            }
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
            // Culling disable
            if (this.shader.culling !== -1) {
                gl.disable(gl.CULL_FACE);
            }
        }
    }, {
        key: 'drawInstance',
        value: function drawInstance(modelViewMatrix, projectionMatrix, camera) {
            if (!this.visible) return;
            gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            this.shader.program.bind();
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);
            // Culling enable
            if (this.shader.culling !== -1) {
                gl.enable(gl.CULL_FACE);
                gl.cullFace(this.shader.culling);
            }
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawElementsInstanced(this.shader.drawType, this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);
            } else {
                _Capabilities.extensions.angleInstancedArrays.drawElementsInstancedANGLE(this.shader.drawType, this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);
            }
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
            // Culling disable
            if (this.shader.culling !== -1) {
                gl.disable(gl.CULL_FACE);
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.shader.dispose();
            this.geometry.dispose();
            this.vao.dispose();
            this.geometry = null;
            this.shader = null;
            _get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), 'dispose', this).call(this);
        }
    }]);

    return Mesh;
}(_Object3D3.default);

exports.default = Mesh;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Constants = __webpack_require__(7);

var CONSTANTS = _interopRequireWildcard(_Constants);

var _glMatrix = __webpack_require__(1);

var _Vertex = __webpack_require__(63);

var _Frag = __webpack_require__(62);

var _ShaderParser = __webpack_require__(71);

var _ShaderParser2 = _interopRequireDefault(_ShaderParser);

var _Color = __webpack_require__(11);

var _Color2 = _interopRequireDefault(_Color);

var _Capabilities = __webpack_require__(3);

var _UniformBuffers = __webpack_require__(16);

var _UniformBuffers2 = _interopRequireDefault(_UniformBuffers);

var _Program = __webpack_require__(59);

var _Program2 = _interopRequireDefault(_Program);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;
var normalMatrix = _glMatrix.mat3.create();
var inversedViewMatrix = _glMatrix.mat4.create();
var inversedModelViewMatrix = _glMatrix.mat4.create();

var Shader = function () {
    function Shader(options) {
        _classCallCheck(this, Shader);

        var vertexShader = GL.webgl2 ? _Vertex.vertexShaderEs300 : _Vertex.vertexShaderEs100;
        var fragmentShader = GL.webgl2 ? _Frag.fragmentShaderEs300 : _Frag.fragmentShaderEs100;
        this.name = '';
        this.uniforms = {};
        this.hookVertexPre = '';
        this.hookVertexMain = '';
        this.hookVertexEnd = '';
        this.hookFragmentPre = '';
        this.hookFragmentMain = '';
        this.hookFragmentEnd = '';
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.drawType = CONSTANTS.DRAW_TRIANGLES;
        this.directionalLights = undefined;
        this.pointLights = undefined;
        this.culling = CONSTANTS.CULL_NONE;
        Object.assign(this, options);
        this.program = new _Program2.default();
    }

    _createClass(Shader, [{
        key: 'create',
        value: function create(geometry, transformFeedbackVaryings) {
            var _this = this;

            gl = GL.get();
            this.vertexShader = this._processShader(this.vertexShader, 'vertex', geometry);
            this.fragmentShader = this._processShader(this.fragmentShader, 'fragment', geometry);
            this.program.link(this.vertexShader, this.fragmentShader, transformFeedbackVaryings);
            // User defined uniforms
            this.customUniforms = this.uniforms || {};
            // Uniforms for ProjectionView uniform block
            if (GL.webgl2) {
                this.program.setUniformBlockLocation('ProjectionView', _UniformBuffers2.default.projectionView.buffer, CONSTANTS.UNIFORM_PROJECTION_VIEW_LOCATION);
            }
            if (this.directionalLights) {
                if (GL.webgl2) {
                    // Setup uniform block for directional lights
                    this.program.setUniformBlockLocation('DirectionalLights', this.directionalLights.uniformBuffer.buffer, CONSTANTS.UNIFORM_DIRECTIONAL_LIGHTS_LOCATION);
                } else {
                    // Generate uniforms for directional lights
                    this.directionalLights.get().forEach(function (directionalLight, i) {
                        Object.keys(directionalLight.uniforms).forEach(function (directionalLightUniform) {
                            var uniform = directionalLight.uniforms[directionalLightUniform];
                            _this.customUniforms['uDirectionalLights[' + i + '].' + directionalLightUniform] = uniform;
                        });
                    });
                }
            }
            if (this.pointLights) {
                if (GL.webgl2) {
                    // Setup uniform block for point lights
                    this.program.setUniformBlockLocation('PointLights', this.pointLights.uniformBuffer.buffer, CONSTANTS.UNIFORM_SPOT_LIGHTS_LOCATION);
                } else {
                    // Generate uniforms for point lights
                    this.pointLights.get().forEach(function (pointLight, i) {
                        Object.keys(pointLight.uniforms).forEach(function (pointLightUniform) {
                            var uniform = pointLight.uniforms[pointLightUniform];
                            _this.customUniforms['uPointLights[' + i + '].' + pointLightUniform] = uniform;
                        });
                    });
                }
            }
            // Generate texture indices
            var textureIndex = 0;
            Object.keys(this.uniforms).forEach(function (uniformName) {
                switch (_this.uniforms[uniformName].type) {
                    case 't':
                    case 'tc':
                        {
                            _this.uniforms[uniformName].textureIndex = textureIndex;
                            textureIndex += 1;
                            break;
                        }
                    default:
                }
            });
            // Add Camera position uniform for point lights if it doesn"t exist
            if (this.uniforms.uCameraPosition === undefined && this.pointLights) {
                this.uniforms.uCameraPosition = {
                    type: '3f',
                    value: [0, 0, 0]
                };
            }
            // Only for webgl1
            var projectionViewUniforms = GL.webgl2 ? {} : {
                uProjectionMatrix: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                },
                uViewMatrix: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                }
            };
            // Default uniforms
            this.uniforms = Object.assign({
                uViewMatrixInverse: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                },
                uModelMatrix: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                },
                uModelMatrixInverse: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                },
                uNormalMatrix: {
                    type: '4fv',
                    value: _glMatrix.mat4.create(),
                    location: null
                },
                uDiffuse: {
                    type: '3f',
                    value: new _Color2.default().v,
                    location: null
                }
            }, this.customUniforms, projectionViewUniforms);
            Object.keys(this.uniforms).forEach(function (uniformName) {
                _this.program.setUniformLocation(_this.uniforms, uniformName);
            });
        }
    }, {
        key: '_processShader',
        value: function _processShader(shader, type, geometry) {
            gl = GL.get();
            var defines = '';
            var precision = 'precision ' + _Capabilities.capabilities.precision + ' float;';
            function addDefine(define) {
                defines += '#define ' + define + ' \n';
            }
            if (geometry.bufferUvs) {
                addDefine('uv');
            }
            if (geometry.bufferColors) {
                addDefine('vertexColors');
            }
            if (geometry.bufferNormals) {
                addDefine('normals');
            }
            if (this.directionalLights) {
                addDefine('directionalLights');
            }
            if (this.pointLights) {
                addDefine('pointLights');
            }
            shader = shader.replace(/#HOOK_PRECISION/g, precision);
            shader = shader.replace(/#HOOK_DEFINES/g, defines);
            shader = shader.replace(/#HOOK_VERTEX_PRE/g, this.hookVertexPre);
            shader = shader.replace(/#HOOK_VERTEX_MAIN/g, this.hookVertexMain);
            shader = shader.replace(/#HOOK_VERTEX_END/g, this.hookVertexEnd);
            shader = shader.replace(/#HOOK_FRAGMENT_PRE/g, this.hookFragmentPre);
            shader = shader.replace(/#HOOK_FRAGMENT_MAIN/g, this.hookFragmentMain);
            shader = shader.replace(/#HOOK_FRAGMENT_END/g, this.hookFragmentEnd);
            if (this.pointLights) {
                shader = shader.replace(/#HOOK_POINT_LIGHTS/g, String(this.pointLights.length));
            }
            if (this.directionalLights) {
                shader = shader.replace(/#HOOK_DIRECTIONAL_LIGHTS/g, String(this.directionalLights.length));
            }
            return (0, _ShaderParser2.default)(shader, type);
        }
    }, {
        key: 'setUniforms',
        value: function setUniforms(modelViewMatrix, projectionMatrix, modelMatrix, camera) {
            var _this2 = this;

            gl = GL.get();
            // Update the other uniforms
            Object.keys(this.customUniforms).forEach(function (uniformName) {
                var uniform = _this2.uniforms[uniformName];
                switch (uniform.type) {
                    case 't':
                        {
                            gl.uniform1i(uniform.location, uniform.textureIndex);
                            var activeTexture = void 0;
                            switch (uniform.textureIndex) {
                                case 5:
                                    activeTexture = gl.TEXTURE5;
                                    break;
                                case 4:
                                    activeTexture = gl.TEXTURE4;
                                    break;
                                case 3:
                                    activeTexture = gl.TEXTURE3;
                                    break;
                                case 2:
                                    activeTexture = gl.TEXTURE2;
                                    break;
                                case 1:
                                    activeTexture = gl.TEXTURE1;
                                    break;
                                default:
                                    activeTexture = gl.TEXTURE0;
                            }
                            gl.activeTexture(activeTexture);
                            gl.bindTexture(gl.TEXTURE_2D, uniform.value);
                            break;
                        }
                    case 'tc':
                        {
                            gl.uniform1i(uniform.location, uniform.textureIndex);
                            var _activeTexture = void 0;
                            switch (uniform.textureIndex) {
                                case 5:
                                    _activeTexture = gl.TEXTURE5;
                                    break;
                                case 4:
                                    _activeTexture = gl.TEXTURE4;
                                    break;
                                case 3:
                                    _activeTexture = gl.TEXTURE3;
                                    break;
                                case 2:
                                    _activeTexture = gl.TEXTURE2;
                                    break;
                                case 1:
                                    _activeTexture = gl.TEXTURE1;
                                    break;
                                default:
                                    _activeTexture = gl.TEXTURE0;
                            }
                            gl.activeTexture(_activeTexture);
                            gl.bindTexture(gl.TEXTURE_CUBE_MAP, uniform.value);
                            break;
                        }
                    case 'i':
                        {
                            gl.uniform1i(uniform.location, uniform.value);
                            break;
                        }
                    case 'f':
                        {
                            gl.uniform1f(uniform.location, uniform.value);
                            break;
                        }
                    case '2f':
                        {
                            gl.uniform2f(uniform.location, uniform.value[0], uniform.value[1]);
                            break;
                        }
                    case '3f':
                        {
                            gl.uniform3f(uniform.location, uniform.value[0], uniform.value[1], uniform.value[2]);
                            break;
                        }
                    case '4f':
                        {
                            gl.uniform4f(uniform.location, uniform.value[0], uniform.value[1], uniform.value[2], uniform.value[3]);
                            break;
                        }
                    case '1iv':
                        {
                            gl.uniform1iv(uniform.location, uniform.value);
                            break;
                        }
                    case '2iv':
                        {
                            gl.uniform2iv(uniform.location, uniform.value);
                            break;
                        }
                    case '1fv':
                        {
                            gl.uniform1fv(uniform.location, uniform.value);
                            break;
                        }
                    case '2fv':
                        {
                            gl.uniform2fv(uniform.location, uniform.value);
                            break;
                        }
                    case '3fv':
                        {
                            gl.uniform3fv(uniform.location, uniform.value);
                            break;
                        }
                    case '4fv':
                        {
                            gl.uniform4fv(uniform.location, uniform.value);
                            break;
                        }
                    case 'Matrix3fv':
                        {
                            gl.uniformMatrix3fv(uniform.location, false, uniform.value);
                            break;
                        }
                    case 'Matrix4fv':
                        {
                            gl.uniformMatrix4fv(uniform.location, false, uniform.value);
                            break;
                        }
                    default:
                }
            });
            if (!GL.webgl2) {
                // Matrix
                gl.uniformMatrix4fv(this.uniforms.uProjectionMatrix.location, false, projectionMatrix);
                gl.uniformMatrix4fv(this.uniforms.uViewMatrix.location, false, modelViewMatrix);
            }
            // Inverse view matrix
            _glMatrix.mat4.identity(inversedViewMatrix);
            _glMatrix.mat4.invert(inversedViewMatrix, modelViewMatrix);
            gl.uniformMatrix4fv(this.uniforms.uViewMatrixInverse.location, false, inversedViewMatrix);
            // Inverse model matrix
            gl.uniformMatrix4fv(this.uniforms.uModelMatrix.location, false, modelMatrix);
            _glMatrix.mat4.identity(inversedModelViewMatrix);
            _glMatrix.mat4.invert(inversedModelViewMatrix, modelMatrix);
            gl.uniformMatrix4fv(this.uniforms.uModelMatrixInverse.location, false, inversedModelViewMatrix);
            // Create normal normalMatrix
            // Removes scale and translation
            _glMatrix.mat3.identity(normalMatrix);
            _glMatrix.mat3.fromMat4(normalMatrix, inversedModelViewMatrix);
            _glMatrix.mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(this.uniforms.uNormalMatrix.location, false, normalMatrix);
            // uDiffuse
            gl.uniform3f(this.uniforms.uDiffuse.location, this.uniforms.uDiffuse.value[0], this.uniforms.uDiffuse.value[1], this.uniforms.uDiffuse.value[2]);
            // Camera
            if (camera && this.uniforms.uCameraPosition) {
                gl.uniform3f(this.uniforms.uCameraPosition.location, camera.position.v[0], camera.position.v[1], camera.position.v[2]);
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            var _this3 = this;

            // Dispose textures
            Object.keys(this.customUniforms).forEach(function (uniformName) {
                var uniform = _this3.uniforms[uniformName];
                switch (uniform.type) {
                    case 't':
                    case 'tc':
                        {
                            gl.deleteTexture(uniform.value);
                            break;
                        }
                    default:
                }
            });
            this.program.dispose();
        }
    }]);

    return Shader;
}();

exports.default = Shader;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
    function Color() {
        var hex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0xFFFFFF;

        _classCallCheck(this, Color);

        this.v = _glMatrix.vec3.create();
        this.convert(hex);
        return this;
    }

    _createClass(Color, [{
        key: 'set',
        value: function set(r, g, b) {
            _glMatrix.vec3.set(this.v, r, g, b);
            return this;
        }
    }, {
        key: 'copy',
        value: function copy(rgb) {
            _glMatrix.vec3.copy(this.v, _glMatrix.vec3.fromValues(rgb[0], rgb[1], rgb[2]));
            return this;
        }
    }, {
        key: 'convert',
        value: function convert(hex) {
            var rgb = void 0;
            if (typeof hex === 'number') {
                rgb = this.hexIntToRgb(hex);
            }
            if (typeof hex === 'string') {
                rgb = this.hexStringToRgb(hex);
            }
            _glMatrix.vec3.copy(this.v, this.normalize(rgb));
            return this;
        }
    }, {
        key: 'normalize',
        value: function normalize(array) {
            return _glMatrix.vec3.fromValues(array[0] / 255, array[1] / 255, array[2] / 255);
        }
    }, {
        key: 'fromArray',
        value: function fromArray(array) {
            this.set(array[0], array[1], array[2]);
        }
    }, {
        key: 'componentToHex',
        value: function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
    }, {
        key: 'rgbToHex',
        value: function rgbToHex(r, g, b) {
            var hexR = this.componentToHex(r);
            var hexG = this.componentToHex(g);
            var hexB = this.componentToHex(b);
            return '#' + hexR + hexG + hexB;
        }
    }, {
        key: 'hexIntToRgb',
        value: function hexIntToRgb(hex) {
            var r = hex >> 16;
            var g = hex >> 8 & 0xFF;
            var b = hex & 0xFF;
            return _glMatrix.vec3.fromValues(r, g, b);
        }
    }, {
        key: 'hexStringToRgb',
        value: function hexStringToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? _glMatrix.vec3.fromValues(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
        }
    }, {
        key: 'r',
        set: function set(value) {
            this.v[0] = value;
        },
        get: function get() {
            return this.v[0];
        }
    }, {
        key: 'g',
        set: function set(value) {
            this.v[1] = value;
        },
        get: function get() {
            return this.v[1];
        }
    }, {
        key: 'b',
        set: function set(value) {
            this.v[2] = value;
        },
        get: function get() {
            return this.v[2];
        }
    }]);

    return Color;
}();

exports.default = Color;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.clamp = clamp;
exports.lerp = lerp;
exports.barycoordFromPoint = barycoordFromPoint;
exports.randomSpherePoint = randomSpherePoint;
exports.from3DTo2D = from3DTo2D;

var _glMatrix = __webpack_require__(1);

var _Vector = __webpack_require__(14);

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = __webpack_require__(2);

var _Vector4 = _interopRequireDefault(_Vector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
function radToDeg(radians) {
    return radians * (180 / Math.PI);
}
function clamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
function lerp(min, max, alpha) {
    return min + (max - min) * alpha;
}
function barycoordFromPoint(point, a, b, c) {
    var v0 = _glMatrix.vec3.create();
    var v1 = _glMatrix.vec3.create();
    var v2 = _glMatrix.vec3.create();
    _glMatrix.vec3.sub(v0, c, a);
    _glMatrix.vec3.sub(v1, b, a);
    _glMatrix.vec3.sub(v2, point, a);
    var dot00 = _glMatrix.vec3.dot(v0, v0);
    var dot01 = _glMatrix.vec3.dot(v0, v1);
    var dot02 = _glMatrix.vec3.dot(v0, v2);
    var dot11 = _glMatrix.vec3.dot(v1, v1);
    var dot12 = _glMatrix.vec3.dot(v1, v2);
    var denom = dot00 * dot11 - dot01 * dot01;
    var result = new _Vector4.default();
    // collinear or singular triangle
    if (denom === 0) {
        // arbitrary location outside of triangle?
        // not sure if this is the best idea, maybe should be returning undefined
        return result.set(-2, -1, -1);
    }
    var invDenom = 1 / denom;
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // barycentric coordinates must always sum to 1
    return result.set(1 - u - v, v, u);
}
/*
http://stackoverflow.com/questions/5531827/random-point-on-a-given-sphere
    */
function randomSpherePoint(x0, y0, z0, radius) {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    var z = z0 + radius * Math.cos(phi);
    return [x, y, z];
}
// https://github.com/hughsk/from-3d-to-2d/blob/master/index.js
function from3DTo2D(position, pVMatrix) {
    var ix = position.x;
    var iy = position.y;
    var iz = position.z;
    var ox = pVMatrix[0] * ix + pVMatrix[4] * iy + pVMatrix[8] * iz + pVMatrix[12];
    var oy = pVMatrix[1] * ix + pVMatrix[5] * iy + pVMatrix[9] * iz + pVMatrix[13];
    var ow = pVMatrix[3] * ix + pVMatrix[7] * iy + pVMatrix[11] * iz + pVMatrix[15];
    var screenPosition = new _Vector2.default();
    screenPosition.x = (ox / ow + 1) / 2;
    screenPosition.y = 1 - (oy / ow + 1) / 2;
    return screenPosition;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var enabled = true;
var log = exports.log = function log() {
    if (!window.console || !console.log) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.log, console);
}();
var clear = exports.clear = function clear() {
    if (!window.console || !console.clear) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.clear, console);
}();
var debug = exports.debug = function debug() {
    if (!window.console || !console.debug) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.debug, console);
}();
var info = exports.info = function info() {
    if (!window.console || !console.info) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.info, console);
}();
var warn = exports.warn = function warn() {
    if (!window.console || !console.warn) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.warn, console);
}();
var error = exports.error = function error() {
    if (!window.console || !console.error) {
        return function () {
            return;
        };
    }
    if (!enabled) return function () {
        return;
    };
    return Function.prototype.bind.call(console.error, console);
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
    function Vector2() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Vector2);

        this.v = _glMatrix.vec2.create();
        this.set(x, y);
        return this;
    }

    _createClass(Vector2, [{
        key: 'set',
        value: function set(x, y) {
            _glMatrix.vec2.set(this.v, x, y);
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Vector2(this.v[0], this.v[1]);
        }
    }, {
        key: 'copy',
        value: function copy(vector2) {
            _glMatrix.vec2.copy(this.v, vector2.v);
            return this;
        }
    }, {
        key: 'add',
        value: function add(vector2) {
            _glMatrix.vec2.add(this.v, this.v, vector2.v);
            return this;
        }
    }, {
        key: 'subtract',
        value: function subtract(vector2) {
            _glMatrix.vec2.subtract(this.v, this.v, vector2.v);
            return this;
        }
    }, {
        key: 'subtractVectors',
        value: function subtractVectors(vector0, vector1) {
            var out = _glMatrix.vec2.create();
            _glMatrix.vec2.subtract(out, vector0.v, vector1.v);
            return out;
        }
    }, {
        key: 'scale',
        value: function scale(value) {
            _glMatrix.vec2.scale(this.v, this.v, value);
            return this;
        }
    }, {
        key: 'distance',
        value: function distance(vector2) {
            return _glMatrix.vec2.distance(this.v, vector2.v);
        }
    }, {
        key: 'length',
        value: function length() {
            return _glMatrix.vec2.length(this.v);
        }
    }, {
        key: 'negate',
        value: function negate() {
            _glMatrix.vec2.negate(this.v, this.v);
            return this;
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            _glMatrix.vec2.normalize(this.v, this.v);
            return this;
        }
    }, {
        key: 'lerp',
        value: function lerp(vector2, value) {
            _glMatrix.vec2.lerp(this.v, this.v, vector2.v, value);
            return this;
        }
    }, {
        key: 'equals',
        value: function equals(vector2) {
            return _glMatrix.vec2.equals(this.v, vector2.v);
        }
    }, {
        key: 'x',
        set: function set(value) {
            this.v[0] = value;
        },
        get: function get() {
            return this.v[0];
        }
    }, {
        key: 'y',
        set: function set(value) {
            this.v[1] = value;
        },
        get: function get() {
            return this.v[1];
        }
    }]);

    return Vector2;
}();

exports.default = Vector2;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageData = function ImageData(width, height, data) {
    _classCallCheck(this, ImageData);

    this.width = width;
    this.height = height;
    this.data = data;
};

exports.default = ImageData;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setup = setup;
exports.updateProjectionView = updateProjectionView;

var _glMatrix = __webpack_require__(1);

var _UniformBuffer = __webpack_require__(24);

var _UniformBuffer2 = _interopRequireDefault(_UniformBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Global uniform buffers
var uniformBuffers = {};
// Create buffers when gl context is ready
function setup() {
    // ProjectionView
    var projectionViewData = new Float32Array([].concat(_toConsumableArray(_glMatrix.mat4.create()), _toConsumableArray(_glMatrix.mat4.create())));
    uniformBuffers.projectionView = new _UniformBuffer2.default(projectionViewData);
}
// Update projectionView buffer data
var projectionViewData = void 0;
function updateProjectionView(gl, projectionMatrix, modelViewMatrix) {
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.buffer);
    gl.bindBuffer(gl.UNIFORM_BUFFER, uniformBuffers.projectionView.buffer);
    projectionViewData = [].concat(_toConsumableArray(projectionMatrix), _toConsumableArray(modelViewMatrix));
    uniformBuffers.projectionView.data.set(projectionViewData, 0);
    gl.bufferSubData(gl.UNIFORM_BUFFER, 0, uniformBuffers.projectionView.data);
    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
}
exports.default = uniformBuffers;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var structEs300 = "\n\tstruct PointLight {\n\t\tvec4 position;\n\t\tvec4 color;\n\t\tvec4 specularColor;\n\t\tvec4 shininess;\n\t\tvec4 intensity;\n\t};\n\tuniform PointLights {\n\t\tPointLight uPointLights[#HOOK_POINT_LIGHTS];\n\t};\n";
var pointLightsOutEs300 = "\n\t" + structEs300 + "\n\tout vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];\n\tout vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];\n";
var pointLightsInEs300 = "\n\t" + structEs300 + "\n\tin vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];\n\tin vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];\n";
var pointLightsEs100 = "\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tvec3 specularColor;\n\t\tfloat shininess;\n\t\tfloat intensity;\n\t};\n\tuniform PointLight uPointLights[#HOOK_POINT_LIGHTS];\n\tvarying vec3 vPointLightSurfaceToLightDirection[#HOOK_POINT_LIGHTS];\n\tvarying vec3 vPointLightSurfaceToCameraDirection[#HOOK_POINT_LIGHTS];\n";
exports.pointLightsOutEs300 = pointLightsOutEs300;
exports.pointLightsInEs300 = pointLightsInEs300;
exports.pointLightsEs100 = pointLightsEs100;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  "function" === typeof define && define.amd ? define(factory) :
  global.Happens = factory();
}(this, function () {

  'use strict'

  /**
   * Module constructor
   * @param  {Object} target Target object to extends methods and properties into
   * @return {Object}        Target after with extended methods and properties
   */
  function Happens(target){
    var nu = this instanceof Happens;
    if(target){
      if(!nu)
        for(var prop in Happens.prototype)
          target[prop] = Happens.prototype[prop];
      else
        throw new Error("You can't pass a target when instantiating with the `new` keyword");
    }
    else if(!nu)
      return new Happens
  };

  /**
   * Initializes event
   * @param  {String} event Event name to initialize
   * @return {Array}        Initialized event pool
   */
  Happens.prototype.__init = function(event) {
    var tmp = this.__listeners || (this.__listeners = []);
    return tmp[event] || (tmp[event] = []);
  };

  /**
   * Adds listener
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.on = function(event, fn) {
    validate(fn);
    this.__init(event).push(fn);
  };

  /**
   * Removes listener
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.off = function(event, fn) {
    var pool = this.__init(event);
    pool.splice(pool.indexOf(fn), 1);
  };

  /**
   * Add listener the fires once and auto-removes itself
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.once = function(event, fn) {
    validate(fn);
    var self = this, wrapper = function() {
      self.off(event, wrapper);
      fn.apply(this, arguments);
    };
    this.on(event, wrapper );
  };

  /**
   * Emit some event
   * @param  {String} event Event name -- subsequent params after `event` will
   * be passed along to the event's handlers
   */
  Happens.prototype.emit = function(event /*, arg1, arg2 */ ) {
    var i, pool = this.__init(event).slice(0);
    for(i in pool)
      pool[i].apply(this, [].slice.call(arguments, 1));
  };

  /**
   * Validates if a function exists and is an instanceof Function, and throws
   * an error if needed
   * @param  {Function} fn Function to validate
   */
  function validate(fn) {
    if(!(fn && fn instanceof Function))
      throw new Error(fn + ' is not a Function');
  }

  return Happens;
}));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axisAngle = 0;
var quaternionAxisAngle = _glMatrix.vec3.create();

var Object3D = function () {
    function Object3D() {
        _classCallCheck(this, Object3D);

        this.children = [];
        this.localMatrix = _glMatrix.mat4.create();
        this.modelMatrix = _glMatrix.mat4.create();
        this.position = new _Vector2.default();
        this.rotation = new _Vector2.default();
        this.scale = new _Vector2.default(1, 1, 1);
        this._quaternion = _glMatrix.quat.create();
        this.isObject3D = true;
    }

    _createClass(Object3D, [{
        key: 'updateMatrix',
        value: function updateMatrix() {
            // Reset
            _glMatrix.mat4.identity(this.localMatrix);
            _glMatrix.mat4.identity(this.modelMatrix);
            _glMatrix.quat.identity(this._quaternion);
            // If Object3D has a parent, copy the computed modelMatrix into localMatrix
            if (this.parent) {
                _glMatrix.mat4.copy(this.localMatrix, this.parent.modelMatrix);
                _glMatrix.mat4.multiply(this.modelMatrix, this.modelMatrix, this.localMatrix);
            }
            // Apply local transitions to modelMatrix
            _glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, this.position.v);
            _glMatrix.quat.rotateX(this._quaternion, this._quaternion, this.rotation.x);
            _glMatrix.quat.rotateY(this._quaternion, this._quaternion, this.rotation.y);
            _glMatrix.quat.rotateZ(this._quaternion, this._quaternion, this.rotation.z);
            axisAngle = _glMatrix.quat.getAxisAngle(quaternionAxisAngle, this._quaternion);
            _glMatrix.mat4.rotate(this.modelMatrix, this.modelMatrix, axisAngle, quaternionAxisAngle);
            _glMatrix.mat4.scale(this.modelMatrix, this.modelMatrix, this.scale.v);
        }
    }, {
        key: 'setParent',
        value: function setParent(parent) {
            this.unParent();
            if (parent.isObject3D) {
                parent.children.push(this);
                this.parent = parent;
            }
        }
    }, {
        key: 'unParent',
        value: function unParent() {
            if (this.parent === undefined) return;
            var objectIndex = this.parent.children.indexOf(this);
            if (objectIndex !== -1) {
                this.parent.children.splice(objectIndex, 1);
                this.parent = null;
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.unParent();
            this.children = [];
            this.localMatrix = null;
            this.modelMatrix = null;
            this.position = null;
            this.rotation = null;
            this.scale = null;
            this._quaternion = null;
            this.isObject3D = null;
        }
    }]);

    return Object3D;
}();

exports.default = Object3D;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Capabilities = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var Vao = function () {
    function Vao() {
        _classCallCheck(this, Vao);

        gl = GL.get();
        if (gl instanceof WebGL2RenderingContext) {
            this.vao = gl.createVertexArray();
        } else if (_Capabilities.extensions.vertexArrayObject) {
            this.vao = _Capabilities.extensions.vertexArrayObject.createVertexArrayOES();
        }
    }

    _createClass(Vao, [{
        key: 'bind',
        value: function bind() {
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(this.vao);
            } else if (_Capabilities.extensions.vertexArrayObject) {
                _Capabilities.extensions.vertexArrayObject.bindVertexArrayOES(this.vao);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(null);
            } else if (_Capabilities.extensions.vertexArrayObject) {
                _Capabilities.extensions.vertexArrayObject.bindVertexArrayOES(null);
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            if (gl instanceof WebGL2RenderingContext) {
                gl.deleteVertexArray(this.vao);
            } else if (_Capabilities.extensions.vertexArrayObject) {
                _Capabilities.extensions.vertexArrayObject.deleteVertexArrayOES(this.vao);
            }
            this.vao = null;
        }
    }]);

    return Vao;
}();

exports.default = Vao;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var BufferAttribute = function () {
    function BufferAttribute(type, data, itemSize) {
        var shaderAttribute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        _classCallCheck(this, BufferAttribute);

        this.type = type;
        this.itemSize = itemSize;
        this.numItems = data.length / itemSize;
        this.buffer = GL.createBuffer(type, data);
        this.shaderAttribute = shaderAttribute;
    }

    _createClass(BufferAttribute, [{
        key: 'bind',
        value: function bind() {
            gl = GL.get();
            gl.bindBuffer(this.type, this.buffer);
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            gl = GL.get();
            gl.bindBuffer(this.type, null);
        }
    }, {
        key: 'update',
        value: function update(data) {
            this.bind();
            gl = GL.get();
            gl.bufferSubData(this.type, 0, data);
            this.unbind();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            gl = GL.get();
            gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }]);

    return BufferAttribute;
}();

exports.default = BufferAttribute;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _glMatrix = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var diff = _glMatrix.vec3.create();
var edge1 = _glMatrix.vec3.create();
var edge2 = _glMatrix.vec3.create();
var normal = _glMatrix.vec3.create();

var Ray = function () {
    function Ray() {
        _classCallCheck(this, Ray);

        this.origin = new _Vector2.default();
        this.direction = new _Vector2.default();
    }

    _createClass(Ray, [{
        key: 'set',
        value: function set(origin, direction) {
            this.origin.copy(origin);
            this.direction.copy(direction);
        }
    }, {
        key: 'intersectTriangle',
        value: function intersectTriangle(a, b, c) {
            var culling = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            _glMatrix.vec3.sub(edge1, b.v, a.v);
            _glMatrix.vec3.sub(edge2, c.v, a.v);
            _glMatrix.vec3.cross(normal, edge1, edge2);
            // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
            // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
            //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
            //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
            //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
            // console.log('normal', normal);
            var DdN = _glMatrix.vec3.dot(this.direction.v, normal);
            var sign = void 0;
            // console.log('normal', normal);
            if (DdN > 0) {
                if (culling) return null;
                sign = 1;
            } else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            } else {
                return null;
            }
            _glMatrix.vec3.sub(diff, this.origin.v, a.v);
            _glMatrix.vec3.cross(edge2, diff, edge2);
            var DdQxE2 = sign * _glMatrix.vec3.dot(this.direction.v, edge2);
            // b1 < 0, no intersection
            if (DdQxE2 < 0) {
                return null;
            }
            _glMatrix.vec3.cross(edge1, edge1, diff);
            var DdE1xQ = sign * _glMatrix.vec3.dot(this.direction.v, edge1);
            // b2 < 0, no intersection
            if (DdE1xQ < 0) {
                return null;
            }
            // b1+b2 > 1, no intersection
            if (DdQxE2 + DdE1xQ > DdN) {
                return null;
            }
            // Line intersects triangle, check if ray does.
            var QdN = -sign * _glMatrix.vec3.dot(diff, normal);
            // t < 0, no intersection
            if (QdN < 0) {
                return null;
            }
            var result = new _Vector2.default();
            result.copy(this.direction).scale(QdN / DdN).add(this.origin);
            return result;
        }
    }]);

    return Ray;
}();

exports.default = Ray;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    try {
        var renderingContext = WebGLRenderingContext;
        var canvasWebgl = document.createElement('canvas');
        var canvasWebg2 = document.createElement('canvas');
        var webgl2Context = canvasWebg2.getContext('webgl2');
        var webglContext = canvasWebgl.getContext('webgl') || canvasWebgl.getContext('experimental-webgl');
        if (renderingContext === undefined) {
            return false;
        }
        return {
            webgl: !!webglContext,
            webgl2: !!webgl2Context
        };
    } catch (error) {
        return false;
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UniformBuffer = function () {
    function UniformBuffer(data) {
        _classCallCheck(this, UniformBuffer);

        this.data = data;
        this.buffer = (0, _GL.createUniformBuffer)(data);
    }

    _createClass(UniformBuffer, [{
        key: 'setValues',
        value: function setValues(values) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.data.set(values, offset);
        }
    }]);

    return UniformBuffer;
}();

exports.default = UniformBuffer;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = function () {
    function Light() {
        _classCallCheck(this, Light);
    }

    _createClass(Light, [{
        key: "update",
        value: function update() {
            return;
        }
    }, {
        key: "setValues",
        value: function setValues(values) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.data.set(values, offset);
        }
    }]);

    return Light;
}();

exports.default = Light;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HdrLoader;

var _parseHdr = __webpack_require__(78);

var _parseHdr2 = _interopRequireDefault(_parseHdr);

var _ImageData = __webpack_require__(15);

var _ImageData2 = _interopRequireDefault(_ImageData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HdrLoader(src) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.responseType = 'arraybuffer';
        req.onreadystatechange = function () {
            if (req.readyState !== 4) return;
            if (req.readyState === 4 && req.status === 200) {
                var hdr = (0, _parseHdr2.default)(req.response);
                var image = new _ImageData2.default(hdr.shape[0], hdr.shape[1], hdr.data);
                resolve(image);
            } else {
                reject(req.status);
            }
        };
        req.open('GET', src, true);
        req.send();
    });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ImageLoader;
function ImageLoader(src) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.onerror = function () {
            reject("Failed to load " + src);
        };
        image.src = src;
    });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var whenEquals = exports.whenEquals = "\nfloat whenEquals(float x, float y) {\n  return 1.0 - abs(sign(x - y));\n};\n";
var whenEqualsInt = exports.whenEqualsInt = "\nint whenEqualsInt(int x, int y) {\n  return 1 - abs(sign(x - y));\n}\n";
var whenLessThan = exports.whenLessThan = "\nfloat whenLessThan(float x, float y) {\n  return max(sign(y - x), 0.0);\n}\n";
var whenGreaterThan = exports.whenGreaterThan = "\nfloat whenGreaterThan(float x, float y) {\n  return max(sign(x - y), 0.0);\n}\n";
exports.default = {
  whenEquals: whenEquals,
  whenEqualsInt: whenEqualsInt,
  whenLessThan: whenLessThan,
  whenGreaterThan: whenGreaterThan
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var directionalLightsEs300 = "\n\tstruct DirectionalLight {\n\t\tvec4 position;\n\t\tvec4 color;\n\t\tvec4 intensity;\n\t};\n\tuniform DirectionalLights {\n\t\tDirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];\n\t};\n";
var directionalLightsEs100 = "\n\tstruct DirectionalLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat intensity;\n\t};\n\tuniform DirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];\n";
exports.directionalLightsEs300 = directionalLightsEs300;
exports.directionalLightsEs100 = directionalLightsEs100;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var definePI = exports.definePI = "\n#define PI 3.141592653589793\n";
var definePITwo = exports.definePITwo = "\n#define TWO_PI 6.283185307179586\n";
var mapLinear = exports.mapLinear = "\nfloat mapLinear(float value, float in_min, float in_max, float out_min, float out_max) {\n\treturn (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;\n}\n";
exports.default = {
    definePI: definePI,
    definePITwo: definePITwo,
    mapLinear: mapLinear
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
};

/*
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
};


module.exports = mat3;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
};

module.exports = vec3;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

module.exports = vec4;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(12);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MODE_DRAG = 'MODE_DRAG';
var MODE_PAN = 'MODE_PAN';
var MODE_ZOOM = 'MODE_ZOOM';
var UP = new _Vector2.default(0, 1, 0);

var OrbitControls = function () {
    function OrbitControls(camera, element) {
        var _this = this;

        _classCallCheck(this, OrbitControls);

        this._onTouchStart = function (event) {
            event.preventDefault();
            if (event.touches) {
                // Device
                switch (event.touches.length) {
                    case 1:
                        _this._mode = MODE_DRAG;
                        _this._offsetY = _this._rotationY;
                        _this._offsetX = _this._rotationX;
                        break;
                    case 2:
                        {
                            _this._mode = MODE_ZOOM;
                            _this._radiusOffset = _this._radius;
                            break;
                        }
                    default:
                        {
                            _this._mode = MODE_PAN;
                            _this._offsetY = _this.target.y;
                            _this._offsetX = _this.target.x;
                        }
                }
            } else {
                // Desktop
                switch (event.which) {
                    case 3:
                        _this._mode = MODE_PAN;
                        _this._offsetY = _this.target.y;
                        _this._offsetX = _this.target.x;
                        break;
                    default:
                        {
                            _this._mode = MODE_DRAG;
                            _this._offsetY = _this._rotationY;
                            _this._offsetX = _this._rotationX;
                        }
                }
            }
            _this._startY = event.pageX / _this._width;
            _this._startX = event.pageY / _this._height;
            _this._targetOffset.copy(_this.target);
            _this._radiusOffset = _this._radius;
            _this.isDown = true;
        };
        this._onTouchMove = function (event) {
            if (_this.isDown) {
                switch (_this._mode) {
                    case MODE_PAN:
                        {
                            var y = event.pageX / _this._width;
                            var x = event.pageY / _this._height;
                            _this._direction.copy(_this._camera.position).subtract(_this.target).normalize();
                            var cross = _this._direction.cross(UP);
                            var tx = _this._targetOffset.x + -(_this._startY - y) * _this.panSpeed * cross.x;
                            var ty = _this._targetOffset.y + -(_this._startX - x) * _this.panSpeed;
                            var tz = _this._targetOffset.z + -(_this._startY - y) * _this.panSpeed * cross.z;
                            _this.target.set(tx, ty, tz);
                            break;
                        }
                    case MODE_ZOOM:
                        {
                            var dx = event.touches[0].pageX - event.touches[1].pageX;
                            var dy = event.touches[0].pageY - event.touches[1].pageY;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            var sign = _this._lastZoomDistance > distance ? 1 : -1;
                            // Simulate the same data as the scroll
                            _this._zoomConstraint(sign * 100);
                            _this._lastZoomDistance = distance;
                            break;
                        }
                    default:
                        {
                            // Drag
                            var _y = event.pageX / _this._width;
                            var _x = event.pageY / _this._height;
                            _this._rotationX = _this._offsetX + -(_this._startX - _x) * _this.rotationSpeed;
                            _this._rotationY = _this._offsetY + (_this._startY - _y) * _this.rotationSpeed;
                            _this._rotationX = (0, _Utils.clamp)(_this._rotationX, -Math.PI / 2, Math.PI / 2);
                        }
                }
                _this.update();
            }
        };
        this._onTouchEnd = function () {
            _this.isDown = false;
        };
        this._onContextMenu = function (event) {
            event.preventDefault();
        };
        this._onMouseWheel = function (event) {
            var delta = 0;
            if (event.wheelDelta) {
                // Webkit, Opera, Explorer
                delta = event.wheelDelta;
            } else if (event.detail) {
                // Firefox
                delta = event.detail;
            }
            _this._zoomConstraint(-delta);
        };
        this._onKeypress = function (event) {
            switch (event.keyCode) {
                case 114:
                    // Reset
                    _this.reset();
                    break;
                default:
            }
        };
        this.rotationSpeed = 5;
        this.panSpeed = 10;
        this._camera = camera;
        this._element = element;
        this._zoomMin = 0.1;
        this._zoomMax = Infinity;
        this._radius = Math.max(camera.position.x, camera.position.z);
        this._radiusOffset = 0;
        this._defaultRadius = Math.max(camera.position.x, camera.position.z);
        this._rotationX = Math.atan2(camera.position.y - 0, +this._radius - 0);
        this._rotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
        this._defaultRotationX = Math.atan2(camera.position.y - 0, +this._radius - 0);
        this._defaultRotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
        this._offsetX = 0;
        this._offsetY = 0;
        this._offsetPanX = 0;
        this._offsetPanY = 0;
        this.target = new _Vector2.default();
        this._targetOffset = new _Vector2.default();
        this._direction = new _Vector2.default();
        this._lastZoomDistance = 0;
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._element.addEventListener('mousedown', this._onTouchStart, false);
        this._element.addEventListener('mousemove', this._onTouchMove, false);
        this._element.addEventListener('mouseup', this._onTouchEnd, false);
        this._element.addEventListener('touchstart', this._onTouchStart, false);
        this._element.addEventListener('touchmove', this._onTouchMove, false);
        this._element.addEventListener('touchend', this._onTouchEnd, false);
        this._element.addEventListener('contextmenu', this._onContextMenu, false);
        window.addEventListener('mousewheel', this._onMouseWheel, false);
        window.addEventListener('keypress', this._onKeypress, false);
    }

    _createClass(OrbitControls, [{
        key: '_zoomConstraint',
        value: function _zoomConstraint(delta) {
            var value = delta / 1000;
            var speed = 3;
            this._radius += value * speed;
            this._radius = (0, _Utils.clamp)(this._radius, this._zoomMin, this._zoomMax);
            this.update();
        }
    }, {
        key: 'update',
        value: function update() {
            var y = this._radius * Math.sin(this._rotationX);
            var r = this._radius * Math.cos(this._rotationX); // radius of the sphere
            var x = Math.sin(this._rotationY) * r;
            var z = Math.cos(this._rotationY) * r;
            this._camera.position.set(x, y, z).add(this.target);
            this._camera.lookAt(this.target.x, this.target.y, this.target.z);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.target.set(0, 0, 0);
            this._rotationY = this._defaultRotationY;
            this._rotationX = this._defaultRotationX;
            this._radius = this._defaultRadius;
            this.update();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._element.removeEventListener('mousedown', this._onTouchStart);
            this._element.removeEventListener('mousemove', this._onTouchMove);
            this._element.removeEventListener('mouseup', this._onTouchEnd);
            this._element.removeEventListener('touchstart', this._onTouchStart);
            this._element.removeEventListener('touchmove', this._onTouchMove);
            this._element.removeEventListener('touchend', this._onTouchEnd);
            this._element.removeEventListener('contextmenu', this._onContextMenu);
            window.removeEventListener('mousewheel', this._onMouseWheel);
            window.removeEventListener('keypress', this._onKeypress);
            this._camera = null;
            this._element = null;
        }
    }]);

    return OrbitControls;
}();

exports.default = OrbitControls;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrthographicCamera = function () {
    function OrthographicCamera(options) {
        _classCallCheck(this, OrthographicCamera);

        this.projectionMatrix = _glMatrix.mat4.create();
        this.isOrthographicCamera = true;
        this.isPespectiveCamera = false;
        this.near = 0.1;
        this.far = 100;
        this.fov = 65;
        this.position = new _Vector2.default();
        this.center = new _Vector2.default();
        this.up = new _Vector2.default(0, 1, 0);
        Object.assign(this, options);
    }

    _createClass(OrthographicCamera, [{
        key: 'lookAt',
        value: function lookAt() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.center.set(x, y, z);
        }
    }, {
        key: 'updateProjectionMatrix',
        value: function updateProjectionMatrix() {
            _glMatrix.mat4.ortho(this.projectionMatrix, -1.0, 1.0, -1.0, 1.0, this.near, this.far);
        }
    }]);

    return OrthographicCamera;
}();

exports.default = OrthographicCamera;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Constants = __webpack_require__(7);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PerspectiveCamera = function () {
    function PerspectiveCamera(options) {
        _classCallCheck(this, PerspectiveCamera);

        this.projectionMatrix = _glMatrix.mat4.create();
        this.isPespectiveCamera = true;
        this.isOrthographicCamera = false;
        this.near = 0.1;
        this.far = 100;
        this.fov = 70;
        this.ratio = _Constants.RENDERER_DEFAULT_RATIO;
        this.position = new _Vector2.default();
        this.center = new _Vector2.default();
        this.up = new _Vector2.default(0, 1, 0);
        Object.assign(this, options);
    }

    _createClass(PerspectiveCamera, [{
        key: 'lookAt',
        value: function lookAt() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            this.center.set(x, y, z);
        }
    }, {
        key: 'updateProjectionMatrix',
        value: function updateProjectionMatrix() {
            _glMatrix.mat4.perspective(this.projectionMatrix, this.fov, this.ratio, this.near, this.far);
        }
    }]);

    return PerspectiveCamera;
}();

exports.default = PerspectiveCamera;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = __webpack_require__(14);

var _Vector4 = _interopRequireDefault(_Vector3);

var _Ray = __webpack_require__(22);

var _Ray2 = _interopRequireDefault(_Ray);

var _Utils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inversedProjectionMatrix = _glMatrix.mat4.create();
var cameraDirection = _glMatrix.vec3.create();
var directionVector = new _Vector2.default();
var face = void 0;
var barycoord = void 0;
var fvA = new _Vector2.default();
var fvB = new _Vector2.default();
var fvC = new _Vector2.default();
var uvA = new _Vector4.default();
var uvB = new _Vector4.default();
var uvC = new _Vector4.default();

var RayCaster = function () {
    function RayCaster(origin, direction, near, far) {
        _classCallCheck(this, RayCaster);

        this.ray = new _Ray2.default();
        this.near = near || 0;
        this.far = far || Infinity;
    }

    _createClass(RayCaster, [{
        key: 'setFromCamera',
        value: function setFromCamera(coords, scene, camera) {
            if (camera && camera.isPespectiveCamera) {
                this.ray.origin.copy(camera.position);
                _glMatrix.vec3.copy(cameraDirection, [coords.x, coords.y, 0.5]);
                _glMatrix.mat4.multiply(inversedProjectionMatrix, camera.projectionMatrix, scene.modelViewMatrix);
                _glMatrix.mat4.invert(inversedProjectionMatrix, inversedProjectionMatrix);
                _glMatrix.vec3.transformMat4(cameraDirection, cameraDirection, inversedProjectionMatrix);
                _glMatrix.vec3.sub(cameraDirection, cameraDirection, camera.position.v);
                _glMatrix.vec3.normalize(cameraDirection, cameraDirection);
                directionVector.set(cameraDirection[0], cameraDirection[1], cameraDirection[2]);
                this.ray.direction.copy(directionVector);
            }
        }
    }, {
        key: 'uvIntersection',
        value: function uvIntersection(point, v0, v1, v2) {
            barycoord = (0, _Utils.barycoordFromPoint)(point.v, v0.v, v1.v, v2.v);
            uvA.scale(barycoord.x);
            uvB.scale(barycoord.y);
            uvC.scale(barycoord.z);
            uvA.add(uvB).add(uvC);
            return uvA.clone();
        }
    }, {
        key: 'intersectObject',
        value: function intersectObject(object) {
            var intersect = void 0;
            var uv = void 0;
            for (var i = 0; i < object.geometry.faces.length; i += 1) {
                face = object.geometry.faces[i];
                _glMatrix.vec3.copy(fvA.v, face.vertices[0].v);
                _glMatrix.vec3.copy(fvB.v, face.vertices[1].v);
                _glMatrix.vec3.copy(fvC.v, face.vertices[2].v);
                // Multiply vertices by object matrix
                _glMatrix.vec3.transformMat4(fvA.v, fvA.v, object.modelMatrix);
                _glMatrix.vec3.transformMat4(fvB.v, fvB.v, object.modelMatrix);
                _glMatrix.vec3.transformMat4(fvC.v, fvC.v, object.modelMatrix);
                intersect = this.ray.intersectTriangle(fvA, fvB, fvC);
                if (intersect) {
                    // Get uv intersection
                    _glMatrix.vec2.copy(uvA.v, object.geometry.uvs[face.uvs[0]].v);
                    _glMatrix.vec2.copy(uvB.v, object.geometry.uvs[face.uvs[1]].v);
                    _glMatrix.vec2.copy(uvC.v, object.geometry.uvs[face.uvs[2]].v);
                    uv = this.uvIntersection(intersect, fvA, fvB, fvC);
                    break;
                }
            }
            return intersect ? {
                point: intersect,
                uv: uv
            } : null;
        }
    }]);

    return RayCaster;
}();

exports.default = RayCaster;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _glMatrix = __webpack_require__(1);

var _UniformBuffers = __webpack_require__(16);

var UniformBuffers = _interopRequireWildcard(_UniformBuffers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var RenderTarget = function () {
    function RenderTarget(options) {
        _classCallCheck(this, RenderTarget);

        this.pixelRatio = options.pixelRatio || 1;
        this.width = options.width * this.pixelRatio;
        this.height = options.height * this.pixelRatio;
        this.ratio = this.width / this.height;
        this.viewport = {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        };
        this.autoClear = true;
        this.setClearColor();
        gl = GL.get();
        this._frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        // gl.generateMipmap(gl.TEXTURE_2D);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        this._renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    _createClass(RenderTarget, [{
        key: 'setClearColor',
        value: function setClearColor() {
            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            gl = GL.get();
            gl.clearColor(r, g, b, a);
        }
    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            var newWidth = width * this.pixelRatio;
            var newHeight = height * this.pixelRatio;
            if (newWidth !== this.width || newHeight !== this.height) {
                this.width = width * this.pixelRatio;
                this.height = height * this.pixelRatio;
                this.ratio = this.width / this.height;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                gl.bindTexture(gl.TEXTURE_2D, null);
                gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                this.setViewport(0, 0, width, height);
            }
        }
    }, {
        key: 'setSissorTest',
        value: function setSissorTest() {
            var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            gl = GL.get();
            if (enable) {
                gl.enable(gl.SCISSOR_TEST);
            } else {
                gl.disable(gl.SCISSOR_TEST);
            }
        }
    }, {
        key: 'setSissor',
        value: function setSissor(x, y, width, height) {
            gl = GL.get();
            gl.scissor(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }, {
        key: 'setViewport',
        value: function setViewport(x, y, width, height) {
            this.viewport.x = x * this.pixelRatio;
            this.viewport.y = y * this.pixelRatio;
            this.viewport.width = width * this.pixelRatio;
            this.viewport.height = height * this.pixelRatio;
        }
    }, {
        key: 'render',
        value: function render(scene, camera) {
            gl = GL.get();
            gl.viewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
            if (this.autoClear) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }
            _glMatrix.mat4.identity(scene.modelViewMatrix);
            _glMatrix.mat4.lookAt(scene.modelViewMatrix, camera.position.v, camera.center.v, camera.up.v);
            // Update the scene
            scene.update();
            if (gl instanceof WebGL2RenderingContext) {
                // Update global uniform buffers
                UniformBuffers.updateProjectionView(gl, camera.projectionMatrix, scene.modelViewMatrix);
            }
            // Render the scene objects
            scene.objects.forEach(function (child) {
                if (child.isInstanced) {
                    child.drawInstance(scene.modelViewMatrix, camera.projectionMatrix, camera);
                } else {
                    child.draw(scene.modelViewMatrix, camera.projectionMatrix, camera);
                }
            });
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
            // Reset
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }]);

    return RenderTarget;
}();

exports.default = RenderTarget;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _glMatrix = __webpack_require__(1);

var _Console = __webpack_require__(13);

var _Constants = __webpack_require__(7);

var _Capabilities = __webpack_require__(3);

var Capabilities = _interopRequireWildcard(_Capabilities);

var _UniformBuffers = __webpack_require__(16);

var UniformBuffers = _interopRequireWildcard(_UniformBuffers);

var _Detect = __webpack_require__(23);

var _Detect2 = _interopRequireDefault(_Detect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(77);
var gl = void 0;

var Renderer = function () {
    function Renderer(options) {
        _classCallCheck(this, Renderer);

        // Default renderer settings
        this.width = _Constants.RENDERER_DEFAULT_WIDTH;
        this.height = _Constants.RENDERER_DEFAULT_HEIGHT;
        this.ratio = _Constants.RENDERER_DEFAULT_WIDTH / _Constants.RENDERER_DEFAULT_HEIGHT;
        this.preserveDrawingBuffer = false;
        this.pixelRatio = 1;
        this.prefferedContext = _Constants.RENDERER_DEFAULT_CONTEXT;
        this.autoClear = true;
        // Apply defaults
        Object.assign(this, options);
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // Try initialising gl
        var attributes = {
            preserveDrawingBuffer: this.preserveDrawingBuffer
        };
        var detect = (0, _Detect2.default)();
        if (detect) {
            var contextType = void 0;
            if (detect.webgl2 && this.prefferedContext === _Constants.WEBGL2_CONTEXT) {
                contextType = _Constants.WEBGL2_CONTEXT;
                var _gl = this.canvas.getContext('webgl2', attributes);
                GL.set(_gl, contextType);
            } else {
                contextType = _Constants.WEBGL_CONTEXT;
                var _gl2 = this.canvas.getContext('webgl', attributes) || this.canvas.getContext('experimental-webgl', attributes);
                GL.set(_gl2, contextType);
            }
        } else {
            (0, _Console.warn)('Webgl not supported');
            return;
        }
        (0, _Console.log)('%c' + config.name + ' ' + config.version + ' webgl' + (GL.webgl2 ? 2 : ''), 'padding: 1px; background: #222; color: #ff00ff');
        gl = GL.get();
        // Log Capabilities of gpu
        Capabilities.set(gl);
        // Setup global uniform buffers
        if (GL.webgl2) {
            UniformBuffers.setup();
        }
        // log("capabilities", Capabilities.capabilities);
        // log("extensions", Capabilities.extensions);
        this.viewport = {
            x: 0,
            y: 0,
            width: gl.drawingBufferWidth,
            height: gl.drawingBufferHeight
        };
        this.setClearColor();
        gl.enable(gl.DEPTH_TEST);
    }

    _createClass(Renderer, [{
        key: 'setClearColor',
        value: function setClearColor() {
            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

            gl = GL.get();
            gl.clearColor(r, g, b, a);
        }
    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            var newWidth = width * this.pixelRatio;
            var newHeight = height * this.pixelRatio;
            if (newWidth !== this.width || newHeight !== this.height) {
                this.width = width * this.pixelRatio;
                this.height = height * this.pixelRatio;
                this.ratio = this.width / this.height;
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.canvas.style.width = width + 'px';
                this.canvas.style.height = height + 'px';
                this.setViewport(0, 0, width, height);
            }
        }
    }, {
        key: 'setDevicePixelRatio',
        value: function setDevicePixelRatio() {
            var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.pixelRatio = ratio || 1;
            this.setSize(this.width, this.height);
        }
    }, {
        key: 'setSissorTest',
        value: function setSissorTest() {
            var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            gl = GL.get();
            if (enable) {
                gl.enable(gl.SCISSOR_TEST);
            } else {
                gl.disable(gl.SCISSOR_TEST);
            }
        }
    }, {
        key: 'setSissor',
        value: function setSissor(x, y, width, height) {
            gl = GL.get();
            gl.scissor(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }, {
        key: 'setViewport',
        value: function setViewport(x, y, width, height) {
            this.viewport.x = x * this.pixelRatio;
            this.viewport.y = y * this.pixelRatio;
            this.viewport.width = width * this.pixelRatio;
            this.viewport.height = height * this.pixelRatio;
        }
    }, {
        key: 'render',
        value: function render(scene, camera) {
            gl = GL.get();
            gl.viewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);
            if (this.autoClear) {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            }
            _glMatrix.mat4.identity(scene.modelViewMatrix);
            _glMatrix.mat4.lookAt(scene.modelViewMatrix, camera.position.v, camera.center.v, camera.up.v);
            // Update the scene
            scene.update();
            // Draw the scene objects
            if (gl instanceof WebGL2RenderingContext) {
                // Update global uniform buffers
                UniformBuffers.updateProjectionView(gl, camera.projectionMatrix, scene.modelViewMatrix);
            }
            // Render the scene objects
            scene.objects.forEach(function (child) {
                if (child.isInstanced) {
                    child.drawInstance(scene.modelViewMatrix, camera.projectionMatrix, camera);
                } else {
                    child.draw(scene.modelViewMatrix, camera.projectionMatrix, camera);
                }
            });
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
    function Scene() {
        _classCallCheck(this, Scene);

        this.objects = [];
        this.pointLights = undefined;
        this.directionalLights = undefined;
        this.modelViewMatrix = _glMatrix.mat4.create();
    }

    _createClass(Scene, [{
        key: 'add',
        value: function add(object) {
            this.objects.push(object);
        }
    }, {
        key: 'remove',
        value: function remove(object) {
            var dispose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var objectIndex = this.objects.indexOf(object);
            if (objectIndex !== -1) {
                this.objects.splice(objectIndex, 1);
                if (dispose) {
                    object.dispose();
                    object = undefined;
                }
            }
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.directionalLights) {
                this.directionalLights.update();
                this.directionalLights.bind();
            }
            if (this.pointLights) {
                this.pointLights.update();
                this.pointLights.bind();
            }
        }
    }]);

    return Scene;
}();

exports.default = Scene;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _happens = __webpack_require__(18);

var _happens2 = _interopRequireDefault(_happens);

var _ImageLoader = __webpack_require__(27);

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _HdrLoader = __webpack_require__(26);

var _HdrLoader2 = _interopRequireDefault(_HdrLoader);

var _ImageData = __webpack_require__(15);

var _ImageData2 = _interopRequireDefault(_ImageData);

var _Console = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var Texture = function () {
    function Texture(options) {
        var _this = this;

        _classCallCheck(this, Texture);

        this.onTextureLoaded = function (response) {
            _this.image = response;
            _this.update(_this.image);
            _this.emit('loaded');
        };
        this.onTextureError = function (error) {
            (0, _Console.warn)(error);
        };
        (0, _happens2.default)(this);
        gl = GL.get();
        this.src = '';
        this.magFilter = gl.NEAREST;
        this.minFilter = gl.NEAREST;
        this.wrapS = gl.CLAMP_TO_EDGE;
        this.wrapT = gl.CLAMP_TO_EDGE;
        this.resizeToPow2 = false;
        Object.assign(this, options);
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.placeholder());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this._isHdr = this.src.split('.').pop() === 'hdr';
        this.load(this.src);
    }

    _createClass(Texture, [{
        key: 'load',
        value: function load(src) {
            if (this._isHdr) {
                (0, _HdrLoader2.default)(src).then(this.onTextureLoaded).catch(this.onTextureError);
            } else {
                (0, _ImageLoader2.default)(src).then(this.onTextureLoaded).catch(this.onTextureError);
            }
        }
    }, {
        key: 'updateImage',
        value: function updateImage(src) {
            this.src = src || this.src;
            this.load(this.src);
        }
    }, {
        key: 'update',
        value: function update(image) {
            gl = GL.get();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            if (image instanceof _ImageData2.default && gl instanceof WebGL2RenderingContext) {
                // This is only for hdr data texture atm
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, image.width, image.height, 0, gl.RGBA, gl.FLOAT, image.data);
            } else {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._resizeImage());
            }
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }, {
        key: 'placeholder',
        value: function placeholder() {
            var canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas;
        }
    }, {
        key: '_resizeImage',
        value: function _resizeImage() {
            var _this2 = this;

            if (!this.resizeToPow2 || this.image instanceof _ImageData2.default) return this.image;
            // 2, 4, 8, 16... 4096
            var sizes = Array(12).fill(0).map(function (i, j) {
                return Math.pow(2, j + 1);
            });
            // Return if the image size is already a power of 2
            sizes.forEach(function (size) {
                if (_this2.image.width === size && _this2.image.height === size) {
                    return _this2.image;
                }
                return false;
            });
            var imageSize = Math.max(this.image.width, this.image.height);
            var size = sizes.reduce(function (prev, curr) {
                return Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev;
            });
            // Draw canvas with texture cropped inside
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(this.image, 0, 0, size, size);
            return canvas;
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            gl = GL.get();
            gl.deleteTexture(this.texture);
            this.texture = null;
        }
    }]);

    return Texture;
}();

exports.default = Texture;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _happens = __webpack_require__(18);

var _happens2 = _interopRequireDefault(_happens);

var _ImageLoader = __webpack_require__(27);

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _HdrLoader = __webpack_require__(26);

var _HdrLoader2 = _interopRequireDefault(_HdrLoader);

var _ImageData = __webpack_require__(15);

var _ImageData2 = _interopRequireDefault(_ImageData);

var _Console = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var TextureCube = function () {
    function TextureCube(options) {
        var _this = this;

        _classCallCheck(this, TextureCube);

        this.onTextureLoaded = function (response) {
            _this.images = response;
            _this.update(_this.images);
            _this.emit('loaded');
        };
        this.onTextureError = function (error) {
            (0, _Console.warn)(error);
        };
        (0, _happens2.default)(this);
        gl = GL.get();
        this.src = Array(6).fill('');
        this.magFilter = gl.LINEAR;
        this.minFilter = gl.LINEAR;
        this.wrapS = gl.CLAMP_TO_EDGE;
        this.wrapT = gl.CLAMP_TO_EDGE;
        this.resizeToPow2 = false;
        Object.assign(this, options);
        this.texture = gl.createTexture();
        this.images = [];
        this.loaders = [];
        this.update(this.placeholder());
        // Check media type
        this._isHdr = this.src[0].split('.').pop() === 'hdr';
        this.src.forEach(function (src, i) {
            _this.loaders[i] = _this.load(_this.src[i]);
        });
        Promise.all(this.loaders).then(this.onTextureLoaded).catch(this.onTextureError);
    }

    _createClass(TextureCube, [{
        key: 'load',
        value: function load(src) {
            if (this._isHdr) {
                return (0, _HdrLoader2.default)(src);
            } else {
                return (0, _ImageLoader2.default)(src);
            }
        }
    }, {
        key: 'update',
        value: function update(images) {
            gl = GL.get();
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
            var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
            for (var i = 0; i < 6; i += 1) {
                var image = this._isHdr ? images[i] : this._resizeImage(images[i]);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                if (image instanceof _ImageData2.default) {
                    if (gl instanceof WebGL2RenderingContext) {
                        gl.texImage2D(targets[i], 0, gl.RGBA16F, image.width, image.height, 0, gl.RGBA, gl.FLOAT, image.data);
                    } else {
                        // TODO
                    }
                } else {
                    gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                }
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
            }
            // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        }
    }, {
        key: 'placeholder',
        value: function placeholder() {
            var canvases = [];
            for (var i = 0; i < 6; i += 1) {
                var canvas = document.createElement('canvas');
                canvas.width = 128;
                canvas.height = 128;
                canvases.push(canvas);
            }
            return canvases;
        }
    }, {
        key: '_resizeImage',
        value: function _resizeImage(image) {
            if (!this.resizeToPow2 || image instanceof _ImageData2.default) return image;
            // 2, 4, 8, 16... 4096
            var sizes = Array(12).fill(0).map(function (i, j) {
                return Math.pow(2, j + 1);
            });
            // Return if the image size is already a power of 2
            sizes.forEach(function (size) {
                if (image.width === size && image.height === size) {
                    return image;
                }
                return false;
            });
            var imageSize = Math.max(image.width, image.height);
            var size = sizes.reduce(function (prev, curr) {
                return Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev;
            });
            // Draw canvas with texture cropped inside
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(image, 0, 0, size, size);
            return canvas;
        }
    }]);

    return TextureCube;
}();

exports.default = TextureCube;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _happens = __webpack_require__(18);

var _happens2 = _interopRequireDefault(_happens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var VideoTexture = function () {
    function VideoTexture(options) {
        var _this = this;

        _classCallCheck(this, VideoTexture);

        this._onCanPlayThrough = function () {
            _this.emit('canplaythrough');
        };
        this._onEnded = function () {
            _this.emit('ended');
        };
        (0, _happens2.default)(this);
        gl = GL.get();
        this.src = '';
        this.magFilter = gl.NEAREST;
        this.minFilter = gl.NEAREST;
        this.wrapS = gl.CLAMP_TO_EDGE;
        this.wrapT = gl.CLAMP_TO_EDGE;
        this.loop = false;
        this.autoplay = true;
        Object.assign(this, options);
        this.video = document.createElement('video');
        this.video.src = this.src;
        this.video.loop = this.loop;
        this.video.autoplay = this.autoplay;
        this.video.setAttribute('webkitplaysinline', 'webkitplaysinline');
        this.video.setAttribute('playsinline', 'playsinline');
        this.video.addEventListener('canplaythrough', this._onCanPlayThrough, true);
        this.video.addEventListener('ended', this._onEnded, true);
        this._currentTime = 0;
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.placeholder());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    _createClass(VideoTexture, [{
        key: 'update',
        value: function update() {
            gl = GL.get();
            if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
                if (this.video.currentTime !== this._currentTime) {
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
                    gl.bindTexture(gl.TEXTURE_2D, null);
                }
                this._currentTime = this.video.currentTime;
            }
        }
    }, {
        key: 'placeholder',
        value: function placeholder() {
            var canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas;
        }
    }]);

    return VideoTexture;
}();

exports.default = VideoTexture;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// import { warn, log } from '../utils/Console';
// https://github.com/toji/webvr-samples/blob/master/03-vr-presentation.html
/*
const ERROR_WEBVR_DEVICE_NOT_LATEST = 'Your browser supports WebVR but not the latest version';
const ERROR_WEBVR_DEVICE_NOT_SUPPORTED = 'Your browser does not support WebVR';

class WebVRVive {
    constructor() {
        this.vrDisplay = null;
        this.frameData = null;
        this.ready = false;
        this.available = navigator.getVRDisplays !== undefined;
        this._createUI();
    }

    setup() {
        if (navigator.getVRDevices) {
            this.uiUpdateStatus(ERROR_WEBVR_DEVICE_NOT_LATEST, 'error');
            warn(ERROR_WEBVR_DEVICE_NOT_LATEST);
        } else {
            this.uiUpdateStatus(ERROR_WEBVR_DEVICE_NOT_SUPPORTED, 'error');
            warn(ERROR_WEBVR_DEVICE_NOT_SUPPORTED);
        }
        if (!this.available) return;

        this.frameData = new window.VRFrameData();

        navigator.getVRDisplays().then((displays) => {
            log('displays', displays);

            if (displays.length > 0) {
                this.vrDisplay = displays[0];

                // It's heighly reccommended that you set the near and far planes to
                // something appropriate for your scene so the projection matricies
                // WebVR produces have a well scaled depth buffer.
                this.vrDisplay.depthNear = 0.1;
                this.vrDisplay.depthFar = 1024.0;

                if (this.vrDisplay.capabilities.canPresent) {
                    this.uiButtonState(this.ui.enter, 'disabled');
                }

                // The UA may kick us out of VR present mode for any reason, so to
                // ensure we always know when we begin/end presenting we need to
                // listen for vrdisplaypresentchange events.
                window.addEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange, false);
                // These events fire when the user agent has had some indication that
                // it would be appropariate to enter or exit VR presentation mode, such
                // as the user putting on a headset and triggering a proximity sensor.
                // You can inspect the `reason` property of the event to learn why the
                // event was fired, but in this case we're going to always trust the
                // event and enter or exit VR presentation mode when asked.
                window.addEventListener('vrdisplayactivate', this.onVRRequestPresent, false);
                window.addEventListener('vrdisplaydeactivate', this.onVRExitPresent, false);

                this.uiUpdateStatus('ready');
                this.ready = true;
            } else {
                this.uiUpdateStatus('WebVR supported, but no VRDisplays found');
            }
        });
    }

    uiToggleButton(button, visible) {
        const display = visible ? 'block' : 'none';
        button.style.display = display;
    }

    uiButtonState(button, state) {
        switch (state) {
            case 'disabled':
                button.disabled = 'disabled';
                break;
            default:
                break;
        }
    }

    uiUpdateStatus(text = '', state = '') {
        this.ui.status.innerHTML = text;
        this.ui.status.className = 'status';
        this.ui.status.classList.add(state);
    }

    _createUI() {
        this.ui = {
            enter: this._uiCreateButton('enter'),
            exit: this._uiCreateButton('exit'),
            reset: this._uiCreateButton('reset'),
            status: this._uiCreateStatus(),
        };

        // Default visibility
        this.uiToggleButton(this.ui.exit, false);

        this.ui.enter.onclick = () => {
            if (!this.available) return;
            this.onVRRequestPresent();
        };

        this.ui.reset.onclick = () => {
            if (!this.available) return;
            this.vrDisplay.resetPose();
        };
    }

    _uiCreateButton(text) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('btn', `btn-${text}`);
        return button;
    }

    _uiCreateStatus() {
        const div = document.createElement('div');
        div.classList.add('status');
        return div;
    }

    onVRRequestPresent() {
        // This can only be called in response to a user gesture.
        this.vrDisplay.requestPresent([{ source: this.renderer.canvas }]).then(() => {
            // Nothing to do because we're handling things in onVRPresentChange.
        },                                                                     () => {
            this.uiUpdateStatus('requestPresent failed', 'error');
        });
    }

    onVRExitPresent() {
        // No sense in exiting presentation if we're not actually presenting.
        // (This may happen if we get an event like vrdisplaydeactivate when
        // we weren't presenting.)
        if (!this.vrDisplay.isPresenting) return;

        this.vrDisplay.exitPresent().then(() => {
            // Nothing to do because we're handling things in onVRPresentChange.
        },                                () => {
            this.uiUpdateStatus('exitPresent failed', 'error');
        });
    }

    onVRPresentChange() {
        // When we begin or end presenting, the canvas should be resized to the
        // recommended dimensions for the display.
        // onResize();

        if (this.vrDisplay.isPresenting) {
            if (this.vrDisplay.capabilities.hasExternalDisplay) {
                // Because we're not mirroring any images on an external screen will
                // freeze while presenting. It's better to replace it with a message
                // indicating that content is being shown on the VRDisplay.
                this.uiUpdateStatus('presenting');
                // On devices with an external display the UA may not provide a way
                // to exit VR presentation mode, so we should provide one ourselves.
                this.uiToggleButton(this.ui.enter, false);
                this.uiToggleButton(this.ui.exit, true);
            }
        } else if (this.vrDisplay.capabilities.hasExternalDisplay) {
            // If we have an external display take down the presenting message and
            // change the button back to "Enter VR".
            this.uiUpdateStatus();
            this.uiToggleButton(this.ui.enter, true);
            this.uiToggleButton(this.ui.exit, false);
        }
    }

    getFrameData() {
        if (this.ready) {
            this.vrDisplay.getFrameData(this.frameData);
        }
    }

    getEyeParameters(eye) {
        return this.vrDisplay.getEyeParameters(eye);
    }
}

export default new WebVRVive();
*/
exports.default = {};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = function (_Geometry) {
    _inherits(Box, _Geometry);

    function Box() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var colors = arguments[3];

        _classCallCheck(this, Box);

        // this.colors = [];
        // Screenspace
        /*
            (-1, 1)  (0, 1)  (1, 1)
             (-1, 0)  (0, 0)  (1, 0)
             (-1,-1)  (0,-1)  (1,-1)
            */
        var vertices = [
        // Front face
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
        for (var i = 0; i < vertices.length; i += 3) {
            vertices[i] *= width;
            vertices[i + 1] *= height;
            vertices[i + 2] *= depth;
        }
        var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
        var normals = [
        // Front
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
        // Back
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
        // Top
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        // Bottom
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
        // Right
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
        // Left
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
        var uvs = [
        // Front face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Back face
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
        // Top face
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        // Bottom face
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        // Right face
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
        // Left face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
        return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, new Float32Array(vertices), new Uint16Array(indices), new Float32Array(normals), new Float32Array(uvs), colors));
    }

    return Box;
}(_Geometry3.default);

exports.default = Box;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineGeometry = function (_Geometry) {
    _inherits(LineGeometry, _Geometry);

    function LineGeometry(bufferVertices) {
        _classCallCheck(this, LineGeometry);

        var vertices = [];
        var i3 = 0;
        var i6 = 0;
        var length = bufferVertices.length / 3;
        for (var i = 0; i < length; i += 1) {
            i3 = i * 3;
            i6 = i * 6;
            if (i < length - 1) {
                vertices[i6] = bufferVertices[i3];
                vertices[i6 + 1] = bufferVertices[i3 + 1];
                vertices[i6 + 2] = bufferVertices[i3 + 2];
                vertices[i6 + 3] = bufferVertices[i3 + 3];
                vertices[i6 + 4] = bufferVertices[i3 + 4];
                vertices[i6 + 5] = bufferVertices[i3 + 5];
            }
        }
        return _possibleConstructorReturn(this, (LineGeometry.__proto__ || Object.getPrototypeOf(LineGeometry)).call(this, new Float32Array(vertices)));
    }

    return LineGeometry;
}(_Geometry3.default);

exports.default = LineGeometry;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plane = function (_Geometry) {
    _inherits(Plane, _Geometry);

    function Plane() {
        var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var subdivisionsX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var subdivisionsY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var axis = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'XY';
        var colors = arguments[5];

        _classCallCheck(this, Plane);

        // https://github.com/yiwenl/Alfrid/blob/master/src/alfrid/Geom.js#L9
        // Note triangles are seperate...
        var vertices = [];
        var indices = [];
        var normals = [];
        var uvs = [];
        var index = 0;
        var spacerX = width / subdivisionsX;
        var spacerY = height / subdivisionsY;
        var offsetX = -width * 0.5;
        var offsetY = -height * 0.5;
        var spacerU = 1 / subdivisionsX;
        var spacerV = 1 / subdivisionsY;
        for (var y = 0; y < subdivisionsY; y += 1) {
            for (var x = 0; x < subdivisionsX; x += 1) {
                var triangleX = spacerX * x + offsetX;
                var triangleY = spacerY * y + offsetY;
                var u = x / subdivisionsX;
                var v = y / subdivisionsY;
                switch (axis) {
                    case 'XZ':
                        {
                            // Facing towards y
                            vertices = vertices.concat([triangleX, 0, triangleY]);
                            vertices = vertices.concat([triangleX + spacerX, 0, triangleY]);
                            vertices = vertices.concat([triangleX + spacerX, 0, triangleY + spacerY]);
                            vertices = vertices.concat([triangleX, 0, triangleY + spacerY]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            normals = normals.concat([0, 1, 0]);
                            uvs = uvs.concat([u, 1 - v]);
                            uvs = uvs.concat([u + spacerU, 1 - v]);
                            uvs = uvs.concat([u + spacerU, 1 - (v + spacerV)]);
                            uvs = uvs.concat([u, 1 - (v + spacerV)]);
                            break;
                        }
                    case 'YZ':
                        {
                            // Facing towards x
                            vertices = vertices.concat([0, triangleY, triangleX]);
                            vertices = vertices.concat([0, triangleY, triangleX + spacerX]);
                            vertices = vertices.concat([0, triangleY + spacerY, triangleX + spacerX]);
                            vertices = vertices.concat([0, triangleY + spacerY, triangleX]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            normals = normals.concat([1, 0, 0]);
                            uvs = uvs.concat([1 - u, v]);
                            uvs = uvs.concat([1 - (u + spacerU), v]);
                            uvs = uvs.concat([1 - (u + spacerU), v + spacerV]);
                            uvs = uvs.concat([1 - u, v + spacerV]);
                            break;
                        }
                    default:
                        {
                            // Facing towards z
                            vertices = vertices.concat([triangleX, triangleY, 0]);
                            vertices = vertices.concat([triangleX + spacerX, triangleY, 0]);
                            vertices = vertices.concat([triangleX + spacerX, triangleY + spacerY, 0]);
                            vertices = vertices.concat([triangleX, triangleY + spacerY, 0]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            normals = normals.concat([0, 0, 1]);
                            uvs = uvs.concat([u, v]);
                            uvs = uvs.concat([u + spacerU, v]);
                            uvs = uvs.concat([u + spacerU, v + spacerV]);
                            uvs = uvs.concat([u, v + spacerV]);
                        }
                }
                indices.push(index * 4 + 0);
                indices.push(index * 4 + 1);
                indices.push(index * 4 + 2);
                indices.push(index * 4 + 0);
                indices.push(index * 4 + 2);
                indices.push(index * 4 + 3);
                index += 1;
            }
        }
        return _possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, new Float32Array(vertices), new Uint16Array(indices), new Float32Array(normals), new Float32Array(uvs), colors));
    }

    return Plane;
}(_Geometry3.default);

exports.default = Plane;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SphereGeometry = function (_Geometry) {
    _inherits(SphereGeometry, _Geometry);

    function SphereGeometry() {
        var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var axisDivisions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
        var heightDivisons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
        var colors = arguments[3];

        _classCallCheck(this, SphereGeometry);

        // https://github.com/gpjt/webgl-lessons/blob/master/lesson12/index.html
        var vertices = [];
        var normals = [];
        var uvs = [];
        for (var axisNumber = 0; axisNumber <= axisDivisions; axisNumber += 1) {
            var theta = axisNumber * Math.PI / axisDivisions;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            for (var heightNumber = 0; heightNumber <= heightDivisons; heightNumber += 1) {
                var phi = heightNumber * 2 * Math.PI / heightDivisons;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - heightNumber / heightDivisons;
                var v = 1 - axisNumber / axisDivisions;
                normals.push(x);
                normals.push(y);
                normals.push(z);
                uvs.push(u);
                uvs.push(v);
                vertices.push(radius * x);
                vertices.push(radius * y);
                vertices.push(radius * z);
            }
        }
        var indices = [];
        for (var _axisNumber = 0; _axisNumber < axisDivisions; _axisNumber += 1) {
            for (var _heightNumber = 0; _heightNumber < heightDivisons; _heightNumber += 1) {
                var first = _axisNumber * (heightDivisons + 1) + _heightNumber;
                var second = first + heightDivisons + 1;
                indices.push(first);
                indices.push(second);
                indices.push(first + 1);
                indices.push(second);
                indices.push(second + 1);
                indices.push(first + 1);
            }
        }
        return _possibleConstructorReturn(this, (SphereGeometry.__proto__ || Object.getPrototypeOf(SphereGeometry)).call(this, new Float32Array(vertices), new Uint16Array(indices), new Float32Array(normals), new Float32Array(uvs), colors));
    }

    return SphereGeometry;
}(_Geometry3.default);

exports.default = SphereGeometry;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = __webpack_require__(9);

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Shader = __webpack_require__(10);

var _Shader2 = _interopRequireDefault(_Shader);

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Capabilities = __webpack_require__(3);

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderEs300 = _EsVersion2.default + '\n\tlayout (location = 0) in vec3 aVertexPosition;\n\tlayout (location = 1) in vec3 aVertexColor;\n\n\t' + _ProjectionView2.default + '\n\n\tuniform mat4 uModelMatrix;\n\n\tout vec3 vColor;\n\n\tvoid main(void){\n\t\tvColor = aVertexColor;\n\t\tgl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
var vertexShaderEs100 = '\n\tattribute vec3 aVertexPosition;\n\tattribute vec3 aVertexColor;\n\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uModelMatrix;\n\n\tvarying vec3 vColor;\n\n\tvoid main(void){\n\t\tvColor = aVertexColor;\n\t\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
function fragmentShaderEs300() {
    return _EsVersion2.default + '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tin vec3 vColor;\n\tout vec4 outgoingColor;\n\n\tvoid main(void){\n\t\toutgoingColor = vec4(vColor, 1.0);\n\t}\n\t';
}
function fragmentShaderEs100() {
    return '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tvarying vec3 vColor;\n\n\tvoid main(void){\n\t\tgl_FragColor = vec4(vColor, 1.0);\n\t}\n\t';
}

var AxisGeometry = function (_Geometry) {
    _inherits(AxisGeometry, _Geometry);

    function AxisGeometry(size) {
        _classCallCheck(this, AxisGeometry);

        var vertices = [];
        // X
        vertices = vertices.concat([0, 0, 0, size, 0, 0]);
        // Y
        vertices = vertices.concat([0, 0, 0, 0, size, 0]);
        // Z
        vertices = vertices.concat([0, 0, 0, 0, 0, size]);
        // Colors
        var colors = new Float32Array([1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1]);
        return _possibleConstructorReturn(this, (AxisGeometry.__proto__ || Object.getPrototypeOf(AxisGeometry)).call(this, new Float32Array(vertices), null, null, null, colors));
    }

    return AxisGeometry;
}(_Geometry3.default);

var AxisHelper = function (_Mesh) {
    _inherits(AxisHelper, _Mesh);

    function AxisHelper() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        _classCallCheck(this, AxisHelper);

        var vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
        var fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
        return _possibleConstructorReturn(this, (AxisHelper.__proto__ || Object.getPrototypeOf(AxisHelper)).call(this, new AxisGeometry(size), new _Shader2.default({
            name: 'AxisHelper',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })));
    }

    _createClass(AxisHelper, [{
        key: 'draw',
        value: function draw(modelViewMatrix, projectionMatrix) {
            var gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            this.shader.program.bind();
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
        }
    }]);

    return AxisHelper;
}(_Mesh3.default);

exports.default = AxisHelper;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(12);

var _Mesh2 = __webpack_require__(9);

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Shader = __webpack_require__(10);

var _Shader2 = _interopRequireDefault(_Shader);

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Capabilities = __webpack_require__(3);

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderEs300 = _EsVersion2.default + '\n\t' + _ProjectionView2.default + '\n\n\tin vec3 aVertexPosition;\n\n\tuniform mat4 uModelMatrix;\n\n\tvoid main(void){\n\t\tgl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
var vertexShaderEs100 = '\n\tattribute vec3 aVertexPosition;\n\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uModelMatrix;\n\n\tvoid main(void){\n\t\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
function fragmentShaderEs300() {
    return _EsVersion2.default + '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tout vec4 outgoingColor;\n\n\tvoid main(void){\n\t\toutgoingColor = vec4(vec3(0.5), 1.0);\n\t}\n\t';
}
function fragmentShaderEs100() {
    return '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\n\tvoid main(void){\n\t\tgl_FragColor = vec4(vec3(0.5), 1.0);\n\t}\n\t';
}

var GridGeometry = function (_Geometry) {
    _inherits(GridGeometry, _Geometry);

    function GridGeometry(size, divisions) {
        _classCallCheck(this, GridGeometry);

        var vertices = [];
        var halfSize = size * 0.5;
        for (var i = 0; i < divisions + 1; i += 1) {
            var x1 = (0, _Utils.lerp)(-halfSize, halfSize, i / divisions);
            var y1 = 0;
            var z1 = -halfSize;
            var x2 = (0, _Utils.lerp)(-halfSize, halfSize, i / divisions);
            var y2 = 0;
            var z2 = halfSize;
            vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
        }
        for (var _i = 0; _i < divisions + 1; _i += 1) {
            var _x = -halfSize;
            var _y = 0;
            var _z = (0, _Utils.lerp)(-halfSize, halfSize, _i / divisions);
            var _x2 = halfSize;
            var _y2 = 0;
            var _z2 = (0, _Utils.lerp)(-halfSize, halfSize, _i / divisions);
            vertices = vertices.concat([_x, _y, _z, _x2, _y2, _z2]);
        }
        return _possibleConstructorReturn(this, (GridGeometry.__proto__ || Object.getPrototypeOf(GridGeometry)).call(this, new Float32Array(vertices)));
    }

    return GridGeometry;
}(_Geometry3.default);

var GridHelper = function (_Mesh) {
    _inherits(GridHelper, _Mesh);

    function GridHelper() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var divisions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        _classCallCheck(this, GridHelper);

        var vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
        var fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
        return _possibleConstructorReturn(this, (GridHelper.__proto__ || Object.getPrototypeOf(GridHelper)).call(this, new GridGeometry(size, divisions), new _Shader2.default({
            name: 'GridHelper',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })));
    }

    _createClass(GridHelper, [{
        key: 'draw',
        value: function draw(modelViewMatrix, projectionMatrix) {
            var gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            this.shader.program.bind();
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
        }
    }]);

    return GridHelper;
}(_Mesh3.default);

exports.default = GridHelper;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = __webpack_require__(9);

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Shader = __webpack_require__(10);

var _Shader2 = _interopRequireDefault(_Shader);

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Capabilities = __webpack_require__(3);

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderEs300 = _EsVersion2.default + '\n\t' + _ProjectionView2.default + '\n\n\tin vec3 aVertexPosition;\n\n\tuniform mat4 uModelMatrix;\n\tuniform mat3 uNormalMatrix;\n\n\tvoid main(void){\n\t\tgl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
var vertexShaderEs100 = '\n\tattribute vec3 aVertexPosition;\n\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uModelMatrix;\n\tuniform mat3 uNormalMatrix;\n\n\tvoid main(void){\n\t\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t}\n';
function fragmentShaderEs300() {
    return _EsVersion2.default + '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tout vec4 outgoingColor;\n\n\tvoid main(void){\n\t\toutgoingColor = vec4(1.0);\n\t}\n\t';
}
function fragmentShaderEs100() {
    return '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\n\tvoid main(void){\n\t\tgl_FragColor = vec4(1.0);\n\t}\n\t';
}

var NormalsGeometry = function (_Geometry) {
    _inherits(NormalsGeometry, _Geometry);

    function NormalsGeometry(mesh) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

        _classCallCheck(this, NormalsGeometry);

        var vertices = [];
        var sx = mesh.scale.x;
        var sy = mesh.scale.y;
        var sz = mesh.scale.z;
        var length = mesh.geometry.bufferNormals.length / 3;
        for (var i = 0; i < length; i += 1) {
            var i3 = i * 3;
            var v0x = sx * mesh.geometry.bufferVertices[i3];
            var v0y = sy * mesh.geometry.bufferVertices[i3 + 1];
            var v0z = sz * mesh.geometry.bufferVertices[i3 + 2];
            var nx = mesh.geometry.bufferNormals[i3];
            var ny = mesh.geometry.bufferNormals[i3 + 1];
            var nz = mesh.geometry.bufferNormals[i3 + 2];
            var v1x = v0x + size * nx;
            var v1y = v0y + size * ny;
            var v1z = v0z + size * nz;
            vertices = vertices.concat([v0x, v0y, v0z, v1x, v1y, v1z]);
        }
        return _possibleConstructorReturn(this, (NormalsGeometry.__proto__ || Object.getPrototypeOf(NormalsGeometry)).call(this, new Float32Array(vertices)));
    }

    return NormalsGeometry;
}(_Geometry3.default);

var NormalsHelper = function (_Mesh) {
    _inherits(NormalsHelper, _Mesh);

    function NormalsHelper(mesh) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        _classCallCheck(this, NormalsHelper);

        var vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
        var fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
        return _possibleConstructorReturn(this, (NormalsHelper.__proto__ || Object.getPrototypeOf(NormalsHelper)).call(this, new NormalsGeometry(mesh, size), new _Shader2.default({
            name: 'NormalsHelper',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })));
    }

    _createClass(NormalsHelper, [{
        key: 'draw',
        value: function draw(modelViewMatrix, projectionMatrix) {
            var gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            this.shader.program.bind();
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
        }
    }]);

    return NormalsHelper;
}(_Mesh3.default);

exports.default = NormalsHelper;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Mesh2 = __webpack_require__(9);

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Shader = __webpack_require__(10);

var _Shader2 = _interopRequireDefault(_Shader);

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Capabilities = __webpack_require__(3);

var _Geometry2 = __webpack_require__(4);

var _Geometry3 = _interopRequireDefault(_Geometry2);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

var _Color = __webpack_require__(11);

var _Color2 = _interopRequireDefault(_Color);

var _Utils = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var vertexShaderEs300 = _EsVersion2.default + '\n\t' + _ProjectionView2.default + '\n\n\tin vec3 aVertexPosition;\n\n\tuniform mat4 uModelMatrix;\n\tuniform float uSize;\n\n\tvoid main(void){\n\t\tvec4 mvPosition = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t\tgl_PointSize = uSize * (100.0 / length(mvPosition.xyz));\n\t\tgl_Position = mvPosition;\n\t}\n';
var vertexShaderEs100 = '\n\tattribute vec3 aVertexPosition;\n\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uModelMatrix;\n\tuniform float uSize;\n\n\tvoid main(void){\n\t\tvec4 mvPosition = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\t\tgl_PointSize = uSize * (100.0 / length(mvPosition.xyz));\n\t\tgl_Position = mvPosition;\n\t}\n';
function fragmentShaderEs300() {
    return _EsVersion2.default + '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tuniform vec3 uColor;\n\tout vec4 outgoingColor;\n\n\tvoid main(void){\n\t\tif(length(gl_PointCoord - 0.5) > 0.5) {\n\t\t\tdiscard;\n\t\t}\n\t\toutgoingColor = vec4(uColor, 1.0);\n\t}\n\t';
}
function fragmentShaderEs100() {
    return '\n\tprecision ' + _Capabilities.capabilities.precision + ' float;\n\tuniform vec3 uColor;\n\n\tvoid main(void){\n\t\tif(length(gl_PointCoord - 0.5) > 0.5) {\n\t\t\tdiscard;\n\t\t}\n\t\tgl_FragColor = vec4(uColor, 1.0);\n\t}\n\t';
}

var VerticesGeometry = function (_Geometry) {
    _inherits(VerticesGeometry, _Geometry);

    function VerticesGeometry(mesh) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

        _classCallCheck(this, VerticesGeometry);

        var vertices = [];
        var length = mesh.geometry.bufferVertices.length;
        for (var i = 0; i < length; i += 1) {
            vertices[i] = mesh.geometry.bufferVertices[i];
        }
        return _possibleConstructorReturn(this, (VerticesGeometry.__proto__ || Object.getPrototypeOf(VerticesGeometry)).call(this, new Float32Array(vertices)));
    }

    return VerticesGeometry;
}(_Geometry3.default);

var projectionViewMatrix = _glMatrix.mat4.create();
var modelWorldMatrix = _glMatrix.mat4.create();

var VerticesHelper = function (_Mesh) {
    _inherits(VerticesHelper, _Mesh);

    function VerticesHelper(mesh) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var colorPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0x00ff00;
        var colorLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#ffffff';

        _classCallCheck(this, VerticesHelper);

        var vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
        var fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();

        var _this2 = _possibleConstructorReturn(this, (VerticesHelper.__proto__ || Object.getPrototypeOf(VerticesHelper)).call(this, new VerticesGeometry(mesh, size), new _Shader2.default({
            name: 'VerticesHelper',
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uSize: {
                    type: 'f',
                    value: size
                },
                uColor: {
                    type: '3f',
                    value: new _Color2.default(colorPoint).v
                }
            }
        })));

        _this2._labels = [];
        _this2._parentMesh = mesh;
        var element = void 0;
        var addLabel = function addLabel(indice) {
            element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.pointerEvents = 'none';
            element.style.color = colorLabel;
            element.style.fontSize = '16px';
            _this2._labels.push({
                indice: indice,
                element: element
            });
            document.body.appendChild(element);
        };
        _this2._parentMesh.geometry.faces.forEach(function (face, i) {
            addLabel(face.indices[0]);
            addLabel(face.indices[1]);
            addLabel(face.indices[2]);
        });
        return _this2;
    }

    _createClass(VerticesHelper, [{
        key: 'draw',
        value: function draw(modelViewMatrix, projectionMatrix) {
            var _this3 = this;

            var gl = GL.get();
            // Update modelMatrix
            this.updateMatrix();
            // Update
            _glMatrix.mat4.identity(projectionViewMatrix);
            _glMatrix.mat4.identity(modelWorldMatrix);
            _glMatrix.mat4.mul(modelWorldMatrix, modelViewMatrix, this.modelMatrix);
            _glMatrix.mat4.mul(projectionViewMatrix, projectionMatrix, modelWorldMatrix);
            var screenPosition = void 0;
            var vertex = void 0;
            this._labels.forEach(function (label, i) {
                vertex = _this3._parentMesh.geometry.vertices[label.indice];
                screenPosition = (0, _Utils.from3DTo2D)(vertex, projectionViewMatrix);
                label.element.style.left = screenPosition.x * window.innerWidth + 'px';
                label.element.style.top = screenPosition.y * window.innerHeight + 'px';
                label.element.innerHTML = '' + label.indice;
            });
            this.shader.program.bind();
            this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.bind();
            } else {
                this.bindAttributes();
                this.bindAttributesInstanced();
                this.bindIndexBuffer();
            }
            gl.drawArrays(gl.POINTS, 0, this.geometry.attributes.aVertexPosition.numItems);
            if (_Capabilities.extensions.vertexArrayObject) {
                this.vao.unbind();
            }
        }
    }]);

    return VerticesHelper;
}(_Mesh3.default);

exports.default = VerticesHelper;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Light2 = __webpack_require__(25);

var _Light3 = _interopRequireDefault(_Light2);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _Color = __webpack_require__(11);

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectionalLight = function (_Light) {
    _inherits(DirectionalLight, _Light);

    function DirectionalLight() {
        var uniforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, DirectionalLight);

        var _this = _possibleConstructorReturn(this, (DirectionalLight.__proto__ || Object.getPrototypeOf(DirectionalLight)).call(this));

        _this.uniforms = {
            position: {
                type: '3f',
                value: new _Vector2.default(0, 0, 0).v
            },
            color: {
                type: '3f',
                value: new _Color2.default(0xffffff).v
            },
            intensity: {
                type: 'f',
                value: 1
            }
        };
        Object.assign(_this.uniforms, uniforms);
        _this.position = new _Vector2.default();
        if (GL.webgl2) {
            // Buffer data
            _this.data = new Float32Array([].concat(_toConsumableArray(_this.uniforms.position.value), [0.0], _toConsumableArray(_this.uniforms.color.value), [0.0, _this.uniforms.intensity.value, 0.0, 0.0, 0.0]));
        }
        return _this;
    }

    _createClass(DirectionalLight, [{
        key: 'update',
        value: function update() {
            if (GL.webgl2) {
                // Set values for buffer data
                this.setValues(this.position.v);
                this.setValues(this.uniforms.color, 4);
                this.setValues([this.uniforms.intensity.value], 8);
            } else {
                this.uniforms.position.value.set(this.position.v);
            }
        }
    }]);

    return DirectionalLight;
}(_Light3.default);

exports.default = DirectionalLight;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _UniformBuffer = __webpack_require__(24);

var _UniformBuffer2 = _interopRequireDefault(_UniformBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;
/**
    * Genetic class for PointLights and DirectionalLights
    * Creates a uniform buffer which stores all the data for the specific
    * light type
    */

var Lights = function () {
    function Lights(lights) {
        _classCallCheck(this, Lights);

        this.lights = lights;
        if (GL.webgl2) {
            var dataLength = this.lights[0].data.length;
            // Setup data
            var values = Array(lights.length * dataLength);
            var data = new Float32Array(values);
            // Create uniform buffer to store all point lights data
            // The uniform block is an array of lights
            this.uniformBuffer = new _UniformBuffer2.default(data);
            // Tmp array for updating the lights data buffer
            this._lightsData = new Float32Array(lights[0].data.length * lights.length);
        }
    }

    _createClass(Lights, [{
        key: 'get',
        value: function get() {
            return this.lights;
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;

            if (GL.webgl2) {
                // Get data from lights and update the uniform buffer
                this.lights.forEach(function (light, i) {
                    light.update();
                    _this._lightsData.set(light.data, i * light.data.length);
                });
                this.uniformBuffer.setValues(this._lightsData, 0);
            } else {
                this.lights.forEach(function (light) {
                    light.update();
                });
            }
        }
    }, {
        key: 'bind',
        value: function bind() {
            if (GL.webgl2) {
                gl = GL.get();
                gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, this.uniformBuffer.buffer);
                gl.bindBuffer(gl.UNIFORM_BUFFER, this.uniformBuffer.buffer);
                gl.bufferSubData(gl.UNIFORM_BUFFER, 0, this.uniformBuffer.data);
                gl.bindBuffer(gl.UNIFORM_BUFFER, null);
            }
        }
    }, {
        key: 'length',
        get: function get() {
            return this.lights.length;
        }
    }]);

    return Lights;
}();

exports.default = Lights;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Light2 = __webpack_require__(25);

var _Light3 = _interopRequireDefault(_Light2);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _Color = __webpack_require__(11);

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointLight = function (_Light) {
    _inherits(PointLight, _Light);

    function PointLight() {
        var uniforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, PointLight);

        var _this = _possibleConstructorReturn(this, (PointLight.__proto__ || Object.getPrototypeOf(PointLight)).call(this));

        _this.uniforms = {
            position: {
                type: '3f',
                value: new _Vector2.default(0, 0, 0).v
            },
            color: {
                type: '3f',
                value: new _Color2.default(0xFFFFFF).v
            },
            specularColor: {
                type: '3f',
                value: new _Color2.default(0xFFFFFF).v
            },
            shininess: {
                type: 'f',
                value: 100
            },
            intensity: {
                type: 'f',
                value: 1
            }
        };
        Object.assign(_this.uniforms, uniforms);
        _this.position = new _Vector2.default();
        if (GL.webgl2) {
            // Buffer data
            _this.data = new Float32Array([].concat(_toConsumableArray(_this.uniforms.position.value), [0.0], _toConsumableArray(_this.uniforms.color.value), [0.0], _toConsumableArray(_this.uniforms.specularColor.value), [0.0, _this.uniforms.shininess.value, 0.0, 0.0, 0.0, _this.uniforms.intensity.value, 0.0, 0.0, 0.0]));
        }
        return _this;
    }

    _createClass(PointLight, [{
        key: 'update',
        value: function update() {
            if (GL.webgl2) {
                // Set values for buffer data
                this.setValues(this.position.v);
                this.setValues(this.uniforms.color, 4);
                this.setValues(this.uniforms.specularColor, 8);
                this.setValues([this.uniforms.shininess.value], 12);
                this.setValues([this.uniforms.intensity.value], 16);
            } else {
                this.uniforms.position.value.set(this.position.v);
            }
        }
    }]);

    return PointLight;
}(_Light3.default);

exports.default = PointLight;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _webglObjLoader = __webpack_require__(79);

var _webglObjLoader2 = _interopRequireDefault(_webglObjLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjLoader = function ObjLoader(url) {
    _classCallCheck(this, ObjLoader);

    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState !== 4) return;
            if (req.readyState === 4 && req.status === 200) {
                var data = new _webglObjLoader2.default.Mesh(req.responseText);
                resolve(data, req.status);
            } else {
                reject('error', req.status);
            }
        };
        req.open('GET', url, true);
        req.send();
    });
};

exports.default = ObjLoader;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Conditionals = __webpack_require__(28);

var _Conditionals2 = _interopRequireDefault(_Conditionals);

var _DirectionalLights = __webpack_require__(29);

var DirectionalLights = _interopRequireWildcard(_DirectionalLights);

var _EnvMapCube = __webpack_require__(64);

var _EnvMapCube2 = _interopRequireDefault(_EnvMapCube);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _Fog = __webpack_require__(65);

var _Fog2 = _interopRequireDefault(_Fog);

var _Gamma = __webpack_require__(66);

var _Gamma2 = _interopRequireDefault(_Gamma);

var _Math = __webpack_require__(30);

var _Math2 = _interopRequireDefault(_Math);

var _Noise = __webpack_require__(67);

var Noise = _interopRequireWildcard(_Noise);

var _Packing = __webpack_require__(68);

var _Packing2 = _interopRequireDefault(_Packing);

var _PointLights = __webpack_require__(17);

var PointLights = _interopRequireWildcard(_PointLights);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

var _Tonemap = __webpack_require__(69);

var Tonemap = _interopRequireWildcard(_Tonemap);

var _Transpose = __webpack_require__(70);

var _Transpose2 = _interopRequireDefault(_Transpose);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Conditionals: _Conditionals2.default,
    DirectionalLights: DirectionalLights,
    EnvMapCube: _EnvMapCube2.default,
    EsVersion: _EsVersion2.default,
    Fog: _Fog2.default,
    Gamma: _Gamma2.default,
    Math: _Math2.default,
    Noise: Noise,
    Packing: _Packing2.default,
    PointLights: PointLights,
    ProjectionView: _ProjectionView2.default,
    Tonemap: Tonemap,
    Transpose: _Transpose2.default
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author alteredq / http://alteredqualia.com/
 * https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
 */
var diff = void 0;
var newTime = void 0;
var dateType = window.performance || Date;

var Clock = function () {
    function Clock() {
        var autoStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, Clock);

        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.isRunning = autoStart;
    }

    _createClass(Clock, [{
        key: "start",
        value: function start() {
            this.startTime = dateType.now();
            this.oldTime = this.startTime;
            this.elapsedTime = 0;
            this.isRunning = true;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.getElapsedTime();
            this.isRunning = false;
        }
    }, {
        key: "getElapsedTime",
        value: function getElapsedTime() {
            this.getDelta();
            return this.elapsedTime;
        }
    }, {
        key: "getDelta",
        value: function getDelta() {
            diff = 0;
            if (this.autoStart && !this.isRunning) {
                this.start();
            }
            if (this.isRunning) {
                newTime = dateType.now();
                diff = (newTime - this.oldTime) / 1000;
                this.oldTime = newTime;
                this.elapsedTime += diff;
            }
            return diff;
        }
    }]);

    return Clock;
}();

exports.default = Clock;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Console = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var Program = function () {
    function Program() {
        _classCallCheck(this, Program);

        gl = GL.get();
        this.program = gl.createProgram();
        this.created = false;
        // Uniform blocks
        this.uniformBlocks = {};
        // Cache all attribute locations
        this.attributeLocations = {};
    }

    _createClass(Program, [{
        key: 'link',
        value: function link(vertexShader, fragmentShader, transformFeedbackVaryings) {
            this.compiledVertexShader = this.compile('vs', vertexShader);
            this.compiledFragmentShader = this.compile('fs', fragmentShader);
            // Don"t attach a broken shader
            // this will allow other objects to continue rendering
            if (!this.compiledVertexShader || !this.compiledFragmentShader) {
                return;
            }
            gl.attachShader(this.program, this.compiledVertexShader);
            gl.attachShader(this.program, this.compiledFragmentShader);
            if (transformFeedbackVaryings instanceof Array && gl instanceof WebGL2RenderingContext) {
                gl.transformFeedbackVaryings(this.program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
            }
            gl.linkProgram(this.program);
            gl.validateProgram(this.program);
            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                var info = gl.getProgramInfoLog(this.program);
                (0, _Console.warn)('Failed to initialise shaders', info);
            }
            this.created = true;
        }
    }, {
        key: 'compile',
        value: function compile(type, source) {
            gl = GL.get();
            var shader = void 0;
            // console.log(source);
            switch (type) {
                case 'vs':
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                default:
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
            }
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                (0, _Console.warn)('Failed to compile shader:', gl.getShaderInfoLog(shader));
                return false;
            }
            return shader;
        }
    }, {
        key: 'setAttributeLocation',
        value: function setAttributeLocation(attributeName) {
            gl = GL.get();
            this.attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
            gl.enableVertexAttribArray(this.attributeLocations[attributeName]);
        }
    }, {
        key: 'setAttributePointer',
        value: function setAttributePointer(attributeName, itemSize) {
            gl = GL.get();
            gl.vertexAttribPointer(this.attributeLocations[attributeName], itemSize, gl.FLOAT, false, 0, 0);
        }
    }, {
        key: 'setAttributeInstancedPointer',
        value: function setAttributeInstancedPointer(attributeName, itemSize) {
            gl = GL.get();
            gl.vertexAttribPointer(this.attributeLocations[attributeName], itemSize, gl.FLOAT, false, 0, 0);
        }
    }, {
        key: 'setUniformLocation',
        value: function setUniformLocation(uniforms, uniformName) {
            gl = GL.get();
            uniforms[uniformName].location = gl.getUniformLocation(this.program, uniformName);
        }
    }, {
        key: 'setUniformBlockLocation',
        value: function setUniformBlockLocation(uniformName, uniformBuffer, index) {
            gl = GL.get();
            if (gl instanceof WebGL2RenderingContext) {
                this.uniformBlocks[uniformName] = gl.getUniformBlockIndex(this.program, uniformName);
                gl.uniformBlockBinding(this.program, this.uniformBlocks[uniformName], this.uniformBlocks[uniformName]);
                gl.bindBufferBase(gl.UNIFORM_BUFFER, index, uniformBuffer);
            }
        }
    }, {
        key: 'bind',
        value: function bind() {
            gl = GL.get();
            gl.useProgram(this.program);
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            var _this = this;

            gl = GL.get();
            var attributeLocation = void 0;
            // Cleanup attribute locations
            Object.keys(this.attributeLocations).forEach(function (attributeName) {
                attributeLocation = _this.attributeLocations[attributeName];
                gl.disableVertexAttribArray(attributeLocation);
            });
            gl.detachShader(this.program, this.compiledVertexShader);
            gl.detachShader(this.program, this.compiledFragmentShader);
            gl.deleteProgram(this.program);
        }
    }]);

    return Program;
}();

exports.default = Program;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = __webpack_require__(1);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cb = _glMatrix.vec3.create();
var ab = _glMatrix.vec3.create();

var Face = function () {
    function Face(indiceA, indiceB, indiceC, vertexA, vertexB, vertexC) {
        _classCallCheck(this, Face);

        this.indices = [indiceA, indiceB, indiceC];
        this.vertices = [vertexA, vertexB, vertexC];
        this.uvs = [indiceA, indiceB, indiceC];
        this.normal = new _Vector2.default();
        this.updateFaceNormal();
    }

    _createClass(Face, [{
        key: 'updateFaceNormal',
        value: function updateFaceNormal() {
            // from threejs
            _glMatrix.vec3.set(cb, 0, 0, 0);
            _glMatrix.vec3.set(ab, 0, 0, 0);
            _glMatrix.vec3.subtract(cb, this.vertices[2].v, this.vertices[1].v);
            _glMatrix.vec3.subtract(ab, this.vertices[0].v, this.vertices[1].v);
            _glMatrix.vec3.cross(cb, cb, ab);
            _glMatrix.vec3.normalize(cb, cb);
            this.normal.set(cb[0], cb[1], cb[2]);
        }
    }]);

    return Face;
}();

exports.default = Face;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjLoader = exports.OrbitControls = exports.ShaderChunks = exports.MathUtils = exports.Ray = exports.Vector2 = exports.Vector3 = exports.Color = exports.PointLight = exports.DirectionalLight = exports.Lights = exports.VerticesHelper = exports.NormalsHelper = exports.GridHelper = exports.AxisHelper = exports.SphereGeometry = exports.PlaneGeometry = exports.Geometry = exports.BufferAttribute = exports.LineGeometry = exports.BoxGeometry = exports.WebVRVive = exports.Detect = exports.Clock = exports.Vao = exports.TextureVideo = exports.TextureCube = exports.Texture = exports.Shader = exports.Scene = exports.RenderTarget = exports.Renderer = exports.RayCaster = exports.PerspectiveCamera = exports.OrthographicCamera = exports.Object3D = exports.Mesh = exports.GL = exports.Constants = exports.Capabilities = undefined;

var _Capabilities = __webpack_require__(3);

var Capabilities = _interopRequireWildcard(_Capabilities);

var _Constants = __webpack_require__(7);

var Constants = _interopRequireWildcard(_Constants);

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _Mesh = __webpack_require__(9);

var _Mesh2 = _interopRequireDefault(_Mesh);

var _Object3D = __webpack_require__(19);

var _Object3D2 = _interopRequireDefault(_Object3D);

var _OrthographicCamera = __webpack_require__(35);

var _OrthographicCamera2 = _interopRequireDefault(_OrthographicCamera);

var _PerspectiveCamera = __webpack_require__(36);

var _PerspectiveCamera2 = _interopRequireDefault(_PerspectiveCamera);

var _Raycaster = __webpack_require__(37);

var _Raycaster2 = _interopRequireDefault(_Raycaster);

var _Renderer = __webpack_require__(39);

var _Renderer2 = _interopRequireDefault(_Renderer);

var _RenderTarget = __webpack_require__(38);

var _RenderTarget2 = _interopRequireDefault(_RenderTarget);

var _Scene = __webpack_require__(40);

var _Scene2 = _interopRequireDefault(_Scene);

var _Shader = __webpack_require__(10);

var _Shader2 = _interopRequireDefault(_Shader);

var _Texture = __webpack_require__(41);

var _Texture2 = _interopRequireDefault(_Texture);

var _TextureCube = __webpack_require__(42);

var _TextureCube2 = _interopRequireDefault(_TextureCube);

var _TextureVideo = __webpack_require__(43);

var _TextureVideo2 = _interopRequireDefault(_TextureVideo);

var _Vao = __webpack_require__(20);

var _Vao2 = _interopRequireDefault(_Vao);

var _WebVRVive = __webpack_require__(44);

var _WebVRVive2 = _interopRequireDefault(_WebVRVive);

var _BoxGeometry = __webpack_require__(45);

var _BoxGeometry2 = _interopRequireDefault(_BoxGeometry);

var _BufferAttribute = __webpack_require__(21);

var _BufferAttribute2 = _interopRequireDefault(_BufferAttribute);

var _Geometry = __webpack_require__(4);

var _Geometry2 = _interopRequireDefault(_Geometry);

var _LineGeometry = __webpack_require__(46);

var _LineGeometry2 = _interopRequireDefault(_LineGeometry);

var _PlaneGeometry = __webpack_require__(47);

var _PlaneGeometry2 = _interopRequireDefault(_PlaneGeometry);

var _SphereGeometry = __webpack_require__(48);

var _SphereGeometry2 = _interopRequireDefault(_SphereGeometry);

var _AxisHelper = __webpack_require__(49);

var _AxisHelper2 = _interopRequireDefault(_AxisHelper);

var _GridHelper = __webpack_require__(50);

var _GridHelper2 = _interopRequireDefault(_GridHelper);

var _NormalsHelper = __webpack_require__(51);

var _NormalsHelper2 = _interopRequireDefault(_NormalsHelper);

var _VerticesHelper = __webpack_require__(52);

var _VerticesHelper2 = _interopRequireDefault(_VerticesHelper);

var _Lights = __webpack_require__(54);

var _Lights2 = _interopRequireDefault(_Lights);

var _DirectionalLight = __webpack_require__(53);

var _DirectionalLight2 = _interopRequireDefault(_DirectionalLight);

var _PointLight = __webpack_require__(55);

var _PointLight2 = _interopRequireDefault(_PointLight);

var _Color = __webpack_require__(11);

var _Color2 = _interopRequireDefault(_Color);

var _Vector = __webpack_require__(2);

var _Vector2 = _interopRequireDefault(_Vector);

var _Vector3 = __webpack_require__(14);

var _Vector4 = _interopRequireDefault(_Vector3);

var _Ray = __webpack_require__(22);

var _Ray2 = _interopRequireDefault(_Ray);

var _Utils = __webpack_require__(12);

var MathUtils = _interopRequireWildcard(_Utils);

var _index = __webpack_require__(57);

var _index2 = _interopRequireDefault(_index);

var _Clock = __webpack_require__(58);

var _Clock2 = _interopRequireDefault(_Clock);

var _Detect = __webpack_require__(23);

var _Detect2 = _interopRequireDefault(_Detect);

var _OrbitControls = __webpack_require__(34);

var _OrbitControls2 = _interopRequireDefault(_OrbitControls);

var _ObjLoader = __webpack_require__(56);

var _ObjLoader2 = _interopRequireDefault(_ObjLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Controls

// Utils

// Math

// Extras
// Core
exports.Capabilities = Capabilities;
exports.Constants = Constants;
exports.GL = GL;
exports.Mesh = _Mesh2.default;
exports.Object3D = _Object3D2.default;
exports.OrthographicCamera = _OrthographicCamera2.default;
exports.PerspectiveCamera = _PerspectiveCamera2.default;
exports.RayCaster = _Raycaster2.default;
exports.Renderer = _Renderer2.default;
exports.RenderTarget = _RenderTarget2.default;
exports.Scene = _Scene2.default;
exports.Shader = _Shader2.default;
exports.Texture = _Texture2.default;
exports.TextureCube = _TextureCube2.default;
exports.TextureVideo = _TextureVideo2.default;
exports.Vao = _Vao2.default;
exports.Clock = _Clock2.default;
exports.Detect = _Detect2.default;
exports.WebVRVive = _WebVRVive2.default;
exports.BoxGeometry = _BoxGeometry2.default;
exports.LineGeometry = _LineGeometry2.default;
exports.BufferAttribute = _BufferAttribute2.default;
exports.Geometry = _Geometry2.default;
exports.PlaneGeometry = _PlaneGeometry2.default;
exports.SphereGeometry = _SphereGeometry2.default;
exports.AxisHelper = _AxisHelper2.default;
exports.GridHelper = _GridHelper2.default;
exports.NormalsHelper = _NormalsHelper2.default;
exports.VerticesHelper = _VerticesHelper2.default;
exports.Lights = _Lights2.default;
exports.DirectionalLight = _DirectionalLight2.default;
exports.PointLight = _PointLight2.default;
exports.Color = _Color2.default;
exports.Vector3 = _Vector2.default;
exports.Vector2 = _Vector4.default;
exports.Ray = _Ray2.default;
exports.MathUtils = MathUtils;
exports.ShaderChunks = _index2.default;
exports.OrbitControls = _OrbitControls2.default;
exports.ObjLoader = _ObjLoader2.default;
// Loaders

// Shaders

// Lights

// Helpers

// Geometry

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fragmentShaderEs100 = exports.fragmentShaderEs300 = undefined;

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _PointLights = __webpack_require__(17);

var _DirectionalLights = __webpack_require__(29);

var _Conditionals = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fragmentShaderEs300 = _EsVersion2.default + '\n\t#HOOK_PRECISION\n\t#HOOK_DEFINES\n\n\tlayout(std140) uniform;\n\n\tin vec3 vDiffuse;\n\tin vec3 vPosition;\n\n\t#ifdef normals\n\tin vec3 vNormal;\n\t#endif\n\n\t#ifdef uv\n\tin vec2 vUv;\n\t#endif\n\n\t#ifdef directionalLights\n\t' + _DirectionalLights.directionalLightsEs300 + '\n\t#endif\n\n\t// Lighting\n\t#ifdef pointLights\n\t' + _PointLights.pointLightsInEs300 + '\n\t#endif\n\n\tout vec4 outgoingColor;\n\n\t' + _Conditionals.whenGreaterThan + '\n\n\t#HOOK_FRAGMENT_PRE\n\n\tvoid main(void){\n\n\t\tvec3 color = vDiffuse;\n\n\t\t#ifdef normals\n\t\tvec3 normal = normalize(vNormal);\n\t\t#endif\n\n\t\t#HOOK_FRAGMENT_MAIN\n\n\t\t#ifdef directionalLights\n\t\tfor (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {\n\t\t\tfloat directionalLight = dot(normal, normalize(uDirectionalLights[i].position.xyz));\n\t\t\tvec3 directionalColor = uDirectionalLights[i].color.rgb * directionalLight;\n\t\t\tcolor += whenGreaterThan(directionalLight, 0.0) * (directionalColor * uDirectionalLights[i].intensity.x);\n\t\t}\n\t\t#endif\n\n\t\t#ifdef pointLights\n\t\tfor (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {\n\t\t\tvec3 pointLightSurfaceToLightDirection = normalize(vPointLightSurfaceToLightDirection[i]);\n\t\t\tvec3 pointLightSurfaceToCameraDirection = normalize(vPointLightSurfaceToCameraDirection[i]);\n\t\t\tvec3 halfVector = normalize(pointLightSurfaceToLightDirection + pointLightSurfaceToCameraDirection);\n\n\t\t\tfloat pointLight = max(dot(normal, pointLightSurfaceToLightDirection), 0.0);\n\t\t\tvec3 pointLightColor = uPointLights[i].color.rgb * pointLight;\n\t\t\tcolor += pointLight * pointLightColor;\n\t\t\tfloat specular = max(pow(dot(normal, halfVector), uPointLights[i].shininess.x), 0.0);\n\t\t\tcolor += specular * uPointLights[i].specularColor.rgb;\n\t\t}\n\t\t#endif\n\n\t\toutgoingColor = vec4(color.rgb, 1.0);\n\n\t\t#HOOK_FRAGMENT_END\n\t}\n';
var fragmentShaderEs100 = '\n\t#HOOK_PRECISION\n\t#HOOK_DEFINES\n\n\tvarying vec3 vDiffuse;\n\tvarying vec3 vPosition;\n\n\t#ifdef normals\n\tvarying vec3 vNormal;\n\t#endif\n\n\t#ifdef uv\n\tvarying vec2 vUv;\n\t#endif\n\n\t#ifdef directionalLights\n\t' + _DirectionalLights.directionalLightsEs100 + '\n\t#endif\n\n\t// Lighting\n\t#ifdef pointLights\n\t' + _PointLights.pointLightsEs100 + '\n\t#endif\n\n\t' + _Conditionals.whenGreaterThan + '\n\n\t#HOOK_FRAGMENT_PRE\n\n\tvoid main(void){\n\n\t\tvec3 color = vDiffuse;\n\n\t\t#ifdef normals\n\t\tvec3 normal = normalize(vNormal);\n\t\t#endif\n\n\t\t#HOOK_FRAGMENT_MAIN\n\n\t\t#ifdef directionalLights\n\t\tfor (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {\n\t\t\tfloat directionalLight = dot(normal, normalize(uDirectionalLights[i].position));\n\t\t\tvec3 directionalColor = uDirectionalLights[i].color * directionalLight;\n\t\t\tcolor += whenGreaterThan(directionalLight, 0.0) * (directionalColor * uDirectionalLights[i].intensity);\n\t\t}\n\t\t#endif\n\n\t\t#ifdef pointLights\n\t\tfor (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {\n\t\t\tvec3 pointLightSurfaceToLightDirection = normalize(vPointLightSurfaceToLightDirection[i]);\n\t\t\tvec3 pointLightSurfaceToCameraDirection = normalize(vPointLightSurfaceToCameraDirection[i]);\n\t\t\tvec3 halfVector = normalize(pointLightSurfaceToLightDirection + pointLightSurfaceToCameraDirection);\n\n\t\t\tfloat pointLight = max(dot(normal, pointLightSurfaceToLightDirection), 0.0);\n\t\t\tvec3 pointLightColor = uPointLights[i].color * pointLight;\n\t\t\tcolor += pointLight * pointLightColor;\n\t\t\tfloat specular = max(pow(dot(normal, halfVector), uPointLights[i].shininess), 0.0);\n\t\t\tcolor += specular * uPointLights[i].specularColor;\n\t\t}\n\t\t#endif\n\n\t\tgl_FragColor = vec4(color.rgb, 1.0);\n\n\t\t#HOOK_FRAGMENT_END\n\t}\n';
exports.fragmentShaderEs300 = fragmentShaderEs300;
exports.fragmentShaderEs100 = fragmentShaderEs100;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.vertexShaderEs100 = exports.vertexShaderEs300 = undefined;

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

var _PointLights = __webpack_require__(17);

var _Math = __webpack_require__(30);

var _ProjectionView = __webpack_require__(8);

var _ProjectionView2 = _interopRequireDefault(_ProjectionView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vertexShaderEs300 = _EsVersion2.default + '\n\t' + _Math.definePI + '\n\t' + _Math.definePITwo + '\n\t#HOOK_DEFINES\n\n\tlayout(std140) uniform;\n\n\t' + _ProjectionView2.default + '\n\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uViewMatrixInverse;\n\tuniform mat4 uModelMatrix;\n\tuniform mat4 uModelMatrixInverse;\n\tuniform mat3 uNormalMatrix;\n\n\tin vec3 aVertexPosition;\n\tout vec3 vPosition;\n\tout vec4 vWorldPosition;\n\n\t// Camera\n\tuniform vec3 uCameraPosition;\n\n\t#ifdef vertexColors\n\tin vec3 aVertexColor;\n\t#endif\n\n\t// Color\n\tuniform vec3 uDiffuse;\n\tout vec3 vDiffuse;\n\n\t// Normal\n\t#ifdef normals\n\tin vec3 aVertexNormal;\n\tout vec3 vNormal;\n\t#endif\n\n\t// Uv\n\t#ifdef uv\n\tin vec2 aUv;\n\tout vec2 vUv;\n\t#endif\n\n\t// Lighting\n\t#ifdef pointLights\n\t' + _PointLights.pointLightsOutEs300 + '\n\t#endif\n\n\t#HOOK_VERTEX_PRE\n\n\tvoid main(void){\n\n\t\tvDiffuse = uDiffuse;\n\n\t\t// Override for custom positioning\n\t\tvec3 transformed = vec3(0.0);\n\n\t\t#ifdef vertexColors\n\t\tvDiffuse = aVertexColor;\n\t\t#endif\n\n\t\t#ifdef uv\n\t\tvUv = aUv;\n\t\t#endif\n\n\t\t#HOOK_VERTEX_MAIN\n\n\t\t#ifdef normals\n\t\tvNormal = uNormalMatrix * aVertexNormal;\n\t\t#endif\n\n\t\t// Vertex position + offset\n\t\tvPosition = aVertexPosition + transformed;\n\n\t\t// Calculate world position of vertex with transformed\n\t\tvWorldPosition = uModelMatrix * vec4(aVertexPosition + transformed, 1.0);\n\n\t\t#ifdef pointLights\n\t\tfor (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {\n\t\t\t// Calculate directional vector of surface to the light\n\t\t\tvPointLightSurfaceToLightDirection[i] = uPointLights[i].position.xyz - vWorldPosition.xyz;\n\t\t\t// Calculate directional vector of camera to the surface\n\t\t\tvPointLightSurfaceToCameraDirection[i] = uCameraPosition - vWorldPosition.xyz;\n\t\t}\n\t\t#endif\n\n\t\tgl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(vPosition, 1.0);\n\n\t\t#HOOK_VERTEX_END\n\t}\n';
var vertexShaderEs100 = '\n\n\t' + _Math.definePI + '\n\t' + _Math.definePITwo + '\n\t#HOOK_DEFINES\n\n\t// Position\n\tuniform mat4 uProjectionMatrix;\n\tuniform mat4 uViewMatrix;\n\tuniform mat4 uViewMatrixInverse;\n\tuniform mat4 uModelMatrix;\n\tuniform mat4 uModelMatrixInverse;\n\tuniform mat3 uNormalMatrix;\n\tattribute vec3 aVertexPosition;\n\tvarying vec3 vPosition;\n\tvarying vec4 vWorldPosition;\n\n\t// Camera\n\tuniform vec3 uCameraPosition;\n\n\t#ifdef vertexColors\n\tattribute vec3 aVertexColor;\n\t#endif\n\n\t// Color\n\tuniform vec3 uDiffuse;\n\tvarying vec3 vDiffuse;\n\n\t// Normal\n\t#ifdef normals\n\tattribute vec3 aVertexNormal;\n\tvarying vec3 vNormal;\n\t#endif\n\n\t// Uv\n\t#ifdef uv\n\tattribute vec2 aUv;\n\tvarying vec2 vUv;\n\t#endif\n\n\t// Lighting\n\t#ifdef pointLights\n\t' + _PointLights.pointLightsEs100 + '\n\t#endif\n\n\t#HOOK_VERTEX_PRE\n\n\tvoid main(void){\n\n\t\tvDiffuse = uDiffuse;\n\n\t\t// Override for custom positioning\n\t\tvec3 transformed = vec3(0.0);\n\n\t\t#ifdef vertexColors\n\t\tvDiffuse = aVertexColor;\n\t\t#endif\n\n\t\t#ifdef uv\n\t\tvUv = aUv;\n\t\t#endif\n\n\t\t#HOOK_VERTEX_MAIN\n\n\t\t#ifdef normals\n\t\tvNormal = uNormalMatrix * aVertexNormal;\n\t\t#endif\n\n\t\t// Vertex position + offset\n\t\tvPosition = aVertexPosition + transformed;\n\n\t\t// Calculate world position of vertex with transformed\n\t\tvWorldPosition = uModelMatrix * vec4(aVertexPosition + transformed, 1.0);\n\n\t\t#ifdef pointLights\n\t\tfor (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {\n\t\t\t// Calculate word position of vertex\n\t\t\tvec3 surfaceWorldPosition = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;\n\t\t\t// Calculate directional vector of surface to the light\n\t\t\tvPointLightSurfaceToLightDirection[i] = uPointLights[i].position - vPosition;\n\t\t\t// Calculate directional vector of camera to the surface\n\t\t\tvPointLightSurfaceToCameraDirection[i] = uCameraPosition - vPosition;\n\t\t}\n\t\t#endif\n\n\t\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(vPosition, 1.0);\n\n\t\t#HOOK_VERTEX_END\n\t}\n';
exports.vertexShaderEs300 = vertexShaderEs300;
exports.vertexShaderEs100 = vertexShaderEs100;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * https://github.com/vorg/pragmatic-pbr/blob/master/local_modules/glsl-envmap-cube/index.glsl
 */
exports.default = "\n/**\n * Samples cubemap environment map\n * @param  {vec3} wcNormal - normal in the world coordinate space\n * @param  {float} - flipEnvMap    -1.0 for left handed coorinate system oriented texture (usual case)\n *                                  1.0 for right handed coorinate system oriented texture\n * @return {vec4} - cubemap texture coordinate\n */\nvec3 envMapCube(vec3 wcNormal, float flipEnvMap) {\n\treturn vec3(flipEnvMap * wcNormal.x, wcNormal.y, wcNormal.z);\n}\n\nvec3 envMapCube(vec3 wcNormal) {\n //-1.0 for left handed coorinate system oriented texture (usual case)\n return envMapCube(wcNormal, -1.0);\n}\n";

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/hughsk/glsl-fog
// https://github.com/hughsk/glsl-fog
var linear = exports.linear = "\nfloat fogLinear(const float dist, const float start, const float end) {\n  return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);\n}\n";
var exp = exports.exp = "\nfloat fogExp(\n  const float dist,\n  const float density\n) {\n  return 1.0 - clamp(exp(-density * dist), 0.0, 1.0);\n}\n";
var exp2 = exports.exp2 = "\nfloat fogExp2(\n  const float dist,\n  const float density\n) {\n  const float LOG2 = -1.442695;\n  float d = density * dist;\n  return 1.0 - clamp(exp2(d * d * LOG2), 0.0, 1.0);\n}\n";
exports.default = {
  linear: linear,
  exp: exp,
  exp2: exp2
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// https://raw.githubusercontent.com/stackgl/glsl-gamma/master/out.glsl
exports.default = "\n\tconst float gamma = 2.2;\n\n\tfloat toGamma(float v) {\n\t  return pow(v, 1.0 / gamma);\n\t}\n\n\tvec2 toGamma(vec2 v) {\n\t  return pow(v, vec2(1.0 / gamma));\n\t}\n\n\tvec3 toGamma(vec3 v) {\n\t  return pow(v, vec3(1.0 / gamma));\n\t}\n\n\tvec4 toGamma(vec4 v) {\n\t  return vec4(toGamma(v.rgb), v.a);\n\t}\n";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://github.com/hughsk/glsl-noise
// https://github.com/hughsk/glsl-noise
var classicNoise2D = exports.classicNoise2D = "\n//\n// GLSL textureless classic 2D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat classicNoise2D(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n";
var classicNoise3D = exports.classicNoise3D = "\n//\n// GLSL textureless classic 3D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat classicNoise3D(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n";
var classicNoise4D = exports.classicNoise4D = "\n//\n// GLSL textureless classic 4D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 fade(vec4 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat classicNoise4D(vec4 P)\n{\n  vec4 Pi0 = floor(P); // Integer part for indexing\n  vec4 Pi1 = Pi0 + 1.0; // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec4 Pf0 = fract(P); // Fractional part for interpolation\n  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.zzzz);\n  vec4 iz1 = vec4(Pi1.zzzz);\n  vec4 iw0 = vec4(Pi0.wwww);\n  vec4 iw1 = vec4(Pi1.wwww);\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n  vec4 ixy00 = permute(ixy0 + iw0);\n  vec4 ixy01 = permute(ixy0 + iw1);\n  vec4 ixy10 = permute(ixy1 + iw0);\n  vec4 ixy11 = permute(ixy1 + iw1);\n\n  vec4 gx00 = ixy00 * (1.0 / 7.0);\n  vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n  vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n  gx00 = fract(gx00) - 0.5;\n  gy00 = fract(gy00) - 0.5;\n  gz00 = fract(gz00) - 0.5;\n  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n  vec4 sw00 = step(gw00, vec4(0.0));\n  gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n  gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n  vec4 gx01 = ixy01 * (1.0 / 7.0);\n  vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n  vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n  gx01 = fract(gx01) - 0.5;\n  gy01 = fract(gy01) - 0.5;\n  gz01 = fract(gz01) - 0.5;\n  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n  vec4 sw01 = step(gw01, vec4(0.0));\n  gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n  gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n  vec4 gx10 = ixy10 * (1.0 / 7.0);\n  vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n  vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n  gx10 = fract(gx10) - 0.5;\n  gy10 = fract(gy10) - 0.5;\n  gz10 = fract(gz10) - 0.5;\n  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n  vec4 sw10 = step(gw10, vec4(0.0));\n  gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n  gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n  vec4 gx11 = ixy11 * (1.0 / 7.0);\n  vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n  vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n  gx11 = fract(gx11) - 0.5;\n  gy11 = fract(gy11) - 0.5;\n  gz11 = fract(gz11) - 0.5;\n  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n  vec4 sw11 = step(gw11, vec4(0.0));\n  gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n  gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n\n  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n  g0000 *= norm00.x;\n  g0100 *= norm00.y;\n  g1000 *= norm00.z;\n  g1100 *= norm00.w;\n\n  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n  g0001 *= norm01.x;\n  g0101 *= norm01.y;\n  g1001 *= norm01.z;\n  g1101 *= norm01.w;\n\n  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n  g0010 *= norm10.x;\n  g0110 *= norm10.y;\n  g1010 *= norm10.z;\n  g1110 *= norm10.w;\n\n  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n  g0011 *= norm11.x;\n  g0111 *= norm11.y;\n  g1011 *= norm11.z;\n  g1111 *= norm11.w;\n\n  float n0000 = dot(g0000, Pf0);\n  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n  float n1111 = dot(g1111, Pf1);\n\n  vec4 fade_xyzw = fade(Pf0);\n  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n  return 2.2 * n_xyzw;\n}\n";
var periodicNoise2D = exports.periodicNoise2D = "\n//\n// GLSL textureless classic 2D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat periodicNoise2D(vec2 P, vec2 rep)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period\n  Pi = mod289(Pi);        // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n";
var periodicNoise3D = exports.periodicNoise3D = "\n//\n// GLSL textureless classic 3D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat periodicNoise3D(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n";
var periodicNoise4D = exports.periodicNoise4D = "\n//\n// GLSL textureless classic 4D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 fade(vec4 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic version\nfloat periodicNoise4D(vec4 P, vec4 rep)\n{\n  vec4 Pi0 = mod(floor(P), rep); // Integer part modulo rep\n  vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec4 Pf0 = fract(P); // Fractional part for interpolation\n  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.zzzz);\n  vec4 iz1 = vec4(Pi1.zzzz);\n  vec4 iw0 = vec4(Pi0.wwww);\n  vec4 iw1 = vec4(Pi1.wwww);\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n  vec4 ixy00 = permute(ixy0 + iw0);\n  vec4 ixy01 = permute(ixy0 + iw1);\n  vec4 ixy10 = permute(ixy1 + iw0);\n  vec4 ixy11 = permute(ixy1 + iw1);\n\n  vec4 gx00 = ixy00 * (1.0 / 7.0);\n  vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n  vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n  gx00 = fract(gx00) - 0.5;\n  gy00 = fract(gy00) - 0.5;\n  gz00 = fract(gz00) - 0.5;\n  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n  vec4 sw00 = step(gw00, vec4(0.0));\n  gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n  gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n  vec4 gx01 = ixy01 * (1.0 / 7.0);\n  vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n  vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n  gx01 = fract(gx01) - 0.5;\n  gy01 = fract(gy01) - 0.5;\n  gz01 = fract(gz01) - 0.5;\n  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n  vec4 sw01 = step(gw01, vec4(0.0));\n  gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n  gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n  vec4 gx10 = ixy10 * (1.0 / 7.0);\n  vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n  vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n  gx10 = fract(gx10) - 0.5;\n  gy10 = fract(gy10) - 0.5;\n  gz10 = fract(gz10) - 0.5;\n  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n  vec4 sw10 = step(gw10, vec4(0.0));\n  gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n  gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n  vec4 gx11 = ixy11 * (1.0 / 7.0);\n  vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n  vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n  gx11 = fract(gx11) - 0.5;\n  gy11 = fract(gy11) - 0.5;\n  gz11 = fract(gz11) - 0.5;\n  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n  vec4 sw11 = step(gw11, vec4(0.0));\n  gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n  gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n\n  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n  g0000 *= norm00.x;\n  g0100 *= norm00.y;\n  g1000 *= norm00.z;\n  g1100 *= norm00.w;\n\n  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n  g0001 *= norm01.x;\n  g0101 *= norm01.y;\n  g1001 *= norm01.z;\n  g1101 *= norm01.w;\n\n  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n  g0010 *= norm10.x;\n  g0110 *= norm10.y;\n  g1010 *= norm10.z;\n  g1110 *= norm10.w;\n\n  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n  g0011 *= norm11.x;\n  g0111 *= norm11.y;\n  g1011 *= norm11.z;\n  g1111 *= norm11.w;\n\n  float n0000 = dot(g0000, Pf0);\n  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n  float n1111 = dot(g1111, Pf1);\n\n  vec4 fade_xyzw = fade(Pf0);\n  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n  return 2.2 * n_xyzw;\n}\n";
var simplexNoise2D = exports.simplexNoise2D = "\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat simplexNoise2D(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n";
var simplexNoise3D = exports.simplexNoise3D = "\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat simplexNoise3D(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n";
var simplexNoise4D = exports.simplexNoise4D = "\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat permute(float x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat simplexNoise4D(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289(i);\n  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute( permute( permute( permute (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0 = grad4(j0,   ip);\n  vec4 p1 = grad4(j1.x, ip);\n  vec4 p2 = grad4(j1.y, ip);\n  vec4 p3 = grad4(j1.z, ip);\n  vec4 p4 = grad4(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var packNormalToRGB = exports.packNormalToRGB = "\n\tvec3 packNormalToRGB(const in vec3 normal) {\n\t  return normalize(normal) * 0.5 + 0.5;\n\t}\n";
exports.default = {
	packNormalToRGB: packNormalToRGB
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// https://raw.githubusercontent.com/stackgl/glsl-gamma/master/out.glsl
// https://raw.githubusercontent.com/stackgl/glsl-gamma/master/out.glsl
var tonemapReinhard = exports.tonemapReinhard = "\n\tvec3 tonemapReinhard(vec3 color) {\n\t  return color / (color + vec3(1.0));\n\t}\n";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * https://github.com/stackgl/glsl-transpose/blob/master/index.glsl
 */
exports.default = "\n\tfloat transpose(float m) {\n\t  return m;\n\t}\n\n\tmat2 transpose(mat2 m) {\n\t  return mat2(m[0][0], m[1][0],\n\t              m[0][1], m[1][1]);\n\t}\n\n\tmat3 transpose(mat3 m) {\n\t  return mat3(m[0][0], m[1][0], m[2][0],\n\t              m[0][1], m[1][1], m[2][1],\n\t              m[0][2], m[1][2], m[2][2]);\n\t}\n\n\tmat4 transpose(mat4 m) {\n\t  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n\t              m[0][1], m[1][1], m[2][1], m[3][1],\n\t              m[0][2], m[1][2], m[2][2], m[3][2],\n\t              m[0][3], m[1][3], m[2][3], m[3][3]);\n\t}\n";

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parse;

var _GL = __webpack_require__(0);

var GL = _interopRequireWildcard(_GL);

var _EsVersion = __webpack_require__(6);

var _EsVersion2 = _interopRequireDefault(_EsVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var WORD_REGX = function WORD_REGX(word) {
    return new RegExp('\\b' + word + '\\b', 'gi');
};
var LINE_REGX = function LINE_REGX(word) {
    return new RegExp('' + word, 'gi');
};
var VERTEX = [{
    match: WORD_REGX('in'),
    replace: 'attribute'
}, {
    match: WORD_REGX('out'),
    replace: 'varying'
}];
var FRAGMENT = [{
    match: WORD_REGX('in'),
    replace: 'varying'
}, {
    match: LINE_REGX('out vec4 outgoingColor;'),
    replace: ''
}, {
    match: WORD_REGX('outgoingColor'),
    replace: 'gl_FragColor'
}, {
    match: WORD_REGX('texture'),
    replace: function replace(shader) {
        // Find all texture defintions
        var textureGlobalRegx = new RegExp('\\btexture\\b', 'gi');
        // Find single texture definition
        var textureSingleRegx = new RegExp('\\btexture\\b', 'i');
        // Gets the texture call signature e.g texture(uTexture1, vUv);
        var textureUniformNameRegx = new RegExp(/texture\(([^)]+)\)/, 'i');
        // Get all matching occurances
        var matches = shader.match(textureGlobalRegx);
        var replacement = '';
        // If nothing matches return
        if (matches === null) return shader;
        // Replace each occurance by it's uniform type
        for (var i = 0; i < matches.length; i++) {
            var match = shader.match(textureUniformNameRegx)[0];
            if (match) {
                // Extract the uniform name
                var uniformName = match.replace('texture(', '').split(',')[0];
                // Find the uniform definition
                var uniformType = shader.match('(.*?) ' + uniformName, 'i')[1];
                uniformType = uniformType.split(' ')[1];
                switch (uniformType) {
                    case 'sampler2D':
                        {
                            replacement = 'texture2D';
                            break;
                        }
                    case 'samplerCube':
                        {
                            replacement = 'textureCube';
                            break;
                        }
                    default:
                }
            }
            shader = shader.replace(textureSingleRegx, replacement);
        }
        return shader;
    }
}];
var GENERIC = [{
    match: LINE_REGX(_EsVersion2.default),
    replace: ''
}];
var VERTEX_RULES = [].concat(GENERIC, VERTEX);
var FRAGMENT_RULES = [].concat(GENERIC, FRAGMENT);
/**
 * Replaces es300 syntax to es100
 */
function parse(shader, shaderType) {
    if (GL.webgl2) {
        return shader;
    }
    var rules = shaderType === 'vertex' ? VERTEX_RULES : FRAGMENT_RULES;
    rules.forEach(function (rule) {
        if (typeof rule.replace === 'function') {
            shader = rule.replace(shader);
        } else {
            shader = shader.replace(rule.match, rule.replace);
        }
    });
    // if (shaderType === 'vertex') {
    // 	console.log(shader);
    // }
    // if (shaderType === 'fragment') {
    // 	console.log(shader);
    // }
    return shader;
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
mat2.fromValues = function(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
mat2.set = function(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
mat2.sub = mat2.subtract;

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
mat2.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

module.exports = mat2;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
mat2d.fromValues = function(a, b, c, d, tx, ty) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
mat2d.set = function(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
};

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
mat2d.sub = mat2d.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
mat2d.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
};

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
};

module.exports = mat2d;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
  scalar: {},
  SIMD: {},
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function(out, a) {
    var a0, a1, a2, a3,
        tmp01, tmp23,
        out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0,  out0);
    SIMD.Float32x4.store(out, 4,  out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8,  out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function(out, a) {
  var row0, row1, row2, row3,
      tmp1,
      minor0, minor1, minor2, minor3,
      det,
      a0 = SIMD.Float32x4.load(a, 0),
      a1 = SIMD.Float32x4.load(a, 4),
      a2 = SIMD.Float32x4.load(a, 8),
      a3 = SIMD.Float32x4.load(a, 12);

  // Compute matrix adjugate
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  // Compute matrix determinant
  det   = SIMD.Float32x4.mul(row0, minor0);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
  det   = SIMD.Float32x4.sub(
               SIMD.Float32x4.add(tmp1, tmp1),
               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
  if (!det) {
      return null;
  }

  // Compute matrix inverse
  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
  return out;
}

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function(out, a) {
  var a0, a1, a2, a3;
  var row0, row1, row2, row3;
  var tmp1;
  var minor0, minor1, minor2, minor3;

  var a0 = SIMD.Float32x4.load(a, 0);
  var a1 = SIMD.Float32x4.load(a, 4);
  var a2 = SIMD.Float32x4.load(a, 8);
  var a3 = SIMD.Float32x4.load(a, 12);

  // Transpose the source matrix.  Sort of.  Not a true transpose operation
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  SIMD.Float32x4.store(out, 0,  minor0);
  SIMD.Float32x4.store(out, 4,  minor1);
  SIMD.Float32x4.store(out, 8,  minor2);
  SIMD.Float32x4.store(out, 12, minor3);
  return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                        SIMD.Float32x4.add(
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

    if (a !== out) {
        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function(out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(
        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(
        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(
        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) { 
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S; 
    out[2] = (mat[1] - mat[4]) / S; 
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S; 
    out[2] = (mat[8] + mat[2]) / S; 
  } else if (mat[5] > mat[10]) { 
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S; 
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S; 
  } else { 
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
};



module.exports = mat4;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);
var mat3 = __webpack_require__(31);
var vec3 = __webpack_require__(32);
var vec4 = __webpack_require__(33);

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

module.exports = quat;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(5);

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

module.exports = vec2;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {
	"name": "ixviii.medium",
	"version": "0.1.0",
	"description": "Personal webgl toolkit.",
	"main": "lib/ixviii.medium.js",
	"scripts": {
		"start": "concurrently 'npm run server' 'npm run examples:js' 'npm run examples:html'",
		"server": "live-server ./examples --port 3000 --quiet --watch ./examples --watch ./src --wait 0",
		"examples:js": "webpack --config webpack.config.examples.js --colors --watch",
		"examples:html": "npm run examples:files; pug --obj ./examples/files.json --watch ./examples/src/templates/*.pug --out ./examples",
		"examples:files": "node ./examples/files; pug --obj ./examples/files.json ./examples/src/templates/*.pug --out ./examples;",
		"examples:build": "webpack --config webpack.config.examples.js --colors; npm run examples:files; pug --obj ./examples/files.json ./examples/src/templates/*.pug --out ./examples",
		"build": "npm run lint; webpack --config webpack.config.build.js --colors; NODE_ENV=production webpack --config webpack.config.build.js --colors",
		"prepublish": "npm run docs; npm run build",
		"lint": "tslint ./src/**/*.ts",
		"docs": "typedoc --target es6 --tsconfig ./tsconfig.json --ignoreCompilerErrors --theme default --name Medium --out ./docs ./src"
	},
	"pre-push": [
		"lint"
	],
	"repository": {
		"type": "git",
		"url": "https://github.com/ixviii/medium.git"
	},
	"author": "Amelie Rosser <mail@ixviii.co.uk> (https://www.ixviii.io)",
	"license": "MIT",
	"bugs": {
		"url": "https://github.com/ixviii/medium/issues"
	},
	"homepage": "https://github.com/ixviii/medium",
	"devDependencies": {
		"@types/webgl2": "0.0.0",
		"babel-cli": "^6.6.5",
		"babel-loader": "^6.2.4",
		"babel-preset-es2015": "^6.6.0",
		"babel-preset-stage-0": "^6.16.0",
		"concurrently": "^3.1.0",
		"dat-gui": "^0.5.0",
		"json-loader": "^0.5.4",
		"live-server": "^1.2.0",
		"pre-push": "^0.1.1",
		"pug-cli": "^1.0.0-alpha6",
		"query-string": "^4.3.1",
		"three-obj": "^0.6.5",
		"ts-loader": "^2.0.1",
		"tslint": "^5.0.0",
		"typedoc": "^0.5.7",
		"typescript": "^2.2.1",
		"webpack": "^2.2.1"
	},
	"dependencies": {
		"@types/gl-matrix": "^2.2.34",
		"gl-matrix": "^2.3.2",
		"happens": "^0.6.0",
		"parse-hdr": "^1.0.0",
		"webgl-obj-loader": "^0.1.1"
	}
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

//Code ported by Marcin Ignac (2014)
//Based on Java implementation from
//https://code.google.com/r/cys12345-research/source/browse/hdr/image_processor/RGBE.java?r=7d84e9fd866b24079dbe61fa0a966ce8365f5726
var radiancePattern = "#\\?RADIANCE"
var commentPattern = "#.*"
var gammaPattern = "GAMMA=";
var exposurePattern = "EXPOSURE=\\s*([0-9]*[.][0-9]*)";
var formatPattern = "FORMAT=32-bit_rle_rgbe";
var widthHeightPattern = "-Y ([0-9]+) \\+X ([0-9]+)";

//http://croquetweak.blogspot.co.uk/2014/08/deconstructing-floats-frexp-and-ldexp.html
function ldexp(mantissa, exponent) {
    return exponent > 1023 // avoid multiplying by infinity
        ? mantissa * Math.pow(2, 1023) * Math.pow(2, exponent - 1023)
        : exponent < -1074 // avoid multiplying by zero
        ? mantissa * Math.pow(2, -1074) * Math.pow(2, exponent + 1074)
        : mantissa * Math.pow(2, exponent);
}

function readPixelsRawRLE(buffer, data, offset, fileOffset, scanline_width, num_scanlines) {
    var rgbe = new Array(4);
    var scanline_buffer = null;
    var ptr;
    var ptr_end;
    var count;
    var buf = new Array(2);
    var bufferLength = buffer.length;

    function readBuf(buf) {
      var bytesRead = 0;
      do {
        buf[bytesRead++] = buffer[fileOffset];
      } while(++fileOffset < bufferLength && bytesRead < buf.length);
      return bytesRead;
    }

    function readBufOffset(buf, offset, length) {
      var bytesRead = 0;
      do {
        buf[offset + bytesRead++] = buffer[fileOffset];
      } while(++fileOffset < bufferLength && bytesRead < length);
      return bytesRead;
    }

    function readPixelsRaw(buffer, data, offset, numpixels) {
        var numExpected = 4 * numpixels;
        var numRead = readBufOffset(data, offset, numExpected);
        if (numRead < numExpected) {
            throw new Error('Error reading raw pixels: got ' + numRead + ' bytes, expected ' + numExpected);
        }
    }

    while (num_scanlines > 0) {
      if (readBuf(rgbe) < rgbe.length) {
        throw new Error("Error reading bytes: expected " + rgbe.length);
      }

      if ((rgbe[0] != 2)||(rgbe[1] != 2)||((rgbe[2] & 0x80) != 0)) {
          //this file is not run length encoded
          data[offset++] = rgbe[0];
          data[offset++] = rgbe[1];
          data[offset++] = rgbe[2];
          data[offset++] = rgbe[3];
          readPixelsRaw(buffer, data, offset, scanline_width*num_scanlines-1);
          return;
      }

      if ((((rgbe[2] & 0xFF)<<8) | (rgbe[3] & 0xFF)) != scanline_width) {
        throw new Error("Wrong scanline width " + (((rgbe[2] & 0xFF)<<8) | (rgbe[3] & 0xFF)) + ", expected " + scanline_width);
      }

      if (scanline_buffer == null) {
        scanline_buffer = new Array(4*scanline_width);
      }

      ptr = 0;
      /* read each of the four channels for the scanline into the buffer */
      for (var i=0; i<4; i++) {
        ptr_end = (i+1)*scanline_width;
        while(ptr < ptr_end) {
          if (readBuf(buf) < buf.length) {
            throw new Error("Error reading 2-byte buffer");
          }
          if ((buf[0] & 0xFF) > 128) {
            /* a run of the same value */
            count = (buf[0] & 0xFF) - 128;
            if ((count == 0) || (count > ptr_end - ptr)) {
              throw new Error("Bad scanline data");
            }
            while(count-- > 0)
              scanline_buffer[ptr++] = buf[1];
          }
          else {
            /* a non-run */
            count = buf[0] & 0xFF;
            if ((count == 0) || (count > ptr_end - ptr)) {
              throw new Error("Bad scanline data");
            }
            scanline_buffer[ptr++] = buf[1];
            if (--count > 0) {
              if (readBufOffset(scanline_buffer, ptr, count) < count) {
                throw new Error("Error reading non-run data");
              }
              ptr += count;
            }
          }
        }
      }

      /* copy byte data to output */
      for(var i = 0; i < scanline_width; i++) {
        data[offset + 0] = scanline_buffer[i];
        data[offset + 1] = scanline_buffer[i+scanline_width];
        data[offset + 2] = scanline_buffer[i+2*scanline_width];
        data[offset + 3] = scanline_buffer[i+3*scanline_width];
        offset += 4;
      }

      num_scanlines--;
    }

}

//Returns data as floats and flipped along Y by default
function parseHdr(buffer) {
    if (buffer instanceof ArrayBuffer) {
        buffer = new Uint8Array(buffer);
    }

    var fileOffset = 0;
    var bufferLength = buffer.length;

    var NEW_LINE = 10;

    function readLine() {
        var buf = "";
        do {
            var b = buffer[fileOffset];
            if (b == NEW_LINE) {
                ++fileOffset
                break;
            }
            buf += String.fromCharCode(b);
        } while(++fileOffset < bufferLength);
        return buf;
    }

    var width = 0;
    var height = 0;
    var exposure = 1;
    var gamma = 1;
    var rle = false;

    for(var i=0; i<20; i++) {
        var line = readLine();
        var match;
        if (match = line.match(radiancePattern)) {
        }
        else if (match = line.match(formatPattern)) {
            rle = true;
        }
        else if (match = line.match(exposurePattern)) {
            exposure = Number(match[1]);
        }
        else if (match = line.match(commentPattern)) {
        }
        else if (match = line.match(widthHeightPattern)) {
            height = Number(match[1]);
            width = Number(match[2]);
            break;
        }
    }

    if (!rle) {
        throw new Error("File is not run length encoded!");
    }

    var data = new Uint8Array(width * height * 4);
    var scanline_width = width;
    var num_scanlines = height;

    readPixelsRawRLE(buffer, data, 0, fileOffset, scanline_width, num_scanlines);

    //TODO: Should be Float16
    var floatData = new Float32Array(width * height * 4);
    for(var offset=0; offset<data.length; offset += 4) {
        var r = data[offset+0]/255;
        var g = data[offset+1]/255;
        var b = data[offset+2]/255;
        var e = data[offset+3];
        var f = Math.pow(2.0, e - 128.0)

        r *= f;
        g *= f;
        b *= f;

        var floatOffset = offset;

        floatData[floatOffset+0] = r;
        floatData[floatOffset+1] = g;
        floatData[floatOffset+2] = b;
        floatData[floatOffset+3] = 1.0;
    }

    return {
        shape: [width, height],
        exposure: exposure,
        gamma: gamma,
        data: floatData
    }
}

module.exports = parseHdr;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

(function (undefined) {
  'use strict';

  var OBJ = {};

  if (true) {
    module.exports = OBJ;
  } else {
    window.OBJ = OBJ;
  }

  /**
   * The main Mesh class. The constructor will parse through the OBJ file data
   * and collect the vertex, vertex normal, texture, and face information. This
   * information can then be used later on when creating your VBOs. See
   * OBJ.initMeshBuffers for an example of how to use the newly created Mesh
   *
   * @class Mesh
   * @constructor
   *
   * @param {String} objectData a string representation of an OBJ file with newlines preserved.
   */
  OBJ.Mesh = function (objectData) {
    /*
     The OBJ file format does a sort of compression when saving a model in a
     program like Blender. There are at least 3 sections (4 including textures)
     within the file. Each line in a section begins with the same string:
       * 'v': indicates vertex section
       * 'vn': indicates vertex normal section
       * 'f': indicates the faces section
       * 'vt': indicates vertex texture section (if textures were used on the model)
     Each of the above sections (except for the faces section) is a list/set of
     unique vertices.

     Each line of the faces section contains a list of
     (vertex, [texture], normal) groups
     Some examples:
         // the texture index is optional, both formats are possible for models
         // without a texture applied
         f 1/25 18/46 12/31
         f 1//25 18//46 12//31

         // A 3 vertex face with texture indices
         f 16/92/11 14/101/22 1/69/1

         // A 4 vertex face
         f 16/92/11 40/109/40 38/114/38 14/101/22

     The first two lines are examples of a 3 vertex face without a texture applied.
     The second is an example of a 3 vertex face with a texture applied.
     The third is an example of a 4 vertex face. Note: a face can contain N
     number of vertices.

     Each number that appears in one of the groups is a 1-based index
     corresponding to an item from the other sections (meaning that indexing
     starts at one and *not* zero).

     For example:
         `f 16/92/11` is saying to
           - take the 16th element from the [v] vertex array
           - take the 92nd element from the [vt] texture array
           - take the 11th element from the [vn] normal array
         and together they make a unique vertex.
     Using all 3+ unique Vertices from the face line will produce a polygon.

     Now, you could just go through the OBJ file and create a new vertex for
     each face line and WebGL will draw what appears to be the same model.
     However, vertices will be overlapped and duplicated all over the place.

     Consider a cube in 3D space centered about the origin and each side is
     2 units long. The front face (with the positive Z-axis pointing towards
     you) would have a Top Right vertex (looking orthogonal to its normal)
     mapped at (1,1,1) The right face would have a Top Left vertex (looking
     orthogonal to its normal) at (1,1,1) and the top face would have a Bottom
     Right vertex (looking orthogonal to its normal) at (1,1,1). Each face
     has a vertex at the same coordinates, however, three distinct vertices
     will be drawn at the same spot.

     To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`
     groups), while iterating through the face lines, when a group is encountered
     the whole group string ('16/92/11') is checked to see if it exists in the
     packed.hashindices object, and if it doesn't, the indices it specifies
     are used to look up each attribute in the corresponding attribute arrays
     already created. The values are then copied to the corresponding unpacked
     array (flattened to play nice with WebGL's ELEMENT_ARRAY_BUFFER indexing),
     the group string is added to the hashindices set and the current unpacked
     index is used as this hashindices value so that the group of elements can
     be reused. The unpacked index is incremented. If the group string already
     exists in the hashindices object, its corresponding value is the index of
     that group and is appended to the unpacked indices array.
     */
    var verts = [], vertNormals = [], textures = [], unpacked = {};
    // unpacking stuff
    unpacked.verts = [];
    unpacked.norms = [];
    unpacked.textures = [];
    unpacked.hashindices = {};
    unpacked.indices = [];
    unpacked.index = 0;
    // array of lines separated by the newline
    var lines = objectData.split('\n');
    
    var VERTEX_RE = /^v\s/;
    var NORMAL_RE = /^vn\s/;
    var TEXTURE_RE = /^vt\s/;
    var FACE_RE = /^f\s/;
    var WHITESPACE_RE = /\s+/;
    
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      var elements = line.split(WHITESPACE_RE);
      elements.shift();
      
      if (VERTEX_RE.test(line)) {
        // if this is a vertex
        verts.push.apply(verts, elements);
      } else if (NORMAL_RE.test(line)) {
        // if this is a vertex normal
        vertNormals.push.apply(vertNormals, elements);
      } else if (TEXTURE_RE.test(line)) {
        // if this is a texture
        textures.push.apply(textures, elements);
      } else if (FACE_RE.test(line)) {
        // if this is a face
        /*
        split this face into an array of vertex groups
        for example:
           f 16/92/11 14/101/22 1/69/1
        becomes:
          ['16/92/11', '14/101/22', '1/69/1'];
        */
        var quad = false;
        for (var j = 0, eleLen = elements.length; j < eleLen; j++){
            // Triangulating quads
            // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
            // corresponding triangles:
            //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
            //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
            if(j === 3 && !quad) {
                // add v2/t2/vn2 in again before continuing to 3
                j = 2;
                quad = true;
            }
            if(elements[j] in unpacked.hashindices){
                unpacked.indices.push(unpacked.hashindices[elements[j]]);
            }
            else{
                /*
                Each element of the face line array is a vertex which has its
                attributes delimited by a forward slash. This will separate
                each attribute into another array:
                    '19/92/11'
                becomes:
                    vertex = ['19', '92', '11'];
                where
                    vertex[0] is the vertex index
                    vertex[1] is the texture index
                    vertex[2] is the normal index
                 Think of faces having Vertices which are comprised of the
                 attributes location (v), texture (vt), and normal (vn).
                 */
                var vertex = elements[ j ].split( '/' );
                /*
                 The verts, textures, and vertNormals arrays each contain a
                 flattend array of coordinates.

                 Because it gets confusing by referring to vertex and then
                 vertex (both are different in my descriptions) I will explain
                 what's going on using the vertexNormals array:

                 vertex[2] will contain the one-based index of the vertexNormals
                 section (vn). One is subtracted from this index number to play
                 nice with javascript's zero-based array indexing.

                 Because vertexNormal is a flattened array of x, y, z values,
                 simple pointer arithmetic is used to skip to the start of the
                 vertexNormal, then the offset is added to get the correct
                 component: +0 is x, +1 is y, +2 is z.

                 This same process is repeated for verts and textures.
                 */
                // vertex position
                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
                unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]);
                // vertex textures
                if (textures.length) {
                  unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 0]);
                  unpacked.textures.push(+textures[(vertex[1] - 1) * 2 + 1]);
                }
                // vertex normals
                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 0]);
                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 1]);
                unpacked.norms.push(+vertNormals[(vertex[2] - 1) * 3 + 2]);
                // add the newly created vertex to the list of indices
                unpacked.hashindices[elements[j]] = unpacked.index;
                unpacked.indices.push(unpacked.index);
                // increment the counter
                unpacked.index += 1;
            }
            if(j === 3 && quad) {
                // add v0/t0/vn0 onto the second triangle
                unpacked.indices.push( unpacked.hashindices[elements[0]]);
            }
        }
      }
    }
    this.vertices = unpacked.verts;
    this.vertexNormals = unpacked.norms;
    this.textures = unpacked.textures;
    this.indices = unpacked.indices;
  }

  var Ajax = function(){
    // this is just a helper class to ease ajax calls
    var _this = this;
    this.xmlhttp = new XMLHttpRequest();

    this.get = function(url, callback){
      _this.xmlhttp.onreadystatechange = function(){
        if(_this.xmlhttp.readyState === 4){
          callback(_this.xmlhttp.responseText, _this.xmlhttp.status);
        }
      };
      _this.xmlhttp.open('GET', url, true);
      _this.xmlhttp.send();
    }
  };

  /**
   * Takes in an object of `mesh_name`, `'/url/to/OBJ/file'` pairs and a callback
   * function. Each OBJ file will be ajaxed in and automatically converted to
   * an OBJ.Mesh. When all files have successfully downloaded the callback
   * function provided will be called and passed in an object containing
   * the newly created meshes.
   *
   * **Note:** In order to use this function as a way to download meshes, a
   * webserver of some sort must be used.
   *
   * @param {Object} nameAndURLs an object where the key is the name of the mesh and the value is the url to that mesh's OBJ file
   *
   * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object
   *
   * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { '<mesh_name>': OBJ.Mesh }
   *
   */
  OBJ.downloadMeshes = function (nameAndURLs, completionCallback, meshes){
    // the total number of meshes. this is used to implement "blocking"
    var semaphore = Object.keys(nameAndURLs).length;
    // if error is true, an alert will given
    var error = false;
    // this is used to check if all meshes have been downloaded
    // if meshes is supplied, then it will be populated, otherwise
    // a new object is created. this will be passed into the completionCallback
    if(meshes === undefined) meshes = {};
    // loop over the mesh_name,url key,value pairs
    for(var mesh_name in nameAndURLs){
      if(nameAndURLs.hasOwnProperty(mesh_name)){
        new Ajax().get(nameAndURLs[mesh_name], (function(name) {
          return function (data, status) {
            if (status === 200) {
              meshes[name] = new OBJ.Mesh(data);
            }
            else {
              error = true;
              console.error('An error has occurred and the mesh "' +
                name + '" could not be downloaded.');
            }
            // the request has finished, decrement the counter
            semaphore--;
            if (semaphore === 0) {
              if (error) {
                // if an error has occurred, the user is notified here and the
                // callback is not called
                console.error('An error has occurred and one or meshes has not been ' +
                  'downloaded. The execution of the script has terminated.');
                throw '';
              }
              // there haven't been any errors in retrieving the meshes
              // call the callback
              completionCallback(meshes);
            }
          }
        })(mesh_name));
      }
    }
  };

  var _buildBuffer = function( gl, type, data, itemSize ){
    var buffer = gl.createBuffer();
    var arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
    buffer.itemSize = itemSize;
    buffer.numItems = data.length / itemSize;
    return buffer;
  }

  /**
   * Takes in the WebGL context and a Mesh, then creates and appends the buffers
   * to the mesh object as attributes.
   *
   * @param {WebGLRenderingContext} gl the `canvas.getContext('webgl')` context instance
   * @param {Mesh} mesh a single `OBJ.Mesh` instance
   *
   * The newly created mesh attributes are:
   *
   * Attrbute | Description
   * :--- | ---
   * **normalBuffer**       |contains the model&#39;s Vertex Normals
   * normalBuffer.itemSize  |set to 3 items
   * normalBuffer.numItems  |the total number of vertex normals
   * |
   * **textureBuffer**      |contains the model&#39;s Texture Coordinates
   * textureBuffer.itemSize |set to 2 items
   * textureBuffer.numItems |the number of texture coordinates
   * |
   * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)
   * vertexBuffer.itemSize  |set to 3 items
   * vertexBuffer.numItems  |the total number of vertices
   * |
   * **indexBuffer**        |contains the indices of the faces
   * indexBuffer.itemSize   |is set to 1
   * indexBuffer.numItems   |the total number of indices
   *
   * A simple example (a lot of steps are missing, so don't copy and paste):
   *
   *     var gl   = canvas.getContext('webgl'),
   *         mesh = OBJ.Mesh(obj_file_data);
   *     // compile the shaders and create a shader program
   *     var shaderProgram = gl.createProgram();
   *     // compilation stuff here
   *     ...
   *     // make sure you have vertex, vertex normal, and texture coordinate
   *     // attributes located in your shaders and attach them to the shader program
   *     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
   *     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
   *
   *     shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
   *     gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
   *
   *     shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
   *     gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
   *
   *     // create and initialize the vertex, vertex normal, and texture coordinate buffers
   *     // and save on to the mesh object
   *     OBJ.initMeshBuffers(gl, mesh);
   *
   *     // now to render the mesh
   *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
   *     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
   *
   *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
   *     gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
   *
   *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
   *     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
   *
   *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);
   *     gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
   */
  OBJ.initMeshBuffers = function( gl, mesh ){
    mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
    mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, 2);
    mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
    mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
  }

  OBJ.deleteMeshBuffers = function( gl, mesh ){
    gl.deleteBuffer(mesh.normalBuffer);
    gl.deleteBuffer(mesh.textureBuffer);
    gl.deleteBuffer(mesh.vertexBuffer);
    gl.deleteBuffer(mesh.indexBuffer);
  }
})();



/***/ })
/******/ ]);