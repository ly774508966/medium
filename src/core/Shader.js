const glslify = require('glslify')
import * as GL from './GL'
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
