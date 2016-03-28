'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glslify = require('glslify');


var triangleVertexPositionBuffer = null;
var triangleVertexColorBuffer = null;
var squareVertexPositionBuffer = null;
var squareVertexColorBuffer = null;
var cubeVertexPositionBuffer = null;
var cubeVertexColorBuffer = null;
var cubeVertexIndexBuffer = null;
var gl = undefined;
var mvMatrix = _glMatrix.mat4.create();
var pMatrix = _glMatrix.mat4.create();
var outMatrix = _glMatrix.mat4.create();
var shaderProgram = void 0;
var rotation = 0;
var mvMatrixStack = [];

function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}

var Renderer = function () {
	function Renderer() {
		_classCallCheck(this, Renderer);

		this._canvas = document.createElement('canvas');
		this._canvas.width = 1280 * 0.6;
		this._canvas.height = 720 * 0.6;
		document.body.appendChild(this._canvas);

		this._initGL(this._canvas);

		if (gl === undefined) {
			console.log('(');
			return;
		}

		this._initShaders();
		this._initBuffers();

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	_createClass(Renderer, [{
		key: '_initGL',
		value: function _initGL(canvas) {

			try {
				gl = canvas.getContext('experimental-webgl');
				gl.viewportWidth = canvas.width;
				gl.viewportHeight = canvas.height;
			} catch (error) {
				console.log('Webgl not supported');
			}
		}
	}, {
		key: '_compileShader',
		value: function _compileShader(shaderStr, type) {

			var shader = void 0;

			switch (type) {
				case 'vs':
					shader = gl.createShader(gl.VERTEX_SHADER);
					break;
				default:
					shader = gl.createShader(gl.FRAGMENT_SHADER);
			}

			gl.shaderSource(shader, shaderStr);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.warn('failed to compile shader', gl.getShaderInfoLog(shader));
				return null;
			}

			return shader;
		}
	}, {
		key: '_initShaders',
		value: function _initShaders() {

			var vertexShader = this._compileShader(glslify('../shaders/vertex.glsl'), 'vs');
			var fragmentShader = this._compileShader(glslify('../shaders/frag.glsl'), 'fs');

			shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				console.warn('could not initialise shaders');
			}

			gl.useProgram(shaderProgram);

			shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
			gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

			shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor');
			gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

			shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
			shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');

			console.log('shaderProgram', shaderProgram);
		}
	}, {
		key: '_setMatrixUniforms',
		value: function _setMatrixUniforms() {
			gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
			gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
		}
	}, {
		key: '_initBuffers',
		value: function _initBuffers() {

			triangleVertexPositionBuffer = null;
			triangleVertexColorBuffer = null;
			squareVertexPositionBuffer = null;
			squareVertexColorBuffer = null;

			cubeVertexPositionBuffer = null;
			cubeVertexColorBuffer = null;
			cubeVertexIndexBuffer = null;

			// Setup triangle buffer
			triangleVertexPositionBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);

			var vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];

			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

			triangleVertexColorBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
			triangleVertexPositionBuffer.itemSize = 3;
			triangleVertexPositionBuffer.numItems = 3;

			var vertexColors = [255, 0.0, 0.0, 255, 0.0, 255, 0.0, 255, 0.0, 0.0, 255, 255];

			gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(vertexColors), gl.STATIC_DRAW);

			triangleVertexColorBuffer.itemSize = 4;
			triangleVertexColorBuffer.numItems = 3;

			// Setup square buffer
			squareVertexPositionBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);

			vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			squareVertexPositionBuffer.itemSize = 3;
			squareVertexPositionBuffer.numItems = 4;

			squareVertexColorBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);

			vertexColors = [255, 0.0, 0.0, 255, 0.0, 255, 0.0, 255, 0.0, 0.0, 255, 255, 255, 1.0, 0.0, 255];

			gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(vertexColors), gl.STATIC_DRAW);

			squareVertexColorBuffer.itemSize = 4;
			squareVertexColorBuffer.numItems = 4;

			// Cube positions
			cubeVertexPositionBuffer = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);

			vertices = [
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

			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

			cubeVertexPositionBuffer.itemSize = 3;
			cubeVertexPositionBuffer.numItems = 24;

			// Cube colors
			cubeVertexColorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);

			vertexColors = [[1.0, 0.0, 0.0, 1.0], // Front face
			[1.0, 1.0, 0.0, 1.0], // Back face
			[0.0, 1.0, 0.0, 1.0], // Top face
			[1.0, 0.5, 0.5, 1.0], // Bottom face
			[1.0, 0.0, 1.0, 1.0], // Right face
			[0.0, 0.0, 1.0, 1.0]];

			// Left face
			var unpackedColors = [];
			for (var i in vertexColors) {
				var color = vertexColors[i];
				for (var j = 0; j < 4; j++) {
					unpackedColors = unpackedColors.concat(color);
				}
			}

			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);

			cubeVertexColorBuffer.itemSize = 4;
			cubeVertexColorBuffer.numItems = 24;

			// Cube indices
			cubeVertexIndexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

			var indices = [0, 1, 2, 0, 2, 3, // Front face
			4, 5, 6, 4, 6, 7, // Back face
			8, 9, 10, 8, 10, 11, // Top face
			12, 13, 14, 12, 14, 15, // Bottom face
			16, 17, 18, 16, 18, 19, // Right face
			20, 21, 22, 20, 22, 23 // Left face
			];

			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
			cubeVertexIndexBuffer.itemSize = 1;
			cubeVertexIndexBuffer.numItems = 36;
		}
	}, {
		key: 'mvPushMatrix',
		value: function mvPushMatrix() {

			var copy = _glMatrix.mat4.create();
			_glMatrix.mat4.copy(copy, mvMatrix);
			mvMatrixStack.push(copy);
		}
	}, {
		key: 'mvPopMatrix',
		value: function mvPopMatrix() {
			if (mvMatrixStack.length == 0) {
				throw 'Invalid mvPopMatrix';
			}
			mvMatrix = mvMatrixStack.pop();
		}
	}, {
		key: 'draw',
		value: function draw() {

			rotation += 1;

			gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			_glMatrix.mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

			_glMatrix.mat4.identity(mvMatrix);

			_glMatrix.mat4.translate(mvMatrix, mvMatrix, [-3.0, 0.0, -7.0]);

			this.mvPushMatrix();
			_glMatrix.mat4.rotate(mvMatrix, mvMatrix, degToRad(rotation), [0, 1, 0]);

			gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.UNSIGNED_BYTE, true, 0, 0);

			this._setMatrixUniforms();
			gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

			this.mvPopMatrix();

			_glMatrix.mat4.translate(mvMatrix, mvMatrix, [3.0, 0.0, -7.0]);
			this.mvPushMatrix();

			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			// http://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html
			gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.UNSIGNED_BYTE, true, 0, 0);

			this._setMatrixUniforms();

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
			this.mvPopMatrix();

			// Draw cube
			this.mvPushMatrix();
			_glMatrix.mat4.translate(mvMatrix, mvMatrix, [10.0, 0.0, -5.0]);
			_glMatrix.mat4.rotate(mvMatrix, mvMatrix, degToRad(rotation), [1, 1, 0]);

			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

			this._setMatrixUniforms();

			gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

			this.mvPopMatrix();
		}
	}]);

	return Renderer;
}();

exports.default = Renderer;