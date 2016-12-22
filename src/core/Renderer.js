import * as GL from './GL';
import {
	mat4,
} from 'gl-matrix';
import PerspectiveCamera from 'core/PerspectiveCamera';
import OrthographicCamera from 'core/OrthographicCamera';
import {
	warn,
	log,
} from 'utils/Console';
import {
	RENDERER_DEFAULT_WIDTH,
	RENDERER_DEFAULT_HEIGHT,
	LINE_DEFAULT_WIDTH,
} from 'core/Constants';
import Capabilities from 'core/Capabilities';
import RendererInfo from 'core/RendererInfo';

export default class Renderer {
	constructor(settings = {}) {
		// Default renderer settings
		const defaults = {
			width: RENDERER_DEFAULT_WIDTH,
			height: RENDERER_DEFAULT_HEIGHT,
			preserveDrawingBuffer: false,
		};

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
			const gl = this.canvas.getContext('webgl', attributes) ||
				this.canvas.getContext('experimental-webgl', attributes);
			GL.set(gl);
		} catch (error) {
			warn('Webgl not supported');
		}

		// Setup matrices
		this.modelViewMatrix = mat4.create();
		this.projectionMatrix = mat4.create();

		// Matrix stack for scene object translations
		this.modelViewMatrixStack = [];

		// Default pixel ratio
		this.pixelRatio = 1;

		// Renderer info
		this.info = new RendererInfo();

		const gl = GL.get();

		// Log Capabilities of gpu
		log(Capabilities(gl));

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	setSize(width, height) {
		const newWidth = width * this.pixelRatio;
		const newHeight = height * this.pixelRatio;

		if (newWidth !== this.width && newHeight !== this.height) {
			this.width = width * this.pixelRatio;
			this.height = height * this.pixelRatio;

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

	_reset(gl) {
		// Line width
		gl.lineWidth(LINE_DEFAULT_WIDTH);
	}

	render(scene, camera) {
		const gl = GL.get();
		this._reset(gl);

		gl.viewport(0.0, 0.0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// gl.enable(gl.BLEND);
		// gl.blendEquation(gl.FUNC_ADD);
		// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

		this.info.vertices = 0;

		// Render the scene objects
		scene.objects.forEach(child => {
			this.modelViewPushMatrix();
			child.draw(this.modelViewMatrix, this.projectionMatrix, camera);

			this.info.vertices += child.geometry.vertices.length / 3;

			this.modelViewPopMatrix();
		});

		console.log(this.info.vertices);
	}
}
