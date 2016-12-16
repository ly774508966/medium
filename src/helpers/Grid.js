import {
	mat4,
} from 'gl-matrix';
import {
	lerp,
} from 'math/utils';
import Mesh from 'core/Mesh';
import Shader from 'core/Shader';
import * as GL from 'core/GL';
import Geometry from 'geometry/Geometry';

const vertexShader = `
	attribute vec3 aVertexPosition;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;
	uniform mat4 uModelMatrix;

	void main(void){
		gl_Position = uPMatrix * uMVMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

const fragmentShader = `
	precision mediump float;

	void main(void){
		gl_FragColor = vec4(vec3(0.5), 1.0);
	}
`;

class GridGeometry extends Geometry {
	constructor(size, divisions) {
		let vertices = [];
		const halfSize = size * 0.5;

		for (let i = 0; i < divisions; i++) {
			const x1 = lerp(-halfSize, halfSize, i / (divisions - 1));
			const y1 = 0;
			const z1 = -halfSize;
			const x2 = lerp(-halfSize, halfSize, i / (divisions - 1));
			const y2 = 0;
			const z2 = halfSize;
			vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
		}

		for (let i = 0; i < divisions; i++) {
			const x1 = -halfSize;
			const y1 = 0;
			const z1 = lerp(-halfSize, halfSize, i / (divisions - 1));
			const x2 = halfSize;
			const y2 = 0;
			const z2 = lerp(-halfSize, halfSize, i / (divisions - 1));
			vertices = vertices.concat([x1, y1, z1, x2, y2, z2]);
		}

		super(vertices);
	}
}

export default class Grid extends Mesh {
	constructor(size = 1, divisions = 10) {
		super(new GridGeometry(size, divisions), new Shader({
			vertexShader,
			fragmentShader,
		}));
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get();

		this.shader.bindProgram();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.vertex.buffer);
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute,
			this.geometry.attributes.vertex.itemSize, gl.FLOAT, false, 0, 0);

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);

		gl.drawArrays(gl.LINES, 0, this.geometry.attributes.vertex.numItems);
	}
}
