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

interface Viewport {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class Renderer {
	width: number;
	height: number;
	ratio: number;
	preserveDrawingBuffer: boolean;
	pixelRatio: number;
	prefferedContext: string;
	canvas: HTMLCanvasElement;
	viewport: Viewport;
	autoClear: boolean;

	constructor(options?: Options) {
		// Default renderer settings
		this.width = RENDERER_DEFAULT_WIDTH;
		this.height = RENDERER_DEFAULT_HEIGHT;
		this.ratio = RENDERER_DEFAULT_WIDTH / RENDERER_DEFAULT_HEIGHT;
		this.preserveDrawingBuffer = false;
		this.pixelRatio = 1;
		this.prefferedContext = RENDERER_DEFAULT_CONTEXT;
		this.autoClear = true;

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
				const _gl = <WebGL2RenderingContext>this.canvas.getContext('webgl2', attributes);
				GL.set(_gl, contextType);
			} else {
				contextType = WEBGL_CONTEXT;
				const _gl = <WebGLRenderingContext>this.canvas.getContext('webgl', attributes)
					|| <WebGLRenderingContext>this.canvas.getContext('experimental-webgl', attributes);
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

		this.viewport = {
			x: 0,
			y: 0,
			width: gl.drawingBufferWidth,
			height: gl.drawingBufferHeight,
		};

		this.setClearColor();
		gl.enable(gl.DEPTH_TEST);
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

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.canvas.style.width = `${width}px`;
			this.canvas.style.height = `${height}px`;

			this.setViewport(0, 0, width, height);
		}
	}

	setDevicePixelRatio(ratio = 1) {
		this.pixelRatio = ratio || 1;
		this.setSize(this.width, this.height);
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

	render(scene: Scene, camera: PerspectiveCamera | OrthorgraphicCamera) {
		gl = GL.get();

		gl.viewport(this.viewport.x, this.viewport.y, this.viewport.width, this.viewport.height);

		if (this.autoClear) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}

		mat4.identity(scene.modelViewMatrix);

		mat4.lookAt(scene.modelViewMatrix, camera.position.v, camera.target.v, camera.up.v);

		// Update the scene
		scene.update();

		// Draw the scene objects
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
	}
}
