import {
	lerp,
} from '../math/Utils';
import Mesh from '../core/Mesh';
import Shader from '../core/Shader';
import * as GL from '../core/GL';
import { capabilities, extensions } from '../core/Capabilities';
import Geometry from '../geometry/Geometry';
import EsVersion from '../shaders/chunks/EsVersion.glsl';
import ProjectionView from '../shaders/chunks/ProjectionView.glsl';

const vertexShaderEs300 = `${EsVersion}
	${ProjectionView}

	in vec3 aVertexPosition;

	uniform mat4 uModelMatrix;

	void main(void){
		gl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

const vertexShaderEs100 = `
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	uniform mat4 uModelMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

function fragmentShaderEs300() {
	return `${EsVersion}
	precision ${capabilities.precision} float;
	out vec4 outputColor;

	void main(void){
		outputColor = vec4(vec3(0.5), 1.0);
	}
	`;
}

function fragmentShaderEs100() {
	return `
	precision ${capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(vec3(0.5), 1.0);
	}
	`;
}

class GridGeometry extends Geometry {
	constructor(size: number, divisions: number) {
		let vertices = [];
		const halfSize = size * 0.5;

		for (let i = 0; i < divisions + 1; i += 1) {
			const x1 = lerp(-halfSize, halfSize, i / divisions);
			const y1 = 0;
			const z1 = -halfSize;
			const x2 = lerp(-halfSize, halfSize, i / divisions);
			const y2 = 0;
			const z2 = halfSize;
			vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
		}

		for (let i = 0; i < divisions + 1; i += 1) {
			const x1 = -halfSize;
			const y1 = 0;
			const z1 = lerp(-halfSize, halfSize, i / divisions);
			const x2 = halfSize;
			const y2 = 0;
			const z2 = lerp(-halfSize, halfSize, i / divisions);
			vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
		}

		super(new Float32Array(vertices));
	}
}

export default class Grid extends Mesh {
	constructor(size = 1, divisions = 10) {
		const vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
		const fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
		super(new GridGeometry(size, divisions), new Shader({
			name: 'GridHelper',
			vertexShader,
			fragmentShader,
		}));
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get();

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
