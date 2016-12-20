import Mesh from 'core/Mesh';
import Shader from 'core/Shader';
import * as GL from 'core/GL';
import Geometry from 'geometry/Geometry';

const vertexShader = `
	attribute vec3 aVertexPosition;
	attribute vec3 aVertexNormal;

	uniform mat4 uViewMatrix;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelMatrix;

	varying vec3 vColor;

	void main(void){
		vColor = abs(aVertexNormal);
		gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
	}
`;

const fragmentShader = `
	precision mediump float;
	varying vec3 vColor;

	void main(void){
		gl_FragColor = vec4(vColor, 1.0);
	}
`;

class NormalsGeometry extends Geometry {
	constructor(mesh, size = 0.5) {
		let vertices = [];
		let normals = [];

		const sx = mesh.scale.x;
		const sy = mesh.scale.y;
		const sz = mesh.scale.z;
		const length = mesh.geometry.normals.length / 3;
		for (let i = 0; i < length; i++) {
			const i3 = i * 3;
			const v0x = sx * (mesh.position.x + mesh.geometry.vertices[i3]);
			const v0y = sy * (mesh.position.y + mesh.geometry.vertices[i3 + 1]);
			const v0z = sz * (mesh.position.z + mesh.geometry.vertices[i3 + 2]);
			const nx = mesh.geometry.normals[i3];
			const ny = mesh.geometry.normals[i3 + 1];
			const nz = mesh.geometry.normals[i3 + 2];
			const v1x = v0x + size * nx;
			const v1y = v0y + size * ny;
			const v1z = v0z + size * nz;
			vertices = vertices.concat([v0x, v0y, v0z, v1x, v1y, v1z]);
			normals = normals.concat([nx, ny, nz, nx, ny, nz]);
		}

		super(vertices, null, normals, null, null);
	}
}

export default class Normals extends Mesh {
	constructor(mesh, size = 1, lineWidth = 2) {
		super(new NormalsGeometry(mesh, size), new Shader({
			vertexShader,
			fragmentShader,
		}));
		this.lineWidth = lineWidth;
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get();

		this.shader.bindProgram();

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.vertex.buffer);
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute,
			this.geometry.attributes.vertex.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.normal.buffer);
		gl.vertexAttribPointer(this.shader.vertexNormalAttribute,
			this.geometry.attributes.normal.itemSize, gl.FLOAT, false, 0, 0);

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix);

		gl.lineWidth(this.lineWidth);
		gl.drawArrays(gl.LINES, 0, this.geometry.attributes.vertex.numItems);
	}
}
