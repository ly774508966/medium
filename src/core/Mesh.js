import {
	mat4,
} from 'gl-matrix';
import * as GL from '../core/GL';
import Object3D from 'core/Object3D';

let gl;
let attribute;

export default class Mesh extends Object3D {
	constructor(geometry, shader) {
		super();
		this.geometry = geometry;
		this.shader = shader;
		this.shader.create(this.geometry);
		this.modelMatrix = mat4.create();
		this.visible = true;
		this.instanceCount = 0;
	}

	setInstanceCount(value) {
		gl = GL.get();
		this.isInstanced = true;
		this.instanceCount = value;
	}

	draw(modelViewMatrix, projectionMatrix, camera) {
		if (!this.visible) return;

		gl = GL.get();

		this.shader.bindProgram();

		// Bind buffers
		Object.keys(this.geometry.attributes).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				attribute = this.geometry.attributes[attributeName];
				gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
				gl.vertexAttribPointer(this.shader.attributeLocations[attributeName],
					attribute.itemSize, gl.FLOAT, false, 0, 0);
			}
		});

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.attributes.aIndex.buffer);

		// Update modelMatrix
		this.updateMatrix();

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		// Culling enable
		if (this.shader.culling !== false) {
			gl.enable(gl.CULL_FACE);
			gl.cullFace(this.shader.culling);
		}

		gl.drawElements(this.shader.drawType,
			this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0);

		// Object.keys(this.geometry.attributes).forEach(attributeName => {
		// 	if (attributeName !== 'aIndex') {
		// 		attribute = this.geometry.attributes[attributeName];
		// 		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		// 	}
		// });

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		// Culling disable
		if (this.shader.culling !== false) {
			gl.disable(gl.CULL_FACE);
		}
	}

	drawInstance(modelViewMatrix, projectionMatrix, camera) {
		if (!this.visible) return;

		gl = GL.get();

		this.shader.bindProgram();

		// Bind buffers
		Object.keys(this.geometry.attributes).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				attribute = this.geometry.attributes[attributeName];
				gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
				gl.vertexAttribPointer(this.shader.attributeLocations[attributeName],
					attribute.itemSize, gl.FLOAT, false, 0, 0);
			}
		});

		// Bind instanced buffers
		Object.keys(this.geometry.attributesInstanced).forEach(attributeName => {
			attribute = this.geometry.attributesInstanced[attributeName];
			gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
			gl.vertexAttribPointer(this.shader.attributeLocations[attributeName],
				attribute.itemSize, gl.FLOAT, false, 0, 0);
			gl.vertexAttribDivisor(this.shader.attributeLocations[attributeName], 1);
		});

		// Update modelMatrix
		this.updateMatrix();

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		// Culling enable
		if (this.shader.culling !== false) {
			gl.enable(gl.CULL_FACE);
			gl.cullFace(this.shader.culling);
		}

		gl.drawArraysInstanced(this.shader.drawType,
			this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);

		// Unbind instanced buffers
		Object.keys(this.geometry.attributesInstanced).forEach(attributeName => {
			gl.vertexAttribDivisor(this.shader.attributeLocations[attributeName], 0);
		});

		// Culling disable
		if (this.shader.culling !== false) {
			gl.disable(gl.CULL_FACE);
		}
	}

	dispose() {
		this.shader.dispose();
		this.geometry.dispose();
		super.dispose();
	}
}
