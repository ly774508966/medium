import * as GL from 'core/GL';
import { extensions } from 'core/Capabilities';
import BufferAttribute from './BufferAttribute';
import Face from './Face';
import Vector3 from 'math/Vector3';
import Vector2 from 'math/Vector2';
import { ERROR_EXTENSION_ANGLE_INSTANCE_ARRAYS } from 'core/Messages';
import { warn } from 'utils/Console';

let gl;

export default class Geometry {
	constructor(vertices, indices, normals, uvs, colors) {
		gl = GL.get();
		this.vertices = vertices;
		this.indices = indices;
		this.normals = normals;
		this.uvs = uvs;
		this.colors = colors;
		this.attributes = {};
		this.attributesInstanced = {};

		// Vertex positions
		if (this.vertices) {
			this.addAttribute('aVertexPosition', gl.ARRAY_BUFFER, vertices, 3);
			this.generateVertices();
		}

		// Vertex indices
		if (this.indices) {
			this.addAttribute('aIndex', gl.ELEMENT_ARRAY_BUFFER, indices, 1, false);
			this.generateFaces();
		}

		// Vertex normals
		if (this.normals) {
			this.addAttribute('aVertexNormal', gl.ARRAY_BUFFER, normals, 3);
		}

		// uvs
		if (this.uvs) {
			this.addAttribute('aUv', gl.ARRAY_BUFFER, uvs, 2);
			this.generateUvs();
		}

		// Vertex colors
		if (this.colors) {
			this.addAttribute('aVertexColor', gl.ARRAY_BUFFER, colors, 3);
		}
	}

	addAttribute(name, type, data, count, shaderAttribute) {
		gl = GL.get();
		this.attributes[name] = new BufferAttribute(gl, type, data, count, shaderAttribute);
	}

	addInstancedBufferAttribute(name, value, count) {
		gl = GL.get();
		if (!extensions.angleInstanceArraysSupported) {
			warn(ERROR_EXTENSION_ANGLE_INSTANCE_ARRAYS);
			return;
		}
		this.attributesInstanced[name] = new BufferAttribute(gl, gl.ARRAY_BUFFER, value, count);
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
		this.face = [];
		for (let i = 0; i < this.indices.length; i += 3) {
			const ia = this.indices[i];
			const ib = this.indices[i + 1];
			const ic = this.indices[i + 2];
			const a = this.vertex[ia];
			const b = this.vertex[ib];
			const c = this.vertex[ic];

			const face = new Face(ia, ib, ic, a, b, c);
			this.face.push(face);
		}
	}

	generateUvs() {
		this.uv = [];
		for (let i = 0; i < this.uvs.length; i += 2) {
			const a = this.uvs[i];
			const b = this.uvs[i + 1];

			const uv = new Vector2(a, b);
			this.uv.push(uv);
		}
	}
}
