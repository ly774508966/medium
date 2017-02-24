import * as GL from './GL';
import {
	warn,
} from 'utils/Console';

let gl;

export default class Program {
	constructor() {
		gl = GL.get();
		this.program = gl.createProgram();

		// Uniform blocks
		this.uniformBlocks = {};

		// Cache all attribute locations
		this.attributeLocations = {};
	}

	link(vertexShader, fragmentShader, transformFeedbackVaryings) {
		this.compiledVertexShader = this.compile('vs', vertexShader);
		this.compiledFragmentShader = this.compile('fs', fragmentShader);

		// Don't attach a broken shader
		// this will allow other objects to continue rendering
		if (!this.compiledVertexShader || !this.compiledFragmentShader) {
			return;
		}

		gl.attachShader(this.program, this.compiledVertexShader);
		gl.attachShader(this.program, this.compiledFragmentShader);

		if (transformFeedbackVaryings) {
			gl.transformFeedbackVaryings(this.program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
		}

		gl.linkProgram(this.program);
		gl.validateProgram(this.program);

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			const info = gl.getProgramInfoLog(this.program);
			warn('Failed to initialise shaders', info);
		}
	}

	compile(type, source) {
		gl = GL.get();
		let shader;

		// console.log(source);

		switch (type) {
			case 'vs':
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;
			default:
				shader = gl.createShader(gl.FRAGMENT_SHADER);
		}

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			warn('Failed to compile shader:', gl.getShaderInfoLog(shader));
			return false;
		}

		return shader;
	}

	setAttributeLocation(attributeName) {
		gl = GL.get();
		this.attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
		gl.enableVertexAttribArray(this.attributeLocations[attributeName]);
	}

	setAttributePointer(attributeName, itemSize) {
		gl = GL.get();
		gl.vertexAttribPointer(this.attributeLocations[attributeName], itemSize, gl.FLOAT, false, 0, 0);
	}

	setAttributeInstancedPointer(attributeName, itemSize) {
		gl = GL.get();
		gl.vertexAttribPointer(this.attributeLocations[attributeName], itemSize, gl.FLOAT, false, 0, 0);
	}

	setUniformLocation(uniforms, uniformName) {
		gl = GL.get();
		uniforms[uniformName].location = gl.getUniformLocation(this.program, uniformName);
	}

	setUniformBlockLocation(uniformName, uniformBuffer, index) {
		gl = GL.get();
		this.uniformBlocks[uniformName] = gl.getUniformBlockIndex(this.program, uniformName);
		gl.uniformBlockBinding(this.program,
			this.uniformBlocks[uniformName], this.uniformBlocks[uniformName]);
		gl.bindBufferBase(gl.UNIFORM_BUFFER, index, uniformBuffer);
	}

	bind() {
		const gl = GL.get();
		gl.useProgram(this.program);
	}

	dispose() {
		gl = GL.get();
		let attributeLocation;

		// Cleanup attribute locations
		Object.keys(this.attributeLocations).forEach(attributeName => {
			attributeLocation = this.attributeLocations[attributeName];
			gl.disableVertexAttribArray(attributeLocation);
		});

		gl.detachShader(this.program, this.compiledVertexShader);
		gl.detachShader(this.program, this.compiledFragmentShader);
		gl.deleteProgram(this.program);
	}
}
