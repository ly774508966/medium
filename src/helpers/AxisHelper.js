import Mesh from 'core/Mesh';
import Shader from 'core/Shader';
import * as GL from 'core/GL';
import { capabilities } from 'core/Capabilities';
import Geometry from 'geometry/Geometry';

const vertexShader = `
	attribute vec3 aVertexPosition;
	attribute vec3 aVertexColor;

	uniform mat4 uViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelMatrix;

	varying vec3 vColor;

	void main(void){
		vColor = aVertexColor;
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

function fragmentShader() {
	return `
	precision ${capabilities.precision} float;
	varying vec3 vColor;

	void main(void){
		gl_FragColor = vec4(vColor, 1.0);
	}
	`;
}

class AxisGeometry extends Geometry {
	constructor(size) {
		let vertices = [];

		// X
		vertices = vertices.concat([0, 0, 0, size, 0, 0]);
		// Y
		vertices = vertices.concat([0, 0, 0, 0, size, 0]);
		// Z
		vertices = vertices.concat([0, 0, 0, 0, 0, size]);

		// Colors
		const colors = [
			1, 0, 0,
			1, 0, 0,
			0, 1, 0,
			0, 1, 0,
			0, 0, 1,
			0, 0, 1,
		];
		super(vertices, null, null, null, colors);
	}
}

export default class Axis extends Mesh {
	constructor(size = 1, lineWidth = 3) {
		super(new AxisGeometry(size), new Shader({
			name: 'AxisHelper',
			vertexShader,
			fragmentShader: fragmentShader(),
		}));
		this.lineWidth = lineWidth;
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get();

		this.shader.bindProgram();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.aVertexPosition.buffer);
		gl.vertexAttribPointer(this.shader.attributeLocations.aVertexPosition,
			this.geometry.attributes.aVertexPosition.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.aVertexColor.buffer);
		gl.vertexAttribPointer(this.shader.attributeLocations.aVertexColor,
			this.geometry.attributes.aVertexColor.itemSize, gl.FLOAT, false, 0, 0);

		// Update modelMatrix
		this.updateMatrix();

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);

		gl.lineWidth(this.lineWidth);
		gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);
	}
}
