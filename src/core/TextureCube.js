import * as GL from './GL';
import EventDispatcher from 'happens';

export default class Texture {
	constructor(options) {
		EventDispatcher(this);
		const gl = GL.get();

		this.src = Array(6).fill('');
		this.images = [];
		this.size = null;
		this.magFilter = gl.NEAREST;
		this.minFilter = gl.NEAREST;
		this.wrapS = gl.CLAMP_TO_EDGE;
		this.wrapT = gl.CLAMP_TO_EDGE;
		this._loaded = 0;

		Object.assign(this, options);

		this.texture = gl.createTexture();
		this.images = [];

		this.updateTexture(this.placeholder());

		this.src.forEach((src, i) => {
			this.images[i] = new Image();
			this.images[i].onload = this.onImageLoaded;
			this.images[i].src = this.src[i];
		});
	}

	onImageLoaded = () => {
		this._loaded++;
		if (this._loaded === 6) {
			this.onTextureLoaded();
		}
	}

	onTextureLoaded = () => {
		this.updateTexture(this.images);
		this.emit('loaded');
	}

	updateTexture(images) {
		const gl = GL.get();

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

		const targets = [
			gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
		];

		for (let i = 0; i < 6; i++) {
			const image = this._resizeImage(images[i]);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
		}
		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}

	placeholder() {
		const canvases = [];
		for (let i = 0; i < 6; i++) {
			const canvas = document.createElement('canvas');
			canvas.width = 128;
			canvas.height = 128;
			canvases.push(canvas);
		}
		return canvases;
	}

	_resizeImage(image) {
		// 2, 4, 8, 16... 4096
		const sizes = Array(12).fill(0).map((i, j) => {
			return Math.pow(2, j + 1);
		});

		// Return if the image size is already a power of 2
		sizes.forEach(size => {
			if (image.width === size && image.height === size) {
				return image;
			}
			return false;
		});

		const imageSize = Math.max(image.width, image.height);

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
		ctx.drawImage(image, 0, 0, size, size);

		return canvas;
	}
}
