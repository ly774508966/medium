'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GL = require('./GL');

var GL = _interopRequireWildcard(_GL);

var _happens = require('happens');

var _happens2 = _interopRequireDefault(_happens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function () {
	function Texture(options) {
		_classCallCheck(this, Texture);

		(0, _happens2.default)(this);

		var gl = GL.get();

		var defaults = {
			src: '',
			size: null
		};

		this.settings = Object.assign({}, defaults, options);

		this.texture = gl.createTexture();
		this.image = new Image();
		this.image.onload = this.onTextureLoaded.bind(this);
		this.image.src = this.settings.src;
	}

	_createClass(Texture, [{
		key: '_resizeImage',
		value: function _resizeImage() {
			var _this = this;

			// 2, 4, 8, 16... 4096
			var sizes = Array(12).fill(0).map(function (i, j) {
				return Math.pow(2, j + 1);
			});

			// Return if the image size is already a power of 2
			sizes.forEach(function (size) {
				if (_this.image.width === size && _this.image.height === size) return _this.image;
			});

			var imageSize = Math.max(this.image.width, this.image.height);

			var size = sizes.reduce(function (prev, curr) {
				return Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev;
			});

			if (this.settings.size) {
				size = this.settings.size;
			}

			console.log('chosen size', size);

			// Draw canvas with texture cropped inside
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = size;
			canvas.height = size;
			ctx.drawImage(this.image, 0, 0, size, size);

			return canvas;
		}
	}, {
		key: 'onTextureLoaded',
		value: function onTextureLoaded() {

			var gl = GL.get();

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._resizeImage(this.image));
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);

			this.emit('loaded');
		}
	}]);

	return Texture;
}();

exports.default = Texture;