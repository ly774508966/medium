import * as GL from './GL';
import EventDispatcher from 'happens';

export default class Texture {
	constructor(options) {
		EventDispatcher(this);
		const gl = GL.get();

		this.src = '';
		this.size = null;
		this.magFilter = gl.NEAREST;
		this.minFilter = gl.NEAREST;
		this.wrapS = gl.MIRRORED_REPEAT;
		this.wrapT = gl.MIRRORED_REPEAT;

		Object.assign(this, options);

		this.texture = gl.createTexture();
		this.image = new Image();
		this.image.onload = this.onTextureLoaded;
		this.image.src = this.src;

		this.updateTexture(this.placeholder());
	}

	onTextureLoaded = () => {
		this.updateTexture(this.image);
		this.emit('loaded');
	}

	updateTexture(image) {
		const gl = GL.get();

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._resizeImage(image));
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
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

		let size = sizes.reduce((prev, curr) => {
			return (Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev);
		});

		if (this.size) {
			size = this.size;
		}

		// Draw canvas with texture cropped inside
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = size;
		canvas.height = size;
		ctx.drawImage(this.image, 0, 0, size, size);

		return canvas;
	}
}
