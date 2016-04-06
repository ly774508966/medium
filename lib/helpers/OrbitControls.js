'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _math = require('../utils/math');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrbitControls = function () {
	function OrbitControls(camera, element) {
		_classCallCheck(this, OrbitControls);

		var defaults = {
			speed: 5
		};

		this._camera = camera;
		this._element = element;
		this._zoomMin = 0.1;
		this._zoomMax = Infinity;
		this._radius = Math.max(camera.position[0], camera.position[2]);
		this._rotationX = Math.atan2(camera.position[1] - 0, this._radius - 0);
		this._rotationY = Math.atan2(camera.position[2] - 0, camera.position[0] - 0);
		this._offsetX = 0;
		this._offsetY = 0;
		this._width = window.innerWidth;
		this._height = window.innerHeight;

		this.settings = Object.assign(defaults, {});

		this._onTouchStartHandler = this._onTouchStart.bind(this);
		this._onTouchMoveHandler = this._onTouchMove.bind(this);
		this._onTouchEndHandler = this._onTouchEnd.bind(this);
		this._onMouseWheelHandler = this._onMouseWheel.bind(this);

		this._element.addEventListener('mousedown', this._onTouchStartHandler, false);
		this._element.addEventListener('mousemove', this._onTouchMoveHandler, false);
		this._element.addEventListener('mouseup', this._onTouchEndHandler, false);
		this._element.addEventListener('touchstart', this._onTouchStartHandler, false);
		this._element.addEventListener('touchmove', this._onTouchMoveHandler, false);
		this._element.addEventListener('touchend', this._onTouchEndHandler, false);
		window.addEventListener('mousewheel', this._onMouseWheelHandler, false);
	}

	_createClass(OrbitControls, [{
		key: '_onTouchStart',
		value: function _onTouchStart(event) {
			this._offsetY = this._rotationY;
			this._offsetX = this._rotationX;
			this._startY = event.pageX / this._width;
			this._startX = event.pageY / this._height;
			this.isDown = true;
		}
	}, {
		key: '_onTouchMove',
		value: function _onTouchMove(event) {

			if (this.isDown) {
				var y = event.pageX / this._width;
				var x = event.pageY / this._height;

				this._rotationX = this._offsetX + -(this._startX - x) * this.settings.speed;
				this._rotationY = this._offsetY + (this._startY - y) * this.settings.speed;

				this._rotationX = (0, _math.clamp)(this._rotationX, -Math.PI / 2, Math.PI / 2);

				this.update();
			}
		}
	}, {
		key: '_zoomConstraint',
		value: function _zoomConstraint(delta) {

			var value = delta / 1000;
			this._radius += value;
			this._radius = (0, _math.clamp)(this._radius, this._zoomMin, this._zoomMax);
			this.update();
		}
	}, {
		key: 'update',
		value: function update() {

			var y = this._radius * Math.sin(this._rotationX);
			var r = this._radius * Math.cos(this._rotationX); // radius of the sphere
			var x = Math.sin(this._rotationY) * r;
			var z = Math.cos(this._rotationY) * r;

			var position = _glMatrix.vec3.fromValues(x, y, z);

			this._camera.setPosition(position[0], position[1], position[2]);
		}
	}, {
		key: '_onTouchEnd',
		value: function _onTouchEnd() {
			this.isDown = false;
		}
	}, {
		key: '_onMouseWheel',
		value: function _onMouseWheel(event) {

			var delta = 0;

			if (event.wheelDelta) {
				// Webkit, Opera, Explorer
				delta = event.wheelDelta;
			} else if (event.detail) {
				// Firefox
				delta = event.detail;
			}

			this._zoomConstraint(-delta);
		}
	}, {
		key: 'dispose',
		value: function dispose() {
			this._element.removeEventListener('mousedown', this._onTouchStartHandler);
			this._element.removeEventListener('mousemove', this._onTouchMoveHandler);
			this._element.removeEventListener('mouseup', this._onTouchEndHandler);
			this._element.removeEventListener('touchstart', this._onTouchStartHandler);
			this._element.removeEventListener('touchmove', this._onTouchMoveHandler);
			this._element.removeEventListener('touchend', this._onTouchEndHandler);
			window.removeEventListener('mousewheel', this._onMouseWheelHandler);
			this._camera = null;
			this._element = null;
		}
	}]);

	return OrbitControls;
}();

exports.default = OrbitControls;