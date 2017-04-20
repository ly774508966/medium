import * as GL from './GL';
import {
	mat4,
} from 'gl-matrix';
import * as UniformBuffers from './UniformBuffers';
import Scene from './Scene';
import PerspectiveCamera from './PerspectiveCamera';
import OrthographicCamera from './OrthographicCamera';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

interface Options {
	width?: number;
	height?: number;
	ratio?: number;
	pixelRatio?: number;
}

interface Viewport {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class RenderTarget {
	width: number;
	height: number;
	ratio: number;
	pixelRatio: number;
	_frameBuffer: WebGLFramebuffer;
	_renderBuffer: WebGLRenderbuffer;
	texture: WebGLTexture;
	viewport: Viewport;
	autoClear: boolean;

	constructor(options: Options) {
		this.pixelRatio = options.pixelRatio || 1;
		this.width = options.width * this.pixelRatio;
		this.height = options.height * this.pixelRatio;
		this.ratio = this.width / this.height;
		this.viewport = {
			x: 0,
			y: 0,
			width: this.width,
			height: this.height,
		};
		this.autoClear = true;

		this.setClearColor();

		gl = GL.get();
		this._frameBuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		// gl.generateMipmap(gl.TEXTURE_2D);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA,
			gl.UNSIGNED_BYTE, null);
		this._renderBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._renderBuffer);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	setClearColor(r = 0, g = 0, b = 0, a = 1) {
		gl = GL.get();
		gl.clearColor(r, g, b, a);
	}

	setSize(width: number, height: number) {
		const newWidth = width * this.pixelRatio;
		const newHeight = height * this.pixelRatio;

		if (newWidth !== this.width || newHeight !== this.height) {
			this.width = width * this.pixelRatio;
			this.height = height * this.pixelRatio;
			this.ratio = this.width / this.height;

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA,
				gl.UNSIGNED_BYTE, null);
			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
			gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);

			this.setViewport(0, 0, width, height);
		}
	}

	setSissorTest(enable = false) {
		gl = GL.get();
		if (enable) {
			gl.enable(gl.SCISSOR_TEST);
		} else {
			gl.disable(gl.SCISSOR_TEST);
		}
	}

	setSissor(x: number, y: number, width: number, height: number) {
		gl = GL.get();
		gl.scissor(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
	}

	setViewport(x: number, y: number, width: number, height: number) {
		this.viewport.x = x * this.pixelRatio;
		this.viewport.y = y * this.pixelRatio;
		this.viewport.width = width * this.pixelRatio;
		this.viewport.height = height * this.pixelRatio;
	}

	render(scene: Scene, camera: PerspectiveCamera | OrthographicCamera) {
		gl = GL.get();

		gl.viewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

		if (this.autoClear) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}

		mat4.identity(scene.modelViewMatrix);

		mat4.lookAt(scene.modelViewMatrix, camera.position.v, camera.center.v, camera.up.v);

		// Update the scene
		scene.update();

		if (gl instanceof WebGL2RenderingContext) {
			// Update global uniform buffers
			UniformBuffers.updateProjectionView(gl, camera.projectionMatrix, scene.modelViewMatrix);
		}

		// Render the scene objects
		scene.objects.forEach(child => {
			if (child.isInstanced) {
				child.drawInstance(scene.modelViewMatrix, camera.projectionMatrix, camera);
			} else {
				child.draw(scene.modelViewMatrix, camera.projectionMatrix, camera);
			}
		});

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);

		// Reset
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}
}
