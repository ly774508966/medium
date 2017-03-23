import * as GL from './GL';
import {
	mat4,
} from 'gl-matrix';
import {
	log,
	warn,
} from '../utils/Console';
import {
	WEBGL_CONTEXT,
	WEBGL2_CONTEXT,
	RENDERER_DEFAULT_CONTEXT,
	RENDERER_DEFAULT_WIDTH,
	RENDERER_DEFAULT_HEIGHT,
} from './Constants';
import * as Capabilities from './Capabilities';
import * as UniformBuffers from './UniformBuffers';
import Detect from '../utils/Detect';
import Scene from '../core/Scene';
import PerspectiveCamera from './PerspectiveCamera';
import OrthorgraphicCamera from './OrthographicCamera';
const config = require('../../package.json');

let gl: WebGL2RenderingContext | WebGLRenderingContext;

interface Options {
	width?: number;
	height?: number;
	ratio?: number;
	preserveDrawingBuffer?: boolean;
	pixelRatio?: number;
	prefferedContext?: string;
}

export default class Renderer {
	width: number;
	height: number;
	ratio: number;
	preserveDrawingBuffer: boolean;
	pixelRatio: number;
	prefferedContext: string;
	canvas: HTMLCanvasElement;

	constructor(options: Options) {
		// Default renderer settings
		this.width = RENDERER_DEFAULT_WIDTH;
		this.height = RENDERER_DEFAULT_HEIGHT;
		this.ratio = RENDERER_DEFAULT_WIDTH / RENDERER_DEFAULT_HEIGHT;
		this.preserveDrawingBuffer = false;
		this.pixelRatio = 1;
		this.prefferedContext = RENDERER_DEFAULT_CONTEXT;

		// Apply defaults
		Object.assign(this, options);

		// Create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// Try initialising gl
		const attributes = {
			preserveDrawingBuffer: this.preserveDrawingBuffer,
		};

		const detect = Detect();

		if (detect) {
			let contextType;
			if (detect.webgl2 && this.prefferedContext === WEBGL2_CONTEXT) {
				contextType = WEBGL2_CONTEXT;
				const _gl = <WebGL2RenderingContext> this.canvas.getContext('webgl2', attributes);
				GL.set(_gl, contextType);
			} else {
				contextType = WEBGL_CONTEXT;
				const _gl = <WebGLRenderingContext> this.canvas.getContext('webgl', attributes)
				|| <WebGLRenderingContext> this.canvas.getContext('experimental-webgl', attributes);
				GL.set(_gl, contextType);
			}
		} else {
			warn('Webgl not supported');
			return;
		}

		log(`%c${config.name} ${config.version} webgl${GL.webgl2 ? 2 : ''}`, 'padding: 1px; background: #222; color: #ff00ff');

		gl = GL.get();

		// Log Capabilities of gpu
		Capabilities.set(gl);

		// Setup global uniform buffers
		if (GL.webgl2) {
			UniformBuffers.setup();
		}

		// log("capabilities", Capabilities.capabilities);
		// log("extensions", Capabilities.extensions);

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	setSize(width: number, height: number) {
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

	_drawObjects(scene: Scene, projectionMatrix: mat4, modelViewMatrix: mat4, camera?: PerspectiveCamera | OrthorgraphicCamera) {
		if (gl instanceof WebGL2RenderingContext) {
			// Update global uniform buffers
			UniformBuffers.updateProjectionView(gl, projectionMatrix, modelViewMatrix);
		}

		// Render the scene objects
		scene.objects.forEach(child => {
			if (child.isInstanced) {
				child.drawInstance(modelViewMatrix, projectionMatrix, camera);
			} else {
				child.draw(modelViewMatrix, projectionMatrix, camera);
			}
		});
	}

	render(scene: Scene, camera: PerspectiveCamera | OrthorgraphicCamera) {
		gl = GL.get();

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
	renderStereo(scene: Scene,
														leftProjectionMatrix: mat4,
														leftViewMatrix: mat4,
														rightProjectionMatrix: mat4,
														rightViewMatrix: mat4,
														cameraL: PerspectiveCamera,
														cameraR: PerspectiveCamera,
	) {
		gl = GL.get();

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

	renderWebVR(scene: Scene,
													leftProjectionMatrix: mat4,
													leftViewMatrix: mat4,
													rightProjectionMatrix: mat4,
													rightViewMatrix: mat4,
	) {
		gl = GL.get();

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
