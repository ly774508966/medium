import * as GL from './GL';
import EventDispatcher from 'happens';
import ImageLoader from '../loaders/ImageLoader';
import HdrLoader from '../loaders/HdrLoader';
import ImageData from './ImageData';
import {
	warn,
} from '../utils/Console';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

interface Options {
	src: Array<string>;
	magFilter: number;
	minFilter: number;
	wrapS: number;
	wrapT: number;
	resizeToPow2: boolean;
}

export default class TextureCube {
	src: Array<string>;
	magFilter: number;
	minFilter: number;
	wrapS: number;
	wrapT: number;
	resizeToPow2: boolean;
	texture: WebGLTexture;
	_isHdr: boolean;
	loaders: Array<any>;
	images: Array<HTMLImageElement>;
	emit: Function;

	constructor(options: Options) {
		EventDispatcher(this);
		gl = GL.get();

		this.src = Array(6).fill('');
		this.magFilter = gl.LINEAR;
		this.minFilter = gl.LINEAR;
		this.wrapS = gl.CLAMP_TO_EDGE;
		this.wrapT = gl.CLAMP_TO_EDGE;
		this.resizeToPow2 = false;

		Object.assign(this, options);

		this.texture = gl.createTexture();
		this.images = [];
		this.loaders = [];

		this.update(this.placeholder());

		// Check media type
		this._isHdr = this.src[0].split('.').pop() === 'hdr';

		this.src.forEach((src, i) => {
			this.loaders[i] = this.load(this.src[i]);
		});

		Promise.all(this.loaders)
		.then(this.onTextureLoaded)
		.catch(this.onTextureError);
	}

	load(src: string) {
		if (this._isHdr) {
			return HdrLoader(src);
		} else {
			return ImageLoader(src);
		}
	}

	onTextureLoaded = (response) => {
		this.images = response;
		this.update(this.images);
		this.emit('loaded');
	}

	onTextureError = (error: string) => {
		warn(error);
		this.emit('error', error);
	}

	update(images: Array<HTMLCanvasElement | HTMLImageElement | ImageData>) {
		gl = GL.get();

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);

		const targets = [
			gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
		];

		for (let i = 0; i < 6; i += 1) {
			const image = this._isHdr ? images[i] : this._resizeImage(images[i]);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			if (image instanceof ImageData) {
				if (gl instanceof WebGL2RenderingContext) {
					gl.texImage2D(targets[i], 0, gl.RGBA16F, image.width, image.height,
						0, gl.RGBA, gl.FLOAT, image.data);
				} else {
					// TODO
				}
			} else {
				gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			}
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
		}
		// gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}

	placeholder() {
		const canvases = [];
		for (let i = 0; i < 6; i += 1) {
			const canvas = document.createElement('canvas');
			canvas.width = 128;
			canvas.height = 128;
			canvases.push(canvas);
		}
		return canvases;
	}

	_resizeImage(image: HTMLCanvasElement | HTMLImageElement | ImageData) {
		if (!this.resizeToPow2 || image instanceof ImageData) return image;

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

		const size = sizes.reduce((prev, curr) => {
			return (Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev);
		});

		// Draw canvas with texture cropped inside
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = size;
		canvas.height = size;

		ctx.drawImage(image, 0, 0, size, size);

		return canvas;
	}
}
