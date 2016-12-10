import * as GL from 'core/GL';

export default class Geometry {
	constructor(vertices, indices, normals, uvs) {
		const gl = GL.get();

		// Vertex positions
		this.vertexPositionBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, vertices, 3);

		// Vertex indices
		this.vertexIndexBuffer = GL.createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices, 1);

		// Vertex normals
		this.vertexNormalBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, normals, 3);

		// uvs
		if (uvs.length > 0) {
			this.uvBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, uvs, 2);
		}
	}

	setVertexColors(colors) {
		const gl = GL.get();

		// Vertex colors
		this.vertexColorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		this.vertexColorBuffer.itemSize = 4;
		this.vertexColorBuffer.numItems = 4;
	}
}
