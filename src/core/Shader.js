const glslify = require('glslify')
import * as GL from './GL'

export default class Shader {

	constructor() {

		const gl = GL.get()

		// Create program
		this.vertexShader = this._compile('vs', glslify('../../shaders/vertex.glsl'))
		this.fragmentShader = this._compile('fs', glslify('../../shaders/frag.glsl'))

		this.program = gl.createProgram()

		gl.attachShader(this.program, this.vertexShader)
		gl.attachShader(this.program, this.fragmentShader)
		gl.linkProgram(this.program)

		if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.warn('Failed to initialise shaders')
		}

		gl.useProgram(this.program)

		this.vertexPositionAttribute = gl.getAttribLocation(this.program, 'aVertexPosition')
		gl.enableVertexAttribArray(this.vertexPositionAttribute)

		this.vertexColorAttribute = gl.getAttribLocation(this.program, 'aVertexColor')
		gl.enableVertexAttribArray(this.vertexColorAttribute)

		this.pMatrixUniform = gl.getUniformLocation(this.program, 'uPMatrix')
		this.mvMatrixUniform = gl.getUniformLocation(this.program, 'uMVMatrix')
	}

	setUniforms(modelViewMatrix, projectionMatrix) {

		const gl = GL.get()

		gl.uniformMatrix4fv(this.pMatrixUniform, false, projectionMatrix)
		gl.uniformMatrix4fv(this.mvMatrixUniform, false, modelViewMatrix)
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
