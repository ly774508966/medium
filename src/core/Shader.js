const glslify = require('glslify')
import * as GL from './GL'
import {vec3, mat3, mat4} from 'gl-matrix'
import VertexShader from 'shaders/vertex.glsl'
import FragmentShader from 'shaders/frag.glsl'

export default class Shader {

	constructor(options) {

		const defaults = {
			vertexColors: false,
			vertexNormals: false,
			vertexShader: VertexShader,
			fragmentShader: FragmentShader,
		}

		this.settings = Object.assign({}, defaults, options)

		const gl = GL.get()

		// Create program
		this.vertexShader = this._compile('vs', this.settings.vertexShader)
		this.fragmentShader = this._compile('fs', this.settings.fragmentShader)

		this.program = gl.createProgram()

		gl.attachShader(this.program, this.vertexShader)
		gl.attachShader(this.program, this.fragmentShader)
		gl.linkProgram(this.program)

		if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.warn('Failed to initialise shaders')
		}

		this.vertexPositionAttribute = gl.getAttribLocation(this.program, 'aVertexPosition')
		gl.enableVertexAttribArray(this.vertexPositionAttribute)

		if(this.settings.vertexNormals){
			this.vertexNormalAttribute = gl.getAttribLocation(this.program, 'aVertexNormal')
			gl.enableVertexAttribArray(this.vertexNormalAttribute)
		}

		if(this.settings.vertexColors){
			this.vertexColorAttribute = gl.getAttribLocation(this.program, 'aVertexColor')
			gl.enableVertexAttribArray(this.vertexColorAttribute)
		}

		// console.log(this.vertexPositionAttribute);
		// console.log(this.vertexNormalAttribute);
		// console.log(this.vertexColorAttribute);

		gl.useProgram(this.program)

		this.pMatrixUniform = gl.getUniformLocation(this.program, 'uPMatrix')
		this.mvMatrixUniform = gl.getUniformLocation(this.program, 'uMVMatrix')
		this.mMatrixUniform = gl.getUniformLocation(this.program, 'uModelMatrix')
		this.nMatrixUniform = gl.getUniformLocation(this.program, 'uNormalMatrix')
		this.ambientColorUniform = gl.getUniformLocation(this.program, 'uAmbientColor')
		this.directionalColorUniform = gl.getUniformLocation(this.program, 'uDirectionalColor')
		this.lightDirectionUniform = gl.getUniformLocation(this.program, 'uLightDirection')
	}

	bindProgram() {
		const gl = GL.get()
		gl.useProgram(this.program)
	}

	setUniforms(modelViewMatrix, projectionMatrix, modelMatrix) {

		const gl = GL.get()

		gl.uniformMatrix4fv(this.pMatrixUniform, false, projectionMatrix)
		gl.uniformMatrix4fv(this.mvMatrixUniform, false, modelViewMatrix)
		gl.uniformMatrix4fv(this.mMatrixUniform, false, modelMatrix)
		gl.uniform3f(this.ambientColorUniform, 0.1, 0.1, 0.1);
		gl.uniform3f(this.directionalColorUniform, 1.0, 1.0, 1.0);

		let direction = [0.0, 1.0, 1.0]
		let directionalInversed = vec3.create()
		vec3.normalize(directionalInversed, direction)
		// vec3.scale(directionalInversed, directionalInversed, -1)

		gl.uniform3fv(this.lightDirectionUniform, directionalInversed);

		let inversedModelViewMatrix = mat4.create()

		mat4.invert(inversedModelViewMatrix, modelMatrix)

		// removes scale and translation
		let normalMatrix = mat3.create()
		mat3.fromMat4(normalMatrix, inversedModelViewMatrix)
		mat3.transpose(normalMatrix, normalMatrix)
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix)
	}

	_compile(type, source) {

		const gl = GL.get()
		let shader

		switch (type) {
			case 'vs':
				shader = gl.createShader(gl.VERTEX_SHADER)
				break
			default:
				shader = gl.createShader(gl.FRAGMENT_SHADER)
		}

		gl.shaderSource(shader, source)
		gl.compileShader(shader)

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.warn('Failed to compile shader', gl.getShaderInfoLog(shader))
			return null
		}

		return shader
	}
}
