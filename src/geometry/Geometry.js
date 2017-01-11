import * as GL from 'core/GL';
import BufferAttribute from './BufferAttribute';
import Face from './Face';
import Vector3 from 'math/Vector3';

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
			this.generateVertices();
		}

		// Vertex indices
		if (this.indices) {
			this.attributes.index = new BufferAttribute(gl, gl.ELEMENT_ARRAY_BUFFER, indices, 1);
			this.generateFaces();
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
			this.attributes.color = new BufferAttribute(gl, gl.ARRAY_BUFFER, colors, 3);
		}
	}

	generateVertices() {
		this.vertex = [];
		for (let i = 0; i < this.vertices.length; i += 3) {
			const a = this.vertices[i];
			const b = this.vertices[i + 1];
			const c = this.vertices[i + 2];
			const vertex = new Vector3(a, b, c);
			this.vertex.push(vertex);
		}
	}

	generateFaces() {
		this.faces = [];
		for (let i = 0; i < this.indices.length; i += 3) {
			const ia = this.indices[i];
			const ib = this.indices[i + 1];
			const ic = this.indices[i + 2];
			const a = this.vertex[ia];
			const b = this.vertex[ib];
			const c = this.vertex[ic];

			const face = new Face(ia, ib, ic, a, b, c);
			this.faces.push(face);
		}
	}
}
