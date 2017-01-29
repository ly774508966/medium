import * as GL from './GL';
import * as CONSTANTS from './Constants';
import {
	mat3,
	mat4,
	vec3,
} from 'gl-matrix';
import vertexShader from 'shaders/basic/Vertex.glsl';
import fragmentShader from 'shaders/basic/Frag.glsl';
import {
	warn,
} from 'utils/Console';
import Color from 'math/Color';
import { capabilities, extensions } from 'core/Capabilities';

let gl;
const normalMatrix = mat3.create();
const inversedModelViewMatrix = mat4.create();

export default class Shader {
	constructor(options) {
		const defaults = {
			name: '',
			uniforms: {},
			hookVertexPre: '',
			hookVertexMain: '',
			hookVertexEnd: '',
			hookFragmentPre: '',
			hookFragmentMain: '',
			hookFragmentEnd: '',
			vertexShader: `${vertexShader}`,
			fragmentShader: `${fragmentShader}`,
			drawType: CONSTANTS.DRAW_TRIANGLES,
			directionalLights: [],
			pointLights: [],
			culling: CONSTANTS.CULL_NONE,
		};

		Object.assign(this, defaults, options);
	}

	setAttributeLocation(attributeName) {
		gl = GL.get();
		this.attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
		gl.enableVertexAttribArray(this.attributeLocations[attributeName]);
	}

	setUniformLocation(uniformName) {
		gl = GL.get();
		this.uniforms[uniformName].location = gl.getUniformLocation(this.program, uniformName);
	}

	create(geometry) {
		gl = GL.get();

		this.vertexShader = this._processShader(this.vertexShader, geometry);
		this.fragmentShader = this._processShader(this.fragmentShader, geometry);

		// Create program
		this.compiledVertexShader = this._compile('vs', this.vertexShader);
		this.compiledFragmentShader = this._compile('fs', this.fragmentShader);
		this.customUniforms = this.uniforms || {};

		this.program = gl.createProgram();

		gl.attachShader(this.program, this.compiledVertexShader);
		gl.attachShader(this.program, this.compiledFragmentShader);
		gl.linkProgram(this.program);
		gl.validateProgram(this.program);

		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			const info = gl.getProgramInfoLog(this.program);
			warn('Failed to initialise shaders', info);
			return;
		}

		// Cache all attribute locations
		this.attributeLocations = {};

		// Cache attribute locations
		let attribute;

		Object.keys(geometry.attributes).forEach(attributeName => {
			attribute = geometry.attributes[attributeName];
			if (attribute.shaderAttribute) {
				this.setAttributeLocation(attributeName);
			}
		});

		// Cache instanced attribute locations
		if (extensions.angleInstanceArraysSupported) {
			Object.keys(geometry.attributesInstanced).forEach(attributeName => {
				this.setAttributeLocation(attributeName);
			});
		}

		// console.log(this.vertexPositionAttribute);
		// console.log(this.vertexNormalAttribute);
		// console.log(this.vertexColorAttribute);
		// console.log(this.textureCoordAttribute);
		// console.log(this.vertexUvAttribute);

		// Generate uniforms for directional lights
		this.directionalLights.forEach((directionalLightUniforms, i) => {
			Object.keys(directionalLightUniforms).forEach(directionalLightUniform => {
				const uniform = directionalLightUniforms[directionalLightUniform];
				this.customUniforms[`uDirectionalLights[${i}].${directionalLightUniform}`] = uniform;
			});
		});

		// Generate uniforms for point lights
		this.pointLights.forEach((pointLightUniforms, i) => {
			Object.keys(pointLightUniforms).forEach(pointLightUniform => {
				const uniform = pointLightUniforms[pointLightUniform];
				this.customUniforms[`uPointLights[${i}].${pointLightUniform}`] = uniform;
			});
		});

		// Add Camera position uniform for point lights if it doesn't exist
		if (this.uniforms.uCameraPosition === undefined && this.pointLights.length > 0) {
			this.uniforms.uCameraPosition = {
				type: '3f',
				value: [20, 20, 20],
			};
		}

		// Default uniforms
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
			this.setUniformLocation(uniformName);
		});

		// console.log(this.name, this.uniforms);
	}

	_processShader(shader, geometry) {
		gl = GL.get();
		let defines = '';

		const precision =
			`precision ${capabilities.precision} float;`;

		function addDefine(define) {
			defines += `#define ${define} \n`;
		}

		if (geometry.bufferUvs) {
			addDefine('uv');
		}

		if (geometry.bufferColors) {
			addDefine('vertexColors');
		}

		if (geometry.bufferNormals) {
			addDefine('normals');
		}

		if (this.directionalLights.length > 0) {
			addDefine('directionalLights');
		}

		if (this.pointLights.length > 0) {
			addDefine('pointLights');
		}

		shader = shader.replace(/#HOOK_PRECISION/g, precision);
		shader = shader.replace(/#HOOK_DEFINES/g, defines);
		shader = shader.replace(/#HOOK_VERTEX_PRE/g, this.hookVertexPre);
		shader = shader.replace(/#HOOK_VERTEX_MAIN/g, this.hookVertexMain);
		shader = shader.replace(/#HOOK_VERTEX_END/g, this.hookVertexEnd);
		shader = shader.replace(/#HOOK_FRAGMENT_PRE/g, this.hookFragmentPre);
		shader = shader.replace(/#HOOK_FRAGMENT_MAIN/g, this.hookFragmentMain);
		shader = shader.replace(/#HOOK_FRAGMENT_END/g, this.hookFragmentEnd);

		shader = shader.replace(/#HOOK_POINT_LIGHTS/g, this.pointLights.length);
		shader = shader.replace(/#HOOK_DIRECTIONAL_LIGHTS/g, this.directionalLights.length);

		return shader;
	}

	bindProgram() {
		const gl = GL.get();
		gl.useProgram(this.program);
	}

	setUniforms(modelViewMatrix, projectionMatrix, modelMatrix, camera) {
		const gl = GL.get();

		// Update the other uniforms
		Object.keys(this.customUniforms).forEach(uniformName => {
			const uniform = this.uniforms[uniformName];
			switch (uniform.type) {
				case 't':
					{
						const textureIndex =
							parseInt(uniformName.substring(uniformName.length - 1, uniformName.length), 10);
						gl.activeTexture(gl.TEXTURE0 + textureIndex);
						gl.bindTexture(gl.TEXTURE_2D, uniform.value);
						gl.uniform1i(uniform.location, 0);
						break;
					}
				case 'tc':
					{
						const textureIndex =
							parseInt(uniformName.substring(uniformName.length - 1, uniformName.length), 10);
						gl.activeTexture(gl.TEXTURE0 + textureIndex);
						gl.bindTexture(gl.TEXTURE_CUBE_MAP, uniform.value);
						gl.uniform1i(uniform.location, 0);
						break;
					}
				case 'i':
					{
						gl.uniform1i(uniform.location,
							uniform.value);
						break;
					}
				case 'f':
					{
						gl.uniform1f(uniform.location,
							uniform.value);
						break;
					}
				case '2f':
					{
						gl.uniform2f(uniform.location,
							uniform.value[0],
							uniform.value[1]);
						break;
					}
				case '3f':
					{
						gl.uniform3f(uniform.location,
							uniform.value[0],
							uniform.value[1],
							uniform.value[2]);
						break;
					}
				case '4f':
					{
						gl.uniform4f(uniform.location,
							uniform.value[0],
							uniform.value[1],
							uniform.value[2],
							uniform.value[3]);
						break;
					}
				case '1iv':
					{
						gl.uniform1iv(uniform.location,
							uniform.value);
						break;
					}
				case '2iv':
					{
						gl.uniform2iv(uniform.location,
							uniform.value);
						break;
					}
				case '1fv':
					{
						gl.uniform1fv(uniform.location,
							uniform.value);
						break;
					}
				case '2fv':
					{
						gl.uniform2fv(uniform.location,
							uniform.value);
						break;
					}
				case '3fv':
					{
						gl.uniform3fv(uniform.location,
							uniform.value);
						break;
					}
				case '4fv':
					{
						gl.uniform4fv(uniform.location,
							uniform.value);
						break;
					}
				case 'Matrix3fv':
					{
						gl.uniformMatrix3fv(uniform.location,
							false,
							uniform.value);
						break;
					}
				case 'Matrix4fv':
					{
						gl.uniformMatrix4fv(uniform.location,
							false,
							uniform.value);
						break;
					}
				default:
			}
		});

		// Matrix
		gl.uniformMatrix4fv(this.uniforms.uProjectionMatrix.location, false, projectionMatrix);
		gl.uniformMatrix4fv(this.uniforms.uViewMatrix.location, false, modelViewMatrix);
		gl.uniformMatrix4fv(this.uniforms.uModelMatrix.location, false, modelMatrix);

		mat4.identity(inversedModelViewMatrix);
		mat4.invert(inversedModelViewMatrix, modelMatrix);

		// Create normal normalMatrix
		// Removes scale and translation
		vec3.set(normalMatrix, 0, 0, 0);
		mat3.fromMat4(normalMatrix, inversedModelViewMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix3fv(this.uniforms.uNormalMatrix.location, false, normalMatrix);

		// Camera
		if (camera && this.uniforms.uCameraPosition) {
			gl.uniform3f(this.uniforms.uCameraPosition.location,
				camera.position.v[0],
				camera.position.v[1],
				camera.position.v[2]);
		}
	}

	_compile(type, source) {
		gl = GL.get();
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

	dispose() {
		gl = GL.get();
		// let attributeLocation;
		// Object.keys(this.attributeLocations).forEach(attributeName => {
		// 	attributeLocation = this.attributeLocations[attributeName];
		// 	gl.disableVertexAttribArray(attributeLocation);
		// });

		gl.detachShader(this.program, this.compiledVertexShader);
		gl.detachShader(this.program, this.compiledFragmentShader);
		gl.deleteProgram(this.program);
	}
}
