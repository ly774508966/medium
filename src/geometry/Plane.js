import * as GL from 'core/GL'

export default class Plane {

	constructor(width = 1, height = 1, divisionsX = 1, divisionsY = 1) {

		this._width  = width
		this._height = height
		this._divisionsX = divisionsX
		this._divisionsY = divisionsY
		this.colors = []

		const gl = GL.get()

		/*
			(-1, 1)  (0, 1)  (1, 1)

			(-1, 0)  (0, 0)  (1, 0)

			(-1,-1)  (0,-1)  (1,-1)
		 */

		// Vertex positions
		this.vertexPositionBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer)

		const vertices = [
			-1.0, -1.0,  0.0,
			 1.0, -1.0,  0.0,
			 1.0,  1.0,  0.0,
			-1.0,  1.0,  0.0,
		]

		for (let i = 0; i < vertices.length; i+=3) {
			vertices[i] *= width
			vertices[i+1] *= height
		}

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

		this.vertexPositionBuffer.itemSize = 3
		this.vertexPositionBuffer.numItems = 4

		// Vertex indices
		this.vertexIndexBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)

		const indices = [
			0, 1, 2, 0, 2, 3
		]

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
		this.vertexIndexBuffer.itemSize = 1
		this.vertexIndexBuffer.numItems = 6

		// Vertex normals
		this.vertexNormalBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer)

		const normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
		]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

		this.vertexNormalBuffer.itemSize = 3
		this.vertexNormalBuffer.numItems = 4

		// Texture coords
		this.textureCoordBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer)

		const coords = [
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
		]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW)

		this.textureCoordBuffer.itemSize = 2
		this.textureCoordBuffer.numItems = 4
	}

	setVertexColors(colors) {

		const gl = GL.get()

		// Vertex colors
		this.vertexColorBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

		this.vertexColorBuffer.itemSize = 4
		this.vertexColorBuffer.numItems = 4
	}
}
