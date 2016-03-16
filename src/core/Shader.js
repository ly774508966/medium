const glslify = require('glslify')
import * as GL from './GL'

export default class Shader {

	constructor() {

		const gl = GL.get()

		// Create program
		this.vertexShader = this._compile('vs', glslify('../../shaders/vertex.glsl'))
		this.fragmentShader = this._compile('fs', glslify('../../shaders/frag.glsl'))

		this.shaderProgram = gl.createProgram()

		gl.attachShader(this.shaderProgram, this.vertexShader)
		gl.attachShader(this.shaderProgram, this.fragmentShader)
		gl.linkProgram(this.shaderProgram)

		if(!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
			console.warn('Failed to initialise shaders')
		}

		gl.useProgram(this.shaderProgram)

		this.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, 'aVertexPosition')
		gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute)

		this.vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, 'aVertexColor')
		gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute)

		this.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, 'uPMatrix')
		this.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, 'uMVMatrix')
	}

	setMatrixUniforms(pMatrix, mvMatrix) {

		const gl = GL.get()

		gl.uniformMatrix4fv(this.pMatrixUniform, false, pMatrix)
		gl.uniformMatrix4fv(this.mvMatrixUniform, false, mvMatrix)
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
