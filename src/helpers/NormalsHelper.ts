import {
	mat4,
} from 'gl-matrix';
import Mesh from '../core/Mesh';
import Shader from '../core/Shader';
import * as GL from '../core/GL';
import { capabilities, extensions } from '../core/Capabilities';
import Geometry from '../geometry/Geometry';
import EsVersion from '../shaders/chunks/EsVersion.glsl';
import ProjectionView from '../shaders/chunks/ProjectionView.glsl';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

const vertexShaderEs300 = `${EsVersion}
	${ProjectionView}

	in vec3 aVertexPosition;

	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

const vertexShaderEs100 = `
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

function fragmentShaderEs300() {
	return `${EsVersion}
	precision ${capabilities.precision} float;
	out vec4 outgoingColor;

	void main(void){
		outgoingColor = vec4(1.0);
	}
	`;
}

function fragmentShaderEs100() {
	return `
	precision ${capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(1.0);
	}
	`;
}

class NormalsGeometry extends Geometry {
	constructor(mesh: Mesh, size = 0.5) {
		let vertices = [];

		const sx = mesh.scale.x;
		const sy = mesh.scale.y;
		const sz = mesh.scale.z;
		const length = mesh.geometry.bufferNormals.length / 3;
		for (let i = 0; i < length; i += 1) {
			const i3 = i * 3;
			const v0x = sx * mesh.geometry.bufferVertices[i3];
			const v0y = sy * mesh.geometry.bufferVertices[i3 + 1];
			const v0z = sz * mesh.geometry.bufferVertices[i3 + 2];
			const nx = mesh.geometry.bufferNormals[i3];
			const ny = mesh.geometry.bufferNormals[i3 + 1];
			const nz = mesh.geometry.bufferNormals[i3 + 2];
			const v1x = v0x + size * nx;
			const v1y = v0y + size * ny;
			const v1z = v0z + size * nz;
			vertices = vertices.concat([v0x, v0y, v0z, v1x, v1y, v1z]);
		}

		super(new Float32Array(vertices));
	}
}

export default class NormalsHelper extends Mesh {
	constructor(mesh, size = 1) {
		const vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
		const fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
		super(new NormalsGeometry(mesh, size), new Shader({
			name: 'NormalsHelper',
			vertexShader,
			fragmentShader,
		}));
	}

	draw(modelViewMatrix: mat4, projectionMatrix: mat4) {
		if (!this.visible) return;
		gl = GL.get();

		// Update modelMatrix
		this.updateMatrix();

		this.shader.program.bind();
		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);

		if (extensions.vertexArrayObject) {
			this.vao.bind();
		} else {
			this.bindAttributes();
			this.bindAttributesInstanced();
			this.bindIndexBuffer();
		}

		gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);

		if (extensions.vertexArrayObject) {
			this.vao.unbind();
		}
	}
}
