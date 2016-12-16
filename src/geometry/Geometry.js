import * as GL from 'core/GL';

export default class Geometry {
	constructor(vertices, indices, normals, uvs, colors) {
		const gl = GL.get();
		this.vertices = vertices;
		this.indices = indices;
		this.normals = normals;
		this.uvs = uvs;
		this.colors = colors;

		// Vertex positions
		if (this.vertices) {
			this.vertexPositionBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, vertices, 3);
		}

		// Vertex indices
		if (this.indices) {
			this.vertexIndexBuffer = GL.createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices, 1);
		}

		// Vertex normals
		if (this.normals) {
			this.vertexNormalBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, normals, 3);
		}

		// uvs
		if (this.uvs) {
			this.uvBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, uvs, 2);
		}

		// Vertex colors
		if (this.colors) {
			this.vertexColorBuffer = GL.createBuffer(gl, gl.ARRAY_BUFFER, colors, 4);
		}
	}
}
