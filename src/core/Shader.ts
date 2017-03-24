import * as GL from './GL';
import * as CONSTANTS from './Constants';
import {
	mat3,
	mat4,
	vec3,
} from 'gl-matrix';
import {
	vertexShaderEs300,
	vertexShaderEs100,
} from '../shaders/basic/Vertex.glsl';
import {
	fragmentShaderEs300,
	fragmentShaderEs100,
} from '../shaders/basic/Frag.glsl';
import ShaderParser from '../utils/ShaderParser';
import Color from '../math/Color';
import {
	capabilities,
} from './Capabilities';
import UniformBuffers from './UniformBuffers';
import Program from './Program';
import Geometry from '../geometry/Geometry';
import Lights from '../lights/Lights';
import PerspectiveCamera from '../core/PerspectiveCamera';
import OrthographicCamera from '../core/OrthographicCamera';

let gl: WebGL2RenderingContext | WebGLRenderingContext;
const normalMatrix: mat3 = mat3.create();
const inversedViewMatrix: mat4 = mat4.create();
const inversedModelViewMatrix: mat4 = mat4.create();

interface Options {
	name?: string;
	uniforms?: any;
	fov?: number;
	hookVertexPre?: string;
	hookVertexMain?: string;
	hookVertexEnd?: string;
	hookFragmentPre?: string;
	hookFragmentMain?: string;
	hookFragmentEnd?: string;
	vertexShader?: string;
	fragmentShader?: string;
	drawType?: number;
	directionalLights?: Lights;
	pointLights?: Lights;
	culling?: number;
}

export default class Shader {
	name: string;
	uniforms: any;
	fov: number;
	hookVertexPre: string;
	hookVertexMain: string;
	hookVertexEnd: string;
	hookFragmentPre: string;
	hookFragmentMain: string;
	hookFragmentEnd: string;
	vertexShader: string;
	fragmentShader: string;
	drawType: number;
	directionalLights: Lights;
	pointLights: Lights;
	culling: number;
	program: Program;
	customUniforms: object;

	constructor(options: Options) {
		const vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
		const fragmentShader = GL.webgl2 ? fragmentShaderEs300 : fragmentShaderEs100;
		this.name = '';
		this.uniforms = {};
		this.hookVertexPre = '';
		this.hookVertexMain = '';
		this.hookVertexEnd = '';
		this.hookFragmentPre = '';
		this.hookFragmentMain = '';
		this.hookFragmentEnd = '';
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.drawType = CONSTANTS.DRAW_TRIANGLES;
		this.directionalLights = undefined;
		this.pointLights = undefined;
		this.culling = CONSTANTS.CULL_NONE;
		Object.assign(this, options);
		this.program = new Program();
	}

	create(geometry: Geometry, transformFeedbackVaryings?: Array<string>) {
		gl = GL.get();

		this.vertexShader = this._processShader(this.vertexShader, 'vertex', geometry);
		this.fragmentShader = this._processShader(this.fragmentShader, 'fragment', geometry);

		this.program.link(this.vertexShader, this.fragmentShader, transformFeedbackVaryings);

		// User defined uniforms
		this.customUniforms = this.uniforms || {};

		// Uniforms for ProjectionView uniform block
		if (GL.webgl2) {
			this.program.setUniformBlockLocation('ProjectionView',
				UniformBuffers.projectionView.buffer, CONSTANTS.UNIFORM_PROJECTION_VIEW_LOCATION);
		}

		if (this.directionalLights) {
			if (GL.webgl2) {
				// Setup uniform block for directional lights
				this.program.setUniformBlockLocation('DirectionalLights',
					this.directionalLights.uniformBuffer.buffer, CONSTANTS.UNIFORM_DIRECTIONAL_LIGHTS_LOCATION);
			} else {
				// Generate uniforms for directional lights
				this.directionalLights.get().forEach((directionalLight, i) => {
					Object.keys(directionalLight.uniforms).forEach(directionalLightUniform => {
						const uniform = directionalLight.uniforms[directionalLightUniform];
						this.customUniforms[`uDirectionalLights[${i}].${directionalLightUniform}`] = uniform;
					});
				});
			}
		}

		if (this.pointLights) {
			if (GL.webgl2) {
				// Setup uniform block for point lights
				this.program.setUniformBlockLocation('PointLights',
					this.pointLights.uniformBuffer.buffer, CONSTANTS.UNIFORM_SPOT_LIGHTS_LOCATION);
			} else {
				// Generate uniforms for point lights
				this.pointLights.get().forEach((pointLight, i) => {
					Object.keys(pointLight.uniforms).forEach(pointLightUniform => {
						const uniform = pointLight.uniforms[pointLightUniform];
						this.customUniforms[`uPointLights[${i}].${pointLightUniform}`] = uniform;
					});
				});
			}
		}

		// Add Camera position uniform for point lights if it doesn"t exist
		if (this.uniforms.uCameraPosition === undefined && this.pointLights) {
			this.uniforms.uCameraPosition = {
				type: '3f',
				value: [0, 0, 0],
			};
		}

		// Only for webgl1
		const projectionViewUniforms = GL.webgl2 ? {} : {
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
		};

		// Default uniforms
		this.uniforms = Object.assign({
			uViewMatrixInverse: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uModelMatrix: {
				type: '4fv',
				value: mat4.create(),
				location: null,
			},
			uModelMatrixInverse: {
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
		}, this.customUniforms, projectionViewUniforms);

		Object.keys(this.uniforms).forEach(uniformName => {
			this.program.setUniformLocation(this.uniforms, uniformName);
		});
	}

	_processSyntax(chunk: string) {
		// Convert es300 to es100
		if (GL.webgl2) {
			return chunk;
		}

		const rules = [
			// Vertex

			// Frag
			{ match: 'outgoingColor', replace: 'gl_FragColor' },
			{ match: 'texture', replace: 'texture2D' },
		];

		rules.forEach(rule => {
			chunk = chunk.replace(`/${rule.match}/g`, rule.replace);
		});

		return chunk;
	}

	_processShader(shader: string, type: string, geometry: Geometry) {
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
			shader = shader.replace(/#HOOK_POINT_LIGHTS/g, String(this.pointLights.length));
		}

		if (this.directionalLights) {
			shader = shader.replace(/#HOOK_DIRECTIONAL_LIGHTS/g, String(this.directionalLights.length));
		}

		return ShaderParser(shader, type);
	}

	setUniforms(modelViewMatrix: mat4, projectionMatrix: mat4, modelMatrix: mat4, camera?: PerspectiveCamera | OrthographicCamera) {
		gl = GL.get();

		// Update the other uniforms
		Object.keys(this.customUniforms).forEach(uniformName => {
			const uniform = this.uniforms[uniformName];
			switch (uniform.type) {
				case 't':
					{
						gl.uniform1i(uniform.location, uniform.textureIndex);
						let activeTexture;
						switch (uniform.textureIndex) {
							case 5:
								activeTexture = gl.TEXTURE5;
								break;
							case 4:
								activeTexture = gl.TEXTURE4;
								break;
							case 3:
								activeTexture = gl.TEXTURE3;
								break;
							case 2:
								activeTexture = gl.TEXTURE2;
								break;
							case 1:
								activeTexture = gl.TEXTURE1;
								break;
							default:
								activeTexture = gl.TEXTURE0;
						}
						gl.activeTexture(activeTexture);
						gl.bindTexture(gl.TEXTURE_2D, uniform.value);
						break;
					}
				case 'tc':
					{
						gl.uniform1i(uniform.location, uniform.textureIndex);
						let activeTexture;
						switch (uniform.textureIndex) {
							case 5:
								activeTexture = gl.TEXTURE5;
								break;
							case 4:
								activeTexture = gl.TEXTURE4;
								break;
							case 3:
								activeTexture = gl.TEXTURE3;
								break;
							case 2:
								activeTexture = gl.TEXTURE2;
								break;
							case 1:
								activeTexture = gl.TEXTURE1;
								break;
							default:
								activeTexture = gl.TEXTURE0;
						}
						gl.activeTexture(activeTexture);
						gl.bindTexture(gl.TEXTURE_CUBE_MAP, uniform.value);
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

		if (!GL.webgl2) {
			// Matrix
			gl.uniformMatrix4fv(this.uniforms.uProjectionMatrix.location, false, projectionMatrix);
			gl.uniformMatrix4fv(this.uniforms.uViewMatrix.location, false, modelViewMatrix);
		}

		// Inverse view matrix
		mat4.identity(inversedViewMatrix);
		mat4.invert(inversedViewMatrix, modelViewMatrix);

		gl.uniformMatrix4fv(this.uniforms.uViewMatrixInverse.location, false, inversedViewMatrix);

		// Inverse model matrix
		gl.uniformMatrix4fv(this.uniforms.uModelMatrix.location, false, modelMatrix);

		mat4.identity(inversedModelViewMatrix);
		mat4.invert(inversedModelViewMatrix, modelMatrix);

		gl.uniformMatrix4fv(this.uniforms.uModelMatrixInverse.location, false, inversedModelViewMatrix);

		// Create normal normalMatrix
		// Removes scale and translation
		vec3.set(normalMatrix, 0, 0, 0);
		mat3.fromMat4(normalMatrix, inversedModelViewMatrix);
		mat3.transpose(normalMatrix, normalMatrix);
		gl.uniformMatrix3fv(this.uniforms.uNormalMatrix.location, false, normalMatrix);

		// uDiffuse
		gl.uniform3f(this.uniforms.uDiffuse.location,
			this.uniforms.uDiffuse.value[0],
			this.uniforms.uDiffuse.value[1],
			this.uniforms.uDiffuse.value[2]);

		// Camera
		if (camera && this.uniforms.uCameraPosition) {
			gl.uniform3f(this.uniforms.uCameraPosition.location,
																camera.position.v[0],
																camera.position.v[1],
																camera.position.v[2]);
		}
	}

	dispose() {
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
		this.program.dispose();
	}
}
