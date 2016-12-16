import * as GL from 'core/GL';
import BufferAttribute from './BufferAttribute';

export default class Geometry {
	constructor(vertices, indices, normals, uvs, colors) {
		const gl = GL.get();
		this.vertices = vertices;
		this.indices = indices;
		this.normals = normals;
		this.uvs = uvs;
		this.colors = colors;
		this.attributes = {};

		// Vertex positions
		if (this.vertices) {
			this.attributes.vertex = new BufferAttribute(gl, gl.ARRAY_BUFFER, vertices, 3);
		}

		// Vertex indices
		if (this.indices) {
			this.attributes.index = new BufferAttribute(gl, gl.ELEMENT_ARRAY_BUFFER, indices, 1);
		}

		// Vertex normals
		if (this.normals) {
			this.attributes.normal = new BufferAttribute(gl, gl.ARRAY_BUFFER, normals, 3);
		}

		// uvs
		if (this.uvs) {
			this.attributes.uv = new BufferAttribute(gl, gl.ARRAY_BUFFER, uvs, 2);
		}

		// Vertex colors
		if (this.colors) {
			this.attributes.color = new BufferAttribute(gl, gl.ARRAY_BUFFER, colors, 4);
		}
	}
}
