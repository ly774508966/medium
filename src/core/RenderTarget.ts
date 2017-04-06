import * as GL from './GL';
import {
	mat4,
} from 'gl-matrix';
import * as UniformBuffers from './UniformBuffers';
import Scene from './Scene';
import PerspectiveCamera from './PerspectiveCamera';
import OrthographicCamera from './OrthographicCamera';

let gl: WebGL2RenderingContext | WebGLRenderingContext;
let ratio: number;

interface Options {
	width?: number;
	height?: number;
}

export default class RenderTarget {
	width: number;
	height: number;
	_frameBuffer: WebGLFramebuffer;
	texture: WebGLTexture;

	constructor(options: Options) {
		this.width = 1024;
		this.height = 1024;
		Object.assign(this, options);
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
		const renderBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	render(scene: Scene, camera: PerspectiveCamera | OrthographicCamera) {
		gl = GL.get();

		gl.viewport(0.0, 0.0, this.width, this.height);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		if (camera.isPespectiveCamera) {
			ratio = this.width / this.height;
			mat4.perspective(camera.projectionMatrix, camera.fov, ratio, camera.near, camera.far);
		} else if (camera.isOrthographicCamera) {
			mat4.ortho(camera.projectionMatrix, -1.0, 1.0, -1.0, 1.0, camera.near, camera.far);
		} else {
			throw new Error('Camera type not supported');
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
