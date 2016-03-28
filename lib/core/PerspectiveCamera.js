'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PerspectiveCamera = function () {
	function PerspectiveCamera() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, PerspectiveCamera);

		var defaults = {
			fov: 70
		};

		var settings = Object.assign({}, defaults, options);

		this.position = _glMatrix.vec3.fromValues(0, 0, 0);
		this.center = _glMatrix.vec3.fromValues(0, 0, 0);
		this.up = _glMatrix.vec3.fromValues(0, 1, 0);
		this.fov = settings.fov;
	}

	_createClass(PerspectiveCamera, [{
		key: 'setPosition',
		value: function setPosition() {
			var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

			_glMatrix.vec3.set(this.position, x, y, z);
		}
	}, {
		key: 'setLookAt',
		value: function setLookAt() {
			var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

			_glMatrix.vec3.set(this.center, x, y, z);
		}
	}]);

	return PerspectiveCamera;
}();

exports.default = PerspectiveCamera;