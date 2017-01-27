import * as GL from './GL';
import EventDispatcher from 'happens';

let gl;

export default class Texture {
	constructor(options) {
		EventDispatcher(this);
		gl = GL.get();
		const defaults = {
			src: '',
			magFilter: gl.NEAREST,
			minFilter: gl.NEAREST,
			wrapS: gl.CLAMP_TO_EDGE,
			wrapT: gl.CLAMP_TO_EDGE,
		};

		Object.assign(this, defaults, options);

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.placeholder());
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		gl.bindTexture(gl.TEXTURE_2D, null);

		this.image = new Image();
		this.image.onload = this.onTextureLoaded;

		this.updateImage();
	}

	onTextureLoaded = () => {
		this.update(this.image);
		this.emit('loaded');
	}

	updateImage(src) {
		this.src = src || this.src;
		this.image.src = this.src;
	}

	update(image) {
		gl = GL.get();

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._resizeImage(image));
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	placeholder() {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		return canvas;
	}

	_resizeImage() {
		// 2, 4, 8, 16... 4096
		const sizes = Array(12).fill(0).map((i, j) => {
			return Math.pow(2, j + 1);
		});

		// Return if the image size is already a power of 2
		sizes.forEach(size => {
			if (this.image.width === size && this.image.height === size) {
				return this.image;
			}
			return false;
		});

		const imageSize = Math.max(this.image.width, this.image.height);

		const size = sizes.reduce((prev, curr) => {
			return (Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev);
		});

		// Draw canvas with texture cropped inside
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = size;
		canvas.height = size;
		ctx.drawImage(this.image, 0, 0, size, size);

		return canvas;
	}
}
