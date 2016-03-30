'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = require('./GL');

var GL = _interopRequireWildcard(_GL);

var _vertex = require('../shaders/vertex.glsl');

var _vertex2 = _interopRequireDefault(_vertex);

var _frag = require('../shaders/frag.glsl');

var _frag2 = _interopRequireDefault(_frag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glslify = require('glslify');

var Shader = function () {
	function Shader(options) {
		_classCallCheck(this, Shader);

		var defaults = {
			vertexColors: false,
			vertexNormals: false,
			vertexShader: _vertex2.default,
			fragmentShader: _frag2.default
		};

		this.settings = Object.assign({}, defaults, options);

		var gl = GL.get();

		// Create program
		this.vertexShader = this._compile('vs', this.settings.vertexShader);
		this.fragmentShader = this._compile('fs', this.settings.fragmentShader);

		this.program = gl.createProgram();

		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);
		gl.linkProgram(this.program);

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.warn('Failed to initialise shaders');
		}

		this.vertexPositionAttribute = gl.getAttribLocation(this.program, 'aVertexPosition');
		gl.enableVertexAttribArray(this.vertexPositionAttribute);

		if (this.settings.vertexNormals) {
			this.vertexNormalAttribute = gl.getAttribLocation(this.program, 'aVertexNormal');
			gl.enableVertexAttribArray(this.vertexNormalAttribute);
		}

		if (this.settings.vertexColors) {
			this.vertexColorAttribute = gl.getAttribLocation(this.program, 'aVertexColor');
			gl.enableVertexAttribArray(this.vertexColorAttribute);
		}

		// console.log(this.vertexPositionAttribute);
		// console.log(this.vertexNormalAttribute);
		// console.log(this.vertexColorAttribute);

		gl.useProgram(this.program);

		this.pMatrixUniform = gl.getUniformLocation(this.program, 'uPMatrix');
		this.mvMatrixUniform = gl.getUniformLocation(this.program, 'uMVMatrix');
		this.mMatrixUniform = gl.getUniformLocation(this.program, 'uModelMatrix');
	}

	_createClass(Shader, [{
		key: 'bindProgram',
		value: function bindProgram() {
			var gl = GL.get();
			gl.useProgram(this.program);
		}
	}, {
		key: 'setUniforms',
		value: function setUniforms(modelViewMatrix, projectionMatrix, modelMatrix) {

			var gl = GL.get();

			gl.uniformMatrix4fv(this.pMatrixUniform, false, projectionMatrix);
			gl.uniformMatrix4fv(this.mvMatrixUniform, false, modelViewMatrix);
			gl.uniformMatrix4fv(this.mMatrixUniform, false, modelMatrix);
		}
	}, {
		key: '_compile',
		value: function _compile(type, source) {

			var gl = GL.get();
			var shader = void 0;

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
				console.warn('Failed to compile shader', gl.getShaderInfoLog(shader));
				return null;
			}

			return shader;
		}
	}]);

	return Shader;
}();

exports.default = Shader;