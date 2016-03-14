const glslify = require('glslify')
import { mat4 } from 'gl-matrix'

let triangleVertexPositionBuffer = null
let triangleVertexColorBuffer = null
let squareVertexPositionBuffer = null
let gl = undefined
let mvMatrix = mat4.create()
let pMatrix = mat4.create()
let outMatrix = mat4.create()
let shaderProgram

export default class Renderer {

	constructor() {

		this._canvas = document.createElement('canvas')
		this._canvas.width = 1280 * 0.6
		this._canvas.height = 720 * 0.6
		document.body.appendChild(this._canvas)

		this._initGL(this._canvas)

		if (gl === undefined) {
			console.log('(')
			return
		}

		this._initShaders()
		this._initBuffers()

		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.enable(gl.DEPTH_TEST)

		this._draw()
	}

	_initGL(canvas) {

		try {
			gl = canvas.getContext('experimental-webgl')
			gl.viewportWidth = canvas.width
			gl.viewportHeight = canvas.height
		} catch (error) {
			console.log('Webgl not supported')
		}
	}

	_compileShader(shaderStr, type) {

		let shader

		switch (type) {
			case 'vs':
				shader = gl.createShader(gl.VERTEX_SHADER)
				break
			default:
				shader = gl.createShader(gl.FRAGMENT_SHADER)
		}

		gl.shaderSource(shader, shaderStr)
		gl.compileShader(shader)

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			console.warn('failed to compile shader', gl.getShaderInfoLog(shader))
			return null
		}

		return shader
	}

	_initShaders() {

		let vertexShader = this._compileShader(glslify('../shaders/vertex.glsl'), 'vs')
		let fragmentShader = this._compileShader(glslify('../shaders/frag.glsl'), 'fs')

		shaderProgram = gl.createProgram()
		gl.attachShader(shaderProgram, vertexShader)
		gl.attachShader(shaderProgram, fragmentShader)
		gl.linkProgram(shaderProgram)

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			console.warn('could not initialise shaders')
		}

		gl.useProgram(shaderProgram)

		shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)

		shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor')
		gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute)

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix')
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix')
	}

	_setMatrixUniforms() {
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix)
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix)
	}

	_initBuffers() {

		triangleVertexPositionBuffer = null
		triangleVertexColorBuffer = null
		squareVertexPositionBuffer = null

		// Setup triangle buffer
		triangleVertexPositionBuffer = gl.createBuffer()

		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer)

		let vertices = [ 0.0, 1.0,  0.0,
						-1.0, -1.0, 0.0,
						 1.0, -1.0, 0.0 ]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)


		triangleVertexColorBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer)
		let vertexColors = [
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 0.0, 1.0, 1.0,
		]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW)

		triangleVertexPositionBuffer.itemSize = 3
		triangleVertexPositionBuffer.numItems = 3
		triangleVertexColorBuffer.itemSize = 4
		triangleVertexColorBuffer.numItems = 3

		// Setup square buffer
		squareVertexPositionBuffer = gl.createBuffer()

		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer)

		vertices = [ 1.0, 1.0, 0.0, -1.0,
					1.0, 0.0, 1.0, -1.0,
					0.0, -1.0, -1.0, 0.0 ]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

		squareVertexPositionBuffer.itemSize = 3
		squareVertexPositionBuffer.numItems = 4
	}

	_draw() {

		gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight)

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix)

		mat4.identity(mvMatrix)

		mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, 0.0])

		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer)
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0.0, 0.0)

		gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer)
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0.0, 0.0)

		this._setMatrixUniforms()
		gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems)

		// mat4.translate(mvMatrix, mvMatrix, [0.2, 0.0, 0.2])
		//
		// gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer)
		// gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0.0, 0.0)
		//
		// this._setMatrixUniforms()
		//
		// gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems)
	}
}
