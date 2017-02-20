import {
	mat4,
} from 'gl-matrix';
import * as GL from '../core/GL';
import Object3D from 'core/Object3D';
import Vao from 'core/Vao';
import { extensions } from 'core/Capabilities';

let gl;

export default class Mesh extends Object3D {
	constructor(geometry, shader) {
		super();
		this.geometry = geometry;
		this.shader = shader;
		this.vao = new Vao();
		this.modelMatrix = mat4.create();
		this.visible = true;
		this.instanceCount = 0;
		this.shader.create(this.geometry);
		this.isInstanced = false;

		gl = GL.get();

		// Setup vao
		this.vao.bind();
		this.bindAttributes();
		this.bindAttributesInstanced();
		this.bindIndexBuffer();
		this.vao.unbind();
	}

	setInstanceCount(value) {
		gl = GL.get();
		this.instanceCount = value;
		this.isInstanced = true;
	}

	bindAttributes() {
		// Attributes
		Object.keys(this.geometry.attributes).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				// enableVertexAttribArray
				this.shader.setAttributeLocation(attributeName);
				// Bind buffer
				this.geometry.attributes[attributeName].bind();
				// vertexAttribPointer
				this.shader.setAttributePointer(attributeName);
			}
		});
	}

	bindAttributesInstanced() {
		// Instanced Attributes
		Object.keys(this.geometry.attributesInstanced).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				// enableVertexAttribArray
				this.shader.setAttributeLocation(attributeName);
				// Bind buffer
				this.geometry.attributesInstanced[attributeName].bind();
				// vertexAttribPointer
				this.shader.setAttributeInstancedPointer(attributeName);

				if (GL.webgl2) {
					gl.vertexAttribDivisor(this.shader.attributeLocations[attributeName], 1);
				} else {
					extensions.angleInstancedArrays.vertexAttribDivisorANGLE(
						this.shader.attributeLocations[attributeName], 1);
				}
			}
		});
	}

	bindIndexBuffer() {
		// Bind index buffer
		if (this.geometry.bufferIndices) {
			this.geometry.attributes.aIndex.bind();
		}
	}

	draw(modelViewMatrix, projectionMatrix, camera) {
		if (!this.visible) return;

		gl = GL.get();

		// Update modelMatrix
		this.updateMatrix();

		this.shader.bindProgram();

		// Culling enable
		if (this.shader.culling !== false) {
			gl.enable(gl.CULL_FACE);
			gl.cullFace(this.shader.culling);
		}

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		if (extensions.vertexArrayObject) {
			this.vao.bind();
		} else {
			this.bindAttributes();
			this.bindAttributesInstanced();
			this.bindIndexBuffer();
		}

		if (this.geometry.attributes.aIndex) {
			gl.drawElements(this.shader.drawType,
				this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0);
		} else {
			gl.drawArrays(this.shader.drawType, 0, this.geometry.attributes.aVertexPosition.numItems);
		}

		if (extensions.vertexArrayObject) {
			this.vao.unbind();
		}

		// Culling disable
		if (this.shader.culling !== false) {
			gl.disable(gl.CULL_FACE);
		}
	}

	drawInstance(modelViewMatrix, projectionMatrix, camera) {
		if (!this.visible) return;

		gl = GL.get();

		// Update modelMatrix
		this.updateMatrix();

		this.shader.bindProgram();
		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		// Culling enable
		if (this.shader.culling !== false) {
			gl.enable(gl.CULL_FACE);
			gl.cullFace(this.shader.culling);
		}

		if (extensions.vertexArrayObject) {
			this.vao.bind();
		} else {
			this.bindAttributes();
			this.bindAttributesInstanced();
			this.bindIndexBuffer();
		}

		if (GL.webgl2) {
			gl.drawElementsInstanced(this.shader.drawType,
				this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);
		} else {
			extensions.angleInstancedArrays.drawElementsInstancedANGLE(this.shader.drawType,
				this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);
		}

		if (extensions.vertexArrayObject) {
			this.vao.unbind();
		}

		// Culling disable
		if (this.shader.culling !== false) {
			gl.disable(gl.CULL_FACE);
		}
	}

	dispose() {
		this.shader.dispose();
		this.geometry.dispose();
		this.vao.dispose();
		this.geometry = null;
		this.shader = null;
		super.dispose();
	}
}
