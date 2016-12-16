import * as GL from './GL';
import * as CONSTANTS from './Constants';
import {
	mat3,
	mat4,
} from 'gl-matrix';
import vertexShader from 'shaders/vertex.glsl';
import fragmentShader from 'shaders/frag.glsl';
import {
	warn,
} from 'utils/Console';

export default class Shader {
	constructor(options) {
		const defaults = {
			uniforms: {},
			vertexShader: `${vertexShader}`,
			fragmentShader: `${fragmentShader}`,
			drawType: CONSTANTS.DRAW_TRIANGLES,
			lights: false,
			culling: CONSTANTS.CULL_NONE,
		};

		Object.assign(this, defaults, options);
	}

	create(geometry) {
		const gl = GL.get();

		const vertexShader = this._processShader(this.vertexShader, geometry);
		const fragmentShader = this._processShader(this.fragmentShader, geometry);

		// Create program
		this.compiledVertexShader = this._compile('vs', vertexShader);
		this.compiledFragmentShader = this._compile('fs', fragmentShader);
		this.customUniforms = this.uniforms || {};

		this.program = gl.createProgram();

		gl.attachShader(this.program, this.compiledVertexShader);
		gl.attachShader(this.program, this.compiledFragmentShader);
		gl.linkProgram(this.program);

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			warn('Failed to initialise shaders');
		}

		if (geometry.vertices) {
			this.vertexPositionAttribute = gl.getAttribLocation(this.program, 'aVertexPosition');
			gl.enableVertexAttribArray(this.vertexPositionAttribute);
		}

		if (geometry.uvs) {
			this.vertexUvAttribute = gl.getAttribLocation(this.program, 'aUv');
			gl.enableVertexAttribArray(this.vertexUvAttribute);
		}

		if (geometry.normals) {
			this.vertexNormals = true;
			this.vertexNormalAttribute = gl.getAttribLocation(this.program, 'aVertexNormal');
			gl.enableVertexAttribArray(this.vertexNormalAttribute);
		}

		if (geometry.colors) {
			this.vertexColorAttribute = gl.getAttribLocation(this.program, 'aVertexColor');
			gl.enableVertexAttribArray(this.vertexColorAttribute);
		}

		this.uniformTextures = [];
		Object.keys(this.customUniforms).forEach(key => {
			const uniform = this.customUniforms[key];
			if (uniform.type === 't') {
				this.uniformTextures.push(uniform);
				uniform.value.load();
			}
		});

		if (this.uniformTextures.length > 0) {
			this.textureCoordAttribute = gl.getAttribLocation(this.program, 'aTextureCoord');
			gl.enableVertexAttribArray(this.textureCoordAttribute);
		}

		// console.log(this.vertexPositionAttribute);
		// console.log(this.vertexNormalAttribute);
		// console.log(this.vertexColorAttribute);
		// console.log(this.textureCoordAttribute);
		// console.log(this.vertexUvAttribute);

		// gl.useProgram(this.program);

		this.uniforms = Object.assign({
			uPMatrix: {
				type: '4fv',
				value: null,
				location: null,
			},
			uMVMatrix: {
				type: '4fv',
				value: null,
				location: null,
			},
			uModelMatrix: {
				type: '4fv',
				value: null,
				location: null,
			},
			uNormalMatrix: {
				type: '4fv',
				value: null,
				location: null,
			},
		}, this.customUniforms);

		Object.keys(this.uniforms).forEach(uniform => {
			this.uniforms[uniform].location = gl.getUniformLocation(this.program, uniform);
		});
	}

	_processShader(shader, geometry) {
		let defines = '';

		function addDefine(define) {
			defines += `#define ${define} \n`;
		}

		if (geometry.uvs) {
			addDefine('uv');
		}

		if (geometry.colors) {
			addDefine('vertexColors');
		}

		if (geometry.normals) {
			addDefine('normals');
		}

		shader = shader.replace(/#HOOK_DEFINES/g, defines);
		shader = shader.replace(/#HOOK_VERTEX_PRE/g, '');
		shader = shader.replace(/#HOOK_VERTEX_MAIN/g, '');
		shader = shader.replace(/#HOOK_VERTEX_END/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_PRE/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_MAIN/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_END/g, '');
		return shader;
	}

	bindProgram() {
		const gl = GL.get();
		gl.useProgram(this.program);
	}

	setUniforms(modelViewMatrix, projectionMatrix, modelMatrix) {
		const gl = GL.get();

		gl.uniformMatrix4fv(this.uniforms.uPMatrix.location, false, projectionMatrix);
		gl.uniformMatrix4fv(this.uniforms.uMVMatrix.location, false, modelViewMatrix);
		gl.uniformMatrix4fv(this.uniforms.uModelMatrix.location, false, modelMatrix);

		const inversedModelViewMatrix = mat4.create();
		mat4.invert(inversedModelViewMatrix, modelMatrix);

		if (this.vertexNormals) {
			// removes scale and translation
			const normalMatrix = mat3.create();
			mat3.fromMat4(normalMatrix, inversedModelViewMatrix);
			mat3.transpose(normalMatrix, normalMatrix);
			gl.uniformMatrix3fv(this.uniforms.uNormalMatrix.location, false, normalMatrix);
		}

		// Update the other uniforms
		Object.keys(this.customUniforms).forEach(uniform => {
			const value = this.uniforms[uniform].value;

			switch (this.customUniforms[uniform].type) {
				case 'i':
					gl.uniform1i(this.uniforms[uniform].location, value);
					break;
				case 'f':
					gl.uniform1f(this.uniforms[uniform].location, value);
					break;
				case '2f':
					gl.uniform2f(this.uniforms[uniform].location, value[0], value[1]);
					break;
				case '3f':
					gl.uniform3f(this.uniforms[uniform].location, value[0], value[1], value[2]);
					break;
				case '4f':
					gl.uniform4f(this.uniforms[uniform].location, value[0], value[1], value[2], value[3]);
					break;
				case '1iv':
					gl.uniform1iv(this.uniforms[uniform].location, value);
					break;
				case '2iv':
					gl.uniform2iv(this.uniforms[uniform].location, value);
					break;
				case '1fv':
					gl.uniform1fv(this.uniforms[uniform].location, value);
					break;
				case '2fv':
					gl.uniform2fv(this.uniforms[uniform].location, value);
					break;
				case '3fv':
					gl.uniform3fv(this.uniforms[uniform].location, value);
					break;
				case '4fv':
					gl.uniform4fv(this.uniforms[uniform].location, value);
					break;
				case 'Matrix3fv':
					gl.uniformMatrix3fv(this.uniforms[uniform].location, false, value);
					break;
				case 'Matrix4fv':
					gl.uniformMatrix4fv(this.uniforms[uniform].location, false, value);
					break;
				default:
			}
		});
	}

	_compile(type, source) {
		const gl = GL.get();
		let shader;

		// console.log('source', source);

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
			warn('Failed to compile shader', gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}
}
