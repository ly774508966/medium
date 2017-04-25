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
	src: Uint8Array;
	size: number;
}

export default class Texture3d {
	src: Uint8Array;
	size: number;
	texture: WebGLTexture;
	emit: Function;

	constructor(options: Options) {
		EventDispatcher(this);
		gl = GL.get();

		if (!(gl instanceof WebGL2RenderingContext)) {
			return;
		}

		this.src = null;
		this.size = null;
		Object.assign(this, options);

		this.texture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_3D, this.texture);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_BASE_LEVEL, 0);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAX_LEVEL, Math.log2(this.size));
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, this.size, this.size, this.size, 0, gl.RED, gl.UNSIGNED_BYTE, this.src);
		gl.generateMipmap(gl.TEXTURE_3D);
	}

	dispose() {
		gl = GL.get();
		if (!(gl instanceof WebGL2RenderingContext)) {
			return;
		}
		gl.deleteTexture(this.texture);
		this.texture = null;
	}
}
