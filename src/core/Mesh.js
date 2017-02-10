import {
	mat4,
} from 'gl-matrix';
import * as GL from '../core/GL';
import Object3D from 'core/Object3D';
import Vao from 'core/Vao';

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

		// Instanced Attributes
		Object.keys(this.geometry.attributesInstanced).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				// enableVertexAttribArray
				this.shader.setAttributeLocation(attributeName);
				// Bind buffer
				this.geometry.attributesInstanced[attributeName].bind();
				// vertexAttribPointer
				this.shader.setAttributeInstancedPointer(attributeName);
				gl.vertexAttribDivisor(this.shader.attributeLocations[attributeName], 1);
			}
		});

		// Bind index buffer
		if (this.geometry.bufferIndices) {
			this.geometry.attributes.aIndex.bind();
		}

		this.vao.unbind();
	}

	setInstanceCount(value) {
		gl = GL.get();
		this.instanceCount = value;
		this.isInstanced = true;
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

		this.vao.bind();

		gl.drawElements(this.shader.drawType,
			this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0);

		this.vao.unbind();

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

		this.vao.bind();

		gl.drawElementsInstanced(this.shader.drawType,
			this.geometry.attributes.aIndex.numItems, gl.UNSIGNED_SHORT, 0, this.instanceCount);

		this.vao.unbind();

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
