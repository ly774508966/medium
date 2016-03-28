'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = require('./GL');

var GL = _interopRequireWildcard(_GL);

var _glMatrix = require('gl-matrix');

var _math = require('../utils/math');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
	function Renderer() {
		var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Renderer);

		// Default renderer settings
		var defaults = {
			width: 1280,
			height: 720
		};

		// Apply defaults
		Object.assign(this, defaults, settings);

		// Create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// Setup matrices
		this.modelViewMatrix = _glMatrix.mat4.create();
		this.projectionMatrix = _glMatrix.mat4.create();

		// Matrix stack for scene object translations
		this.modelViewMatrixStack = [];

		this.pixelRatio = 1;

		// Try initialising gl
		try {
			var _gl = this.canvas.getContext('experimental-webgl');
			_gl.viewportWidth = this.canvas.width;
			_gl.viewportHeight = this.canvas.height;
			GL.set(_gl);
		} catch (error) {
			console.log('Webgl not supported');
		}

		var gl = GL.get();

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	_createClass(Renderer, [{
		key: 'setSize',
		value: function setSize(width, height) {

			var gl = GL.get();

			this.width = width * this.pixelRatio;
			this.height = height * this.pixelRatio;

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.canvas.style.width = width + 'px';
			this.canvas.style.height = height + 'px';

			gl.viewportWidth = this.width;
			gl.viewportHeight = this.height;

			this.rotation = 0;
		}
	}, {
		key: 'setDevicePixelRatio',
		value: function setDevicePixelRatio() {
			var ratio = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

			this.pixelRatio = ratio || 1;
			this.setSize(this.width, this.height);
		}
	}, {
		key: 'modelViewPushMatrix',
		value: function modelViewPushMatrix() {
			var copy = _glMatrix.mat4.create();
			_glMatrix.mat4.copy(copy, this.modelViewMatrix);
			this.modelViewMatrixStack.push(copy);
		}
	}, {
		key: 'modelViewPopMatrix',
		value: function modelViewPopMatrix() {
			if (this.modelViewMatrixStack.length === 0) {
				throw 'Invalid modelViewPopMatrix';
			}
			this.modelViewMatrixStack.pop();
		}
	}, {
		key: 'render',
		value: function render(scene, camera) {
			var _this = this;

			var gl = GL.get();

			this.rotation++;

			gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			_glMatrix.mat4.perspective(this.projectionMatrix, camera.fov, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

			_glMatrix.mat4.identity(this.modelViewMatrix);

			_glMatrix.mat4.lookAt(this.modelViewMatrix, camera.position, camera.center, camera.up);

			// Render the scene
			scene.children.forEach(function (child) {
				_this.modelViewPushMatrix();
				// mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0, 0, -5])
				// mat4.rotateX(this.modelViewMatrix, this.modelViewMatrix, Math.PI/2)
				child.draw(_this.modelViewMatrix, _this.projectionMatrix);
				_this.modelViewPopMatrix();
			});
		}
	}]);

	return Renderer;
}();

exports.default = Renderer;