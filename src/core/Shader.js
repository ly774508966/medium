import * as GL from './GL';
import * as CONSTANTS from './Constants';
import {
	mat3,
	mat4,
} from 'gl-matrix';
import vertexShader from 'shaders/basic/Vertex.glsl';
import fragmentShader from 'shaders/basic/Frag.glsl';
import {
	warn,
} from 'utils/Console';
import Color from 'math/Color';
import Capabilities from 'core/Capabilities';

export default class Shader {
	constructor(options) {
		const defaults = {
			uniforms: {},
			vertexShader: `${vertexShader}`,
			fragmentShader: `${fragmentShader}`,
			drawType: CONSTANTS.DRAW_TRIANGLES,
			directionalLights: false,
			pointLights: [],
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

		// Generate uniforms for point lights
		this.pointLights.forEach((pointLightUniforms, i) => {
			Object.keys(pointLightUniforms).forEach(pointLightUniform => {
				const uniform = pointLightUniforms[pointLightUniform];
				this.customUniforms[`uPointLights[${i}].${pointLightUniform}`] = uniform;
			});
		});

		this.uniforms = Object.assign({
			uProjectionMatrix: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uViewMatrix: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uModelMatrix: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uNormalMatrix: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uDiffuse: {
				type: '3f',
				value: new Color().v,
				location: null,
			},
		}, this.customUniforms);

		Object.keys(this.uniforms).forEach(uniformName => {
			this.uniforms[uniformName].location = gl.getUniformLocation(this.program, uniformName);
		});

		// console.log(this.uniforms);
	}

	_processShader(shader, geometry) {
		const gl = GL.get();
		let defines = '';

		const precision =
		`precision ${Capabilities(gl).precision} float;`;

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

		if (this.directionalLights) {
			addDefine('directionalLights');
		}

		if (this.pointLights.length > 0) {
			addDefine('pointLights');
		}

		shader = shader.replace(/#HOOK_PRECISION/g, precision);
		shader = shader.replace(/#HOOK_DEFINES/g, defines);
		shader = shader.replace(/#HOOK_VERTEX_PRE/g, '');
		shader = shader.replace(/#HOOK_VERTEX_MAIN/g, '');
		shader = shader.replace(/#HOOK_VERTEX_END/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_PRE/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_MAIN/g, '');
		shader = shader.replace(/#HOOK_FRAGMENT_END/g, '');

		shader = shader.replace(/#HOOK_POINT_LIGHTS/g, this.pointLights.length);
		return shader;
	}

	bindProgram() {
		const gl = GL.get();
		gl.useProgram(this.program);
	}

	setUniforms(modelViewMatrix, projectionMatrix, modelMatrix, camera) {
		const gl = GL.get();

		// Matrix
		gl.uniformMatrix4fv(this.uniforms.uProjectionMatrix.location, false, projectionMatrix);
		gl.uniformMatrix4fv(this.uniforms.uViewMatrix.location, false, modelViewMatrix);
		gl.uniformMatrix4fv(this.uniforms.uModelMatrix.location, false, modelMatrix);

		// Camera
		if (this.uniforms.uCameraPosition) {
			gl.uniform3f(this.uniforms.uCameraPosition.location,
				camera.position.v[0],
				camera.position.v[1],
				camera.position.v[2]);
		}

		const inversedModelViewMatrix = mat4.create();
		mat4.invert(inversedModelViewMatrix, modelMatrix);

		if (this.vertexNormals) {
			// removes scale and translation
			const normalMatrix = mat3.create();
			mat3.fromMat4(normalMatrix, inversedModelViewMatrix);
			mat3.transpose(normalMatrix, normalMatrix);
			gl.uniformMatrix3fv(this.uniforms.uNormalMatrix.location, false, normalMatrix);
		}

		// Camera

		// Update the other uniforms
		Object.keys(this.customUniforms).forEach(uniformName => {
			const uniform = this.uniforms[uniformName];
			switch (uniform.type) {
				case 'i':
					gl.uniform1i(uniform.location,
						uniform.value);
					break;
				case 'f':
					gl.uniform1f(uniform.location,
						uniform.value);
					break;
				case '2f':
					gl.uniform2f(uniform.location,
						uniform.value[0],
						uniform.value[1]);
					break;
				case '3f':
					gl.uniform3f(uniform.location,
						uniform.value[0],
						uniform.value[1],
						uniform.value[2]);
					break;
				case '4f':
					gl.uniform4f(uniform.location,
						uniform.value[0],
						uniform.value[1],
						uniform.value[2],
						uniform.value[3]);
					break;
				case '1iv':
					gl.uniform1iv(uniform.location,
						uniform.value);
					break;
				case '2iv':
					gl.uniform2iv(uniform.location,
						uniform.value);
					break;
				case '1fv':
					gl.uniform1fv(uniform.location,
						uniform.value);
					break;
				case '2fv':
					gl.uniform2fv(uniform.location,
						uniform.value);
					break;
				case '3fv':
					gl.uniform3fv(uniform.location,
						uniform.value);
					break;
				case '4fv':
					gl.uniform4fv(uniform.location,
						uniform.value);
					break;
				case 'Matrix3fv':
					gl.uniformMatrix3fv(uniform.location,
						false,
						uniform.value);
					break;
				case 'Matrix4fv':
					gl.uniformMatrix4fv(uniform.location,
						false,
						uniform.value);
					break;
				default:
			}
		});
	}

	_compile(type, source) {
		const gl = GL.get();
		let shader;

		console.log('source', source);

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
