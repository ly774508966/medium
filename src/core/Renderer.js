import * as GL from './GL';
import {
	mat4,
} from 'gl-matrix';
import {
	warn,
} from 'utils/Console';
import {
	RENDERER_DEFAULT_WIDTH,
	RENDERER_DEFAULT_HEIGHT,
	LINE_DEFAULT_WIDTH,
} from 'core/Constants';
import * as Capabilities from 'core/Capabilities';
import RendererInfo from 'core/RendererInfo';
import * as UniformBuffers from 'core/UniformBuffers';

let gl;

export default class Renderer {
	constructor(settings = {}) {
		// Default renderer settings
		const defaults = {
			width: RENDERER_DEFAULT_WIDTH,
			height: RENDERER_DEFAULT_HEIGHT,
			ratio: RENDERER_DEFAULT_WIDTH / RENDERER_DEFAULT_HEIGHT,
			preserveDrawingBuffer: false,
			pixelRatio: 1,
		};

		window.Capabilities = Capabilities;

		// Apply defaults
		Object.assign(this, defaults, settings);

		// Create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// Try initialising gl
		const attributes = {
			preserveDrawingBuffer: this.preserveDrawingBuffer,
		};

		try {
			gl = this.canvas.getContext('webgl2', attributes);
			GL.set(gl);
		} catch (error) {
			warn('Webgl not supported');
		}

		// Renderer info
		this.info = new RendererInfo();

		gl = GL.get();

		// Log Capabilities of gpu
		Capabilities.set(gl);

		// Setup global uniform buffers
		UniformBuffers.setup();

		// log('capabilities', Capabilities.capabilities);
		// log('extensions', Capabilities.extensions);

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	setSize(width, height) {
		const newWidth = width * this.pixelRatio;
		const newHeight = height * this.pixelRatio;

		if (newWidth !== this.width || newHeight !== this.height) {
			this.width = width * this.pixelRatio;
			this.height = height * this.pixelRatio;
			this.ratio = this.width / this.height;

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.canvas.style.width = `${width}px`;
			this.canvas.style.height = `${height}px`;
		}
	}

	setDevicePixelRatio(ratio = 1) {
		this.pixelRatio = ratio || 1;
		this.setSize(this.width, this.height);
	}

	_reset(gl) {
		// Line width
		gl.lineWidth(LINE_DEFAULT_WIDTH);
	}

	_drawObjects(scene, projectionMatrix, modelViewMatrix, camera) {
		// Update global uniform buffers
		UniformBuffers.updateProjectionView(gl, projectionMatrix, modelViewMatrix);

		// Render the scene objects
		scene.objects.forEach(child => {
			if (child.isInstanced) {
				child.drawInstance(modelViewMatrix, projectionMatrix, camera);
			} else {
				child.draw(modelViewMatrix, projectionMatrix, camera);
			}
		});
	}

	render(scene, camera) {
		gl = GL.get();
		this._reset(gl);

		gl.viewport(0.0, 0.0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		if (camera.isPespectiveCamera) {
			mat4.perspective(camera.projectionMatrix, camera.fov, this.ratio, camera.near, camera.far);
		} else if (camera.isOrthographicCamera) {
			mat4.ortho(camera.projectionMatrix, -1.0, 1.0, -1.0, 1.0, camera.near, camera.far);
		} else {
			throw new Error('Camera type not supported');
		}

		mat4.identity(scene.modelViewMatrix);

		mat4.lookAt(scene.modelViewMatrix, camera.position.v, camera.center.v, camera.up.v);

		// Update the scene
		scene.update();

		// Draw the scene objects
		this._drawObjects(scene, camera.projectionMatrix, scene.modelViewMatrix, camera);
	}

	// For debug atm
	renderStereo(scene,
		leftProjectionMatrix,
		leftViewMatrix,
		rightProjectionMatrix,
		rightViewMatrix,
		cameraL,
		cameraR,
	) {
		gl = GL.get();
		this._reset(gl);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Draw both eyes

		mat4.identity(scene.modelViewMatrix);

		// Update the scene
		scene.update();

		// Left
		gl.viewport(0.0, 0.0, gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight);

		mat4.perspective(leftProjectionMatrix, cameraL.fov, this.ratio, cameraL.near, cameraL.far);
		mat4.lookAt(leftViewMatrix, cameraL.position.v, cameraL.center.v, cameraL.up.v);

		this._drawObjects(scene, leftProjectionMatrix, leftViewMatrix);

		// Right
		gl.viewport(gl.drawingBufferWidth * 0.5,
			0, gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight);

		mat4.perspective(rightProjectionMatrix, cameraR.fov, this.ratio, cameraR.near, cameraR.far);
		mat4.lookAt(rightViewMatrix, cameraR.position.v, cameraR.center.v, cameraR.up.v);

		this._drawObjects(scene, rightProjectionMatrix, rightViewMatrix);
	}

	renderWebVR(scene,
		leftProjectionMatrix,
		leftViewMatrix,
		rightProjectionMatrix,
		rightViewMatrix,
	) {
		gl = GL.get();
		this._reset(gl);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Draw both eyes

		mat4.identity(scene.modelViewMatrix);

		// Update the scene
		scene.update();

		// Left
		gl.viewport(0.0, 0.0, gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight);
		this._drawObjects(scene, leftProjectionMatrix, leftViewMatrix);

		// Right
		gl.viewport(gl.drawingBufferWidth * 0.5,
			0, gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight);

		this._drawObjects(scene, rightProjectionMatrix, rightViewMatrix);
	}
}
