import * as GL from '../core/GL';
import PerspectiveCamera from 'core/PerspectiveCamera';
import OrthographicCamera from 'core/OrthographicCamera';
import {
	mat4,
} from 'gl-matrix';

export default class RenderTarget {
	constructor(options = {}) {
		Object.assign(this, options);
		this.width = 1024;
		this.height = 1024;
		const gl = GL.get();
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

		// Setup matrices
		this.modelViewMatrix = mat4.create();
		this.projectionMatrix = mat4.create();

		// Matrix stack for scene object translations
		this.modelViewMatrixStack = [];
	}

	modelViewPushMatrix() {
		const copy = mat4.create();
		mat4.copy(copy, this.modelViewMatrix);
		this.modelViewMatrixStack.push(copy);
	}

	modelViewPopMatrix() {
		if (this.modelViewMatrixStack.length === 0) {
			throw new Error('Invalid modelViewPopMatrix');
		}
		this.modelViewMatrix = this.modelViewMatrixStack.pop();
	}

	render(scene, camera) {
		const gl = GL.get();

		gl.viewport(0.0, 0.0, this.width, this.height);

		gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);

		if (camera instanceof PerspectiveCamera) {
			const ratio = this.width / this.height;
			mat4.perspective(this.projectionMatrix, camera.fov, ratio, camera.near, camera.far);
		} else if (camera instanceof OrthographicCamera) {
			mat4.ortho(this.projectionMatrix, -1.0, 1.0, -1.0, 1.0, camera.near, camera.far);
		} else {
			throw new Error('Camera type not supported');
		}

		mat4.identity(this.modelViewMatrix);

		mat4.lookAt(this.modelViewMatrix, camera.position.v, camera.center.v, camera.up.v);

		// Update the scene
		scene.update();

		// Render the scene objects
		scene.objects.forEach(child => {
			this.modelViewPushMatrix();
			child.draw(this.modelViewMatrix, this.projectionMatrix, camera);
			this.modelViewPopMatrix();
		});

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);

		// Reset
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}
}
