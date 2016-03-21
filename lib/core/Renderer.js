import * as GL from './GL';
import { mat4 } from 'gl-matrix';
import { degToRad } from '../utils/math';

export default class Renderer {

	constructor(settings = {}) {

		// Default renderer settings
		const defaults = {
			width: 1280,
			height: 720
		};

		// Apply defaults
		Object.assign(this, defaults, settings);

		// Create canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// Setup matrices
		this.modelViewMatrix = mat4.create();
		this.projectionMatrix = mat4.create();

		// Try initialising gl
		try {
			const gl = this.canvas.getContext('experimental-webgl');
			gl.viewportWidth = this.canvas.width;
			gl.viewportHeight = this.canvas.height;
			GL.set(gl);
		} catch (error) {
			console.log('Webgl not supported');
		}

		const gl = GL.get();

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	}

	setSize(width, height) {

		const gl = GL.get();

		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		gl.viewportWidth = width;
		gl.viewportHeight = height;

		this.rotation = 0;
	}

	render(scene) {

		const gl = GL.get();

		this.rotation++;

		gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		mat4.perspective(this.projectionMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

		mat4.identity(this.modelViewMatrix);

		mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0, 0, -5]);

		mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, degToRad(this.rotation), [0, 1, 0]);

		// Render the scene
		scene.children.forEach(child => {
			child.draw(this.modelViewMatrix, this.projectionMatrix);
		});
	}
}