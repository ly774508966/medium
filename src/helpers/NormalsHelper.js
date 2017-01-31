import Mesh from 'core/Mesh';
import Shader from 'core/Shader';
import * as GL from 'core/GL';
import { capabilities } from 'core/Capabilities';
import Geometry from 'geometry/Geometry';
import shaderVersion from 'shaders/chunks/Version.glsl';

const vertexShader = `${shaderVersion}
	in vec3 aVertexPosition;

	uniform mat4 uViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

function fragmentShader() {
	return `${shaderVersion}
	precision ${capabilities.precision} float;
	out vec4 outputColor;

	void main(void){
		outputColor = vec4(1.0);
	}
	`;
}

class NormalsGeometry extends Geometry {
	constructor(mesh, size = 0.5) {
		let vertices = [];

		const sx = mesh.scale.x;
		const sy = mesh.scale.y;
		const sz = mesh.scale.z;
		const length = mesh.geometry.bufferNormals.length / 3;
		for (let i = 0; i < length; i++) {
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

		super(vertices);
	}
}

export default class Normals extends Mesh {
	constructor(mesh, size = 1, lineWidth = 2) {
		super(new NormalsGeometry(mesh, size), new Shader({
			name: 'NormalsHelper',
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
