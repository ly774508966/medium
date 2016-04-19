import * as GL from 'core/GL'

export default class Box {

	constructor(width = 1, height = 1, depth = 1) {

		this._width = width
		this._height = height
		this._depth = depth
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

			// Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,

            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,

            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
		]

		for (let i = 0; i < vertices.length; i+=3) {
			vertices[i] *= width
			vertices[i+1] *= height
			vertices[i+2] *= depth
		}

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

		this.vertexPositionBuffer.itemSize = 3
		this.vertexPositionBuffer.numItems = 24

		// Vertex indices
		this.vertexIndexBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer)

		const indices = [

			0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
		]

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
		this.vertexIndexBuffer.itemSize = 1
		this.vertexIndexBuffer.numItems = 36

		// Vertex normals
		this.vertexNormalBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer)

		const normals = [

			// Front
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			// Back
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,

			// Top
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,

			// Bottom
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,

			// Right
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,

			// Left
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
		]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)

		this.vertexNormalBuffer.itemSize = 3
		this.vertexNormalBuffer.numItems = 24
	}

	setVertexColors(colors) {

		const gl = GL.get()

		// Vertex colors
		this.vertexColorBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

		this.vertexColorBuffer.itemSize = 4
		this.vertexColorBuffer.numItems = 24
	}
}
