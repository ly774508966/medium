import * as GL from './GL';
import EventDispatcher from 'happens';

let gl;

interface Options {
	src?: number;
	magFilter?: number;
	minFilter?: number;
	wrapS?: number;
	wrapT?: number;
	loop: boolean;
	autoplay: boolean;
}

export default class VideoTexture {
	src: string;
	magFilter: number;
	minFilter: number;
	wrapS: number;
	wrapT: number;
	loop: boolean;
	autoplay: boolean;
	texture: WebGLTexture;
	video: HTMLVideoElement;
	_currentTime: number;
	emit: Function;

	constructor(options: Options) {
		EventDispatcher(this);
		gl = GL.get();

		this.src = '';
		this.magFilter = gl.NEAREST;
		this.minFilter = gl.NEAREST;
		this.wrapS = gl.CLAMP_TO_EDGE;
		this.wrapT = gl.CLAMP_TO_EDGE;
		this.loop = false;
		this.autoplay = true;

		Object.assign(this, options);

		this.video = document.createElement('video');
		this.video.src = this.src;
		this.video.loop = this.loop;
		this.video.autoplay = this.autoplay;
		this.video.setAttribute('webkitplaysinline', 'webkitplaysinline');
		this.video.setAttribute('playsinline', 'playsinline');
		this.video.addEventListener('canplaythrough', this._onCanPlayThrough, true);
		this.video.addEventListener('ended', this._onEnded, true);
		this._currentTime = 0;

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.placeholder());
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	update() {
		gl = GL.get();

		if (this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
			if (this.video.currentTime !== this._currentTime) {
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}
			this._currentTime = this.video.currentTime;
		}
	}

	placeholder() {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		return canvas;
	}

	_onCanPlayThrough = () => {
		this.emit('canplaythrough');
	}

	_onEnded = () => {
		this.emit('ended');
	}
}
