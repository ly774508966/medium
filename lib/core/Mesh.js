'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = require('../core/GL');

var GL = _interopRequireWildcard(_GL);

var _glMatrix = require('gl-matrix');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesh = function () {
	function Mesh(geometry, shader) {
		_classCallCheck(this, Mesh);

		this.geometry = geometry;
		this.shader = shader;
		this.position = _glMatrix.vec3.create();
		this.rotation = _glMatrix.vec3.create();
	}

	_createClass(Mesh, [{
		key: 'draw',
		value: function draw(modelViewMatrix, projectionMatrix) {
			var gl = GL.get();

			this.shader.bindProgram();

			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer);
			gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexColorBuffer);
			gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.geometry.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

			this.shader.setUniforms(modelViewMatrix, projectionMatrix);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.geometry.vertexPositionBuffer.numItems);
		}
	}]);

	return Mesh;
}();

exports.default = Mesh;