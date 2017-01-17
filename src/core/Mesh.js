import * as GL from '../core/GL';
import {
	mat4,
} from 'gl-matrix';
import Object3D from 'core/Object3D';
import Vector3 from 'math/Vector3';

export default class Mesh extends Object3D {
	constructor(geometry, shader) {
		super();
		this.geometry = geometry;
		this.shader = shader;
		this.shader.create(this.geometry);
		this.modelMatrix = mat4.create();
		this.visible = true;
	}

	draw(modelViewMatrix, projectionMatrix, camera) {
		if (!this.visible) return;

		const gl = GL.get();

		this.shader.bindProgram();

		if (this.geometry.vertices) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.vertex.buffer);
			gl.vertexAttribPointer(this.shader.vertexPositionAttribute,
				this.geometry.attributes.vertex.itemSize, gl.FLOAT, false, 0, 0);
		}

		if (this.geometry.uvs) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.uv.buffer);
			gl.vertexAttribPointer(this.shader.vertexUvAttribute,
				this.geometry.attributes.uv.itemSize, gl.FLOAT, false, 0, 0);
		}

		if (this.geometry.colors) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.color.buffer);
			gl.vertexAttribPointer(this.shader.vertexColorAttribute,
				this.geometry.attributes.color.itemSize, gl.FLOAT, false, 0, 0);
		}

		if (this.geometry.normals) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.attributes.normal.buffer);
			gl.vertexAttribPointer(this.shader.vertexNormalAttribute,
				this.geometry.attributes.normal.itemSize, gl.FLOAT, false, 0, 0);
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.attributes.index.buffer);

		// Update modelMatrix
		this.updateMatrix();

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		// Culling enable
		if (this.shader.culling !== false) {
			gl.enable(gl.CULL_FACE);
			gl.cullFace(this.shader.culling);
		}

		gl.drawElements(this.shader.drawType,
			this.geometry.attributes.index.numItems, gl.UNSIGNED_SHORT, 0);

		// Culling disable
		if (this.shader.culling !== false) {
			gl.disable(gl.CULL_FACE);
		}
	}
}
