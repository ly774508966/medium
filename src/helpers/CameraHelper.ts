import {
	vec3,
	mat3,
	mat4,
	quat,
} from 'gl-matrix';
import Mesh from '../core/Mesh';
import Shader from '../core/Shader';
import * as GL from '../core/GL';
import { capabilities, extensions } from '../core/Capabilities';
import Geometry from '../geometry/Geometry';
import EsVersion from '../shaders/chunks/EsVersion.glsl';
import ProjectionView from '../shaders/chunks/ProjectionView.glsl';
import { DRAW_LINE_STRIP } from '../core/Constants';
import Vector3, { UP } from '../math/Vector3';
import PerspectiveCamera from '../core/PerspectiveCamera';
import Object3D from '../core/Object3D';
import { lookAt } from '../math/Utils';

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
		outgoingColor = vec4(1.0, 1.0, 0.0, 1.0);
	}
	`;
}

function fragmentShaderEs100() {
	return `
	precision ${capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
	}
	`;
}

let gl;
let axisAngle = 0;
const quaternionAxisAngle = vec3.create();

class CameraGeometry extends Geometry {
	constructor(mesh: Mesh, size = 0.5) {
		let vertices = [];

		const addVertex = (x, y, z) => {
			vertices = vertices.concat([x, y, z]);
		};

		function box(z, scale = 1) {
			// bottom left
			addVertex(-1 * scale, -1 * scale, z);

			// top left
			addVertex(-1 * scale, 1 * scale, z);
			addVertex(-1 * scale, 1 * scale, z);

			// top right
			addVertex(1 * scale, 1 * scale, z);
			addVertex(1 * scale, 1 * scale, z);

			// bottom right
			addVertex(1 * scale, -1 * scale, z);
			addVertex(1 * scale, -1 * scale, z);

			// bottom left
			addVertex(-1 * scale, -1 * scale, z);
		}

		const z = 3.5;
		const scaleNear = 0.5;
		const scaleFar = 3;

		// Boxes
		box(0, scaleNear);
		box(z, scaleFar);

		// Lines

		// Bottom left
		addVertex(-1 * scaleNear, -1 * scaleNear, 0);
		addVertex(-1 * scaleFar, -1 * scaleFar, z);

		// Top left
		addVertex(-1 * scaleNear, 1 * scaleNear, 0);
		addVertex(-1 * scaleFar, 1 * scaleFar, z);

		// Top right
		addVertex(1 * scaleNear, 1 * scaleNear, 0);
		addVertex(1 * scaleFar, 1 * scaleFar, z);

		// Bottom right
		addVertex(1 * scaleNear, -1 * scaleNear, 0);
		addVertex(1 * scaleFar, -1 * scaleFar, z);

		super(new Float32Array(vertices));
	}
}

export default class CameraHelper extends Mesh {
	camera: PerspectiveCamera;
	constructor(camera) {
		const vertexShader = GL.webgl2 ? vertexShaderEs300 : vertexShaderEs100;
		const fragmentShader = GL.webgl2 ? fragmentShaderEs300() : fragmentShaderEs100();
		super(new CameraGeometry(camera), new Shader({
			name: 'CameraHelper',
			vertexShader,
			fragmentShader,
			drawType: DRAW_LINE_STRIP,
		}));
		this.camera = camera;
	}

	updateMatrix() {
		// Reset
		mat4.identity(this.localMatrix);
		mat4.identity(this.modelMatrix);
		quat.identity(this._quaternion);

		// If Object3D has a parent, copy the computed modelMatrix into localMatrix
		if (this.parent) {
			mat4.copy(this.localMatrix, this.parent.modelMatrix);
			mat4.multiply(this.modelMatrix, this.modelMatrix, this.localMatrix);
		}

		// Apply local transitions to modelMatrix
		mat4.translate(this.modelMatrix, this.modelMatrix, this.position.v);

		this._quaternion = lookAt(this.camera.position.v, this.camera.target.v, [0, 0, 0]);

		axisAngle = quat.getAxisAngle(quaternionAxisAngle, this._quaternion);
		mat4.rotate(this.modelMatrix, this.modelMatrix, axisAngle, quaternionAxisAngle);
	}

	update() {
		this.position.copy(this.camera.position);
	}

	draw(modelViewMatrix: mat4, projectionMatrix: mat4) {
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
