'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = require('../core/GL');

var GL = _interopRequireWildcard(_GL);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
	function Box() {
		var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
		var depth = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

		_classCallCheck(this, Box);

		this._width = width;
		this._height = height;
		this._depth = depth;
		this.colors = [];

		var gl = GL.get();

		/*
  	(-1, 1)  (0, 1)  (1, 1)
  		(-1, 0)  (0, 0)  (1, 0)
  		(-1,-1)  (0,-1)  (1,-1)
   */

		// Vertex positions
		this.vertexPositionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

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

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		this.vertexPositionBuffer.itemSize = 3;
		this.vertexPositionBuffer.numItems = 24;

		// Vertex indices
		this.vertexIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);

		var indices = [0, 1, 2, 0, 2, 3, // Front face
		4, 5, 6, 4, 6, 7, // Back face
		8, 9, 10, 8, 10, 11, // Top face
		12, 13, 14, 12, 14, 15, // Bottom face
		16, 17, 18, 16, 18, 19, // Right face
		20, 21, 22, 20, 22, 23 // Left face
		];

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		this.vertexIndexBuffer.itemSize = 1;
		this.vertexIndexBuffer.numItems = 36;

		// Vertex normals
		this.vertexNormalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);

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

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

		this.vertexNormalBuffer.itemSize = 3;
		this.vertexNormalBuffer.numItems = 24;
	}

	_createClass(Box, [{
		key: 'setVertexColors',
		value: function setVertexColors(colors) {

			var gl = GL.get();

			// Vertex colors
			this.vertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

			this.vertexColorBuffer.itemSize = 4;
			this.vertexColorBuffer.numItems = 24;
		}
	}]);

	return Box;
}();

exports.default = Box;