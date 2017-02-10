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
import {
	capabilities,
} from 'core/Capabilities';
import UniformBuffers from 'core/UniformBuffers';

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
			directionalLights: false,
			pointLights: false,
			culling: CONSTANTS.CULL_NONE,
		};

		Object.assign(this, defaults, options);
	}

	setAttributeLocation(attributeName) {
		gl = GL.get();
		this.attributeLocations[attributeName] = gl.getAttribLocation(this.program, attributeName);
		gl.enableVertexAttribArray(this.attributeLocations[attributeName]);
	}

	setAttributePointer(attributeName) {
		gl = GL.get();
		gl.vertexAttribPointer(this.attributeLocations[attributeName],
			this.geometry.attributes[attributeName].itemSize, gl.FLOAT, false, 0, 0);
	}

	setAttributeInstancedPointer(attributeName) {
		gl = GL.get();
		gl.vertexAttribPointer(this.attributeLocations[attributeName],
			this.geometry.attributesInstanced[attributeName].itemSize, gl.FLOAT, false, 0, 0);
	}

	setUniformLocation(uniformName) {
		gl = GL.get();
		this.uniforms[uniformName].location = gl.getUniformLocation(this.program, uniformName);
	}

	setUniformBlockLocation(uniformName, uniformBuffer, i) {
		console.log('------- setUniformBlockLocation -------');
		console.log('uniformName', uniformName);
		gl = GL.get();
		this.uniformBlocks[uniformName] = gl.getUniformBlockIndex(this.program, uniformName);
		console.log('location', this.uniformBlocks[uniformName]);
		gl.uniformBlockBinding(this.program,
			this.uniformBlocks[uniformName], this.uniformBlocks[uniformName]);
		gl.bindBufferBase(gl.UNIFORM_BUFFER, i, uniformBuffer);
	}

	create(geometry) {
		gl = GL.get();
		this.geometry = geometry;

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

		// Uniform blocks
		this.uniformBlocks = {};

		// Cache all attribute locations
		this.attributeLocations = {};

		// Uniforms for ProjectionView uniform block
		this.setUniformBlockLocation('ProjectionView',
				UniformBuffers.projectionView.buffer, 0);

		// Setup uniform block for directional lights
		if (this.directionalLights) {
			this.setUniformBlockLocation('DirectionalLights',
					this.directionalLights.uniformBuffer.buffer, 1);
		}

		// Setup uniform block for point lights
		if (this.pointLights) {
			this.setUniformBlockLocation('PointLights',
					this.pointLights.uniformBuffer.buffer, 2);
		}

		// Add Camera position uniform for point lights if it doesn't exist
		if (this.uniforms.uCameraPosition === undefined && this.pointLights) {
			this.uniforms.uCameraPosition = {
				type: '3f',
				value: [20, 20, 20],
			};
		}

		// Default uniforms
		this.uniforms = Object.assign({
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

		if (this.directionalLights) {
			addDefine('directionalLights');
		}

		if (this.pointLights) {
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

		if (this.pointLights) {
			shader = shader.replace(/#HOOK_POINT_LIGHTS/g, this.pointLights.length);
		}

		if (this.directionalLights) {
			shader = shader.replace(/#HOOK_DIRECTIONAL_LIGHTS/g, this.directionalLights.length);
		}

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
		let attributeLocation;

		// Cleanup attribute locations
		Object.keys(this.attributeLocations).forEach(attributeName => {
			attributeLocation = this.attributeLocations[attributeName];
			gl.disableVertexAttribArray(attributeLocation);
		});

		// Dispose textures
		Object.keys(this.customUniforms).forEach(uniformName => {
			const uniform = this.uniforms[uniformName];
			switch (uniform.type) {
				case 't':
				case 'tc':
					{
						gl.deleteTexture(uniform.value);
						break;
					}
				default:
			}
		});

		gl.detachShader(this.program, this.compiledVertexShader);
		gl.detachShader(this.program, this.compiledFragmentShader);
		gl.deleteProgram(this.program);
	}
}
