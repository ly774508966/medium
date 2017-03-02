import * as GL from '../core/GL';
import BufferAttribute from './BufferAttribute';
import Face from './Face';
import Vector3 from '../math/Vector3';
import Vector2 from '../math/Vector2';

let gl;

interface Attributes extends Object {
	aVertexPosition?: BufferAttribute;
}

export default class Geometry {
	bufferVertices: Float32Array;
	bufferIndices: Uint16Array;
	bufferNormals: Float32Array;
	bufferUvs: Float32Array;
	bufferColors: Float32Array;
	attributes: any;
	attributesInstanced: any;
	vertices: Array<Vector3>;
	faces: Array<Face>;
	uvs: Array<Vector2>;

	constructor(vertices: Float32Array, indices?: Uint16Array, normals?: Float32Array, uvs?: Float32Array, colors?: Float32Array) {
		gl = GL.get();
		this.bufferVertices = vertices;
		this.bufferIndices = indices;
		this.bufferNormals = normals;
		this.bufferUvs = uvs;
		this.bufferColors = colors;
		this.attributes = {};
		this.attributesInstanced = {};

		// Vertex positions
		if (this.bufferVertices) {
			this.addAttribute('aVertexPosition', gl.ARRAY_BUFFER, this.bufferVertices, 3);
			this.generateVertices();
		}

		// Vertex indices
		if (this.bufferIndices) {
			this.addAttribute('aIndex', gl.ELEMENT_ARRAY_BUFFER, this.bufferIndices, 1, false);
			this.generateFaces();
		}

		// Vertex normals
		if (this.bufferNormals) {
			this.addAttribute('aVertexNormal', gl.ARRAY_BUFFER, this.bufferNormals, 3);
		}

		// uvs
		if (this.bufferUvs) {
			this.addAttribute('aUv', gl.ARRAY_BUFFER, this.bufferUvs, 2);
			this.generateUvs();
		}

		// Vertex colors
		if (this.bufferColors) {
			this.addAttribute('aVertexColor', gl.ARRAY_BUFFER, this.bufferColors, 3);
		}
	}

	addAttribute(name: string, type: number, data: Float32Array | Uint16Array, count: number, shaderAttribute?: boolean) {
		this.attributes[name] = new BufferAttribute(type, data, count, shaderAttribute);
	}

	addInstancedBufferAttribute(name, value, count) {
		this.attributesInstanced[name] = new BufferAttribute(gl.ARRAY_BUFFER, value, count);
	}

	generateVertices() {
		this.vertices = [];
		for (let i = 0; i < this.bufferVertices.length; i += 3) {
			const a = this.bufferVertices[i];
			const b = this.bufferVertices[i + 1];
			const c = this.bufferVertices[i + 2];
			const vertex = new Vector3(a, b, c);
			this.vertices.push(vertex);
		}
	}

	generateFaces() {
		this.faces = [];
		for (let i = 0; i < this.bufferIndices.length; i += 3) {
			const ia = this.bufferIndices[i];
			const ib = this.bufferIndices[i + 1];
			const ic = this.bufferIndices[i + 2];
			const a = this.vertices[ia];
			const b = this.vertices[ib];
			const c = this.vertices[ic];

			const face = new Face(ia, ib, ic, a, b, c);
			this.faces.push(face);
		}
	}

	generateUvs() {
		this.uvs = [];
		for (let i = 0; i < this.bufferUvs.length; i += 2) {
			const a = this.bufferUvs[i];
			const b = this.bufferUvs[i + 1];

			const uv = new Vector2(a, b);
			this.uvs.push(uv);
		}
	}

	updateVertices() {
		gl = GL.get();
		// this.bufferVertices = [];
		this.vertices.forEach((vertex, i) => {
			this.bufferVertices.set(vertex.v, i * vertex.v.length);
		});
		this.attributes.aVertexPosition.update(new Float32Array(this.bufferVertices));
	}

	dispose() {
		gl = GL.get();
		// Dispose attributes and buffers
		Object.keys(this.attributes).forEach(attributeName => {
			this.attributes[attributeName].dispose(gl);
			delete this.attributes[attributeName];
		});
		Object.keys(this.attributesInstanced).forEach(attributeName => {
			this.attributesInstanced[attributeName].dispose(gl);
			delete this.attributesInstanced[attributeName];
		});
		delete this.attributes;
		delete this.attributesInstanced;
		this.bufferVertices = null;
		this.bufferIndices = null;
		this.bufferNormals = null;
		this.bufferUvs = null;
		this.bufferColors = null;
	}
}
