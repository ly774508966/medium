'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _math = require('../utils/math');

var _Mesh2 = require('../core/Mesh');

var _Mesh3 = _interopRequireDefault(_Mesh2);

var _Shader = require('../core/Shader');

var _Shader2 = _interopRequireDefault(_Shader);

var _GL = require('../core/GL');

var GL = _interopRequireWildcard(_GL);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VertexShader = '\nattribute vec3 aVertexPosition;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvoid main(void){\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}\n';

var FragmentShader = '\nprecision mediump float;\n\nvoid main(void){\n\tgl_FragColor = vec4(vec3(0.5), 1.0);\n}\n';

var GridGeometry = function GridGeometry(size, divisions) {
	_classCallCheck(this, GridGeometry);

	this._size = size;
	this._divisions = divisions;

	var gl = GL.get();

	// Vertex positions
	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);

	var vertices = [];
	var halfSize = this._size * 0.5;

	for (var i = 0; i < this._divisions; i++) {
		var x1 = (0, _math.lerp)(-halfSize, halfSize, i / (this._divisions - 1));
		var y1 = 0;
		var z1 = -halfSize;
		var x2 = (0, _math.lerp)(-halfSize, halfSize, i / (this._divisions - 1));
		var y2 = 0;
		var z2 = halfSize;
		vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
	}

	for (var _i = 0; _i < this._divisions; _i++) {
		var _x = -halfSize;
		var _y = 0;
		var _z = (0, _math.lerp)(-halfSize, halfSize, _i / (this._divisions - 1));
		var _x2 = halfSize;
		var _y2 = 0;
		var _z2 = (0, _math.lerp)(-halfSize, halfSize, _i / (this._divisions - 1));
		vertices = vertices.concat([_x, _y, _z, _x2, _y2, _z2]);
	}

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	this.vertexPositionBuffer.itemSize = 3;
	this.vertexPositionBuffer.numItems = this._divisions * 4;
};

var Grid = function (_Mesh) {
	_inherits(Grid, _Mesh);

	function Grid() {
		var size = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		var divisions = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

		_classCallCheck(this, Grid);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, new GridGeometry(size, divisions), new _Shader2.default({
			vertexShader: VertexShader,
			fragmentShader: FragmentShader
		})));
	}

	_createClass(Grid, [{
		key: 'draw',
		value: function draw(modelViewMatrix, projectionMatrix) {

			var gl = GL.get();

			this.shader.bindProgram();

			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer);
			gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			this.shader.setUniforms(modelViewMatrix, projectionMatrix);

			gl.drawArrays(gl.LINES, 0, this.geometry.vertexPositionBuffer.numItems);
		}
	}]);

	return Grid;
}(_Mesh3.default);

exports.default = Grid;