import Mesh from 'core/Mesh';
import Shader from 'core/Shader';
import * as GL from 'core/GL';
import { capabilities } from 'core/Capabilities';
import Geometry from 'geometry/Geometry';
import EsVersion from 'shaders/chunks/EsVersion.glsl';
import ProjectionView from 'shaders/chunks/ProjectionView.glsl';

const vertexShader = `${EsVersion}
	layout (location = 0) in vec3 aVertexPosition;
	layout (location = 1) in vec3 aVertexColor;

	${ProjectionView}

	uniform mat4 uViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelMatrix;

	out vec3 vColor;

	void main(void){
		vColor = aVertexColor;
		gl_Position = uProjectionView.projectionMatrix * uProjectionView.viewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

function fragmentShader() {
	return `${EsVersion}
	precision ${capabilities.precision} float;
	in vec3 vColor;
	out vec4 outputColor;

	void main(void){
		outputColor = vec4(vColor, 1.0);
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

		// Update modelMatrix
		this.updateMatrix();

		this.shader.bindProgram();
		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);

		gl.lineWidth(this.lineWidth);

		this.vao.bind();
		gl.drawArrays(gl.LINES, 0, this.geometry.attributes.aVertexPosition.numItems);
		this.vao.unbind();
	}
}
