import {
	mat4,
} from 'gl-matrix';
import {
	GL,
	Object3D,
} from 'index';

/*
	Example based on:
	http://webglsamples.org/WebGL2Samples/#transform_feedback_separated_2
*/

let gl;
export default class TFMesh extends Object3D {
	constructor(geometry, vaos, vbos, shaderEmit, shaderDraw, totalPoints) {
		super();
		this.geometry = geometry;
		this.vaos = vaos;
		this.vbos = vbos;
		this.shaderEmit = shaderEmit;
		this.shaderDraw = shaderDraw;
		this.modelMatrix = mat4.create();
		this.visible = true;
		this.shaderEmit.create({}, ['vPosition']);
		this.shaderDraw.create(geometry);
		this.currentSourceIdx = 0;
		this.totalPoints = totalPoints;

		gl = GL.get();

		this.transformFeedback = gl.createTransformFeedback();
	}

	bindAttributes() {
		// Attributes
		Object.keys(this.geometry.attributes).forEach(attributeName => {
			if (attributeName !== 'aIndex') {
				// enableVertexAttribArray
				this.shaderDraw.program.setAttributeLocation(attributeName,
					this.geometry.attributes[attributeName].itemSize);
				// Bind buffer
				this.geometry.attributes[attributeName].bind();
				// vertexAttribPointer
				this.shaderDraw.program.setAttributePointer(attributeName,
					this.geometry.attributes[attributeName].itemSize);
			}
		});
	}

	emit(modelViewMatrix, projectionMatrix, camera) {
		const sourceVAO = this.vaos[this.currentSourceIdx];
		const sourceVBO = this.vbos[this.currentSourceIdx];

		const destinationVBO = this.vbos[(this.currentSourceIdx + 1) % 2];

		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.transformFeedback);

		this.shaderEmit.program.bind();

		sourceVAO.bind();

		// Bind aPosition
		gl.bindBuffer(gl.ARRAY_BUFFER, sourceVBO[0]);
		gl.vertexAttribPointer(this.shaderEmit.program.attributeLocations.aPosition,
			3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		// Use pin pong buffer data
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, destinationVBO[0]);

		this.shaderEmit.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		gl.beginTransformFeedback(gl.POINTS);
		gl.drawArrays(gl.POINTS, 0, this.totalPoints);
		gl.endTransformFeedback();

		gl.useProgram(null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

		// Ping pong the buffers
		this.currentSourceIdx = (this.currentSourceIdx + 1) % 2;

		sourceVAO.unbind();
	}

	draw(modelViewMatrix, projectionMatrix, camera) {
		// Update modelMatrix
		this.updateMatrix();

		// Update transform feedback
		this.emit(modelViewMatrix, projectionMatrix, camera);

		if (!this.visible) return;

		gl = GL.get();

		this.shaderDraw.program.bind();

		this.shaderDraw.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix, camera);

		this.vaos[this.currentSourceIdx].bind();

		this.bindAttributes();

		const sourceVBO = this.vbos[this.currentSourceIdx];
		gl.bindBuffer(gl.ARRAY_BUFFER, sourceVBO[0]);
		gl.vertexAttribPointer(this.shaderDraw.program.attributeLocations.aPosition,
			3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		// http://www.nutty.ca/articles/blend_modes/
		gl.enable(gl.BLEND);

		// Add
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.drawArrays(gl.POINTS, 0, this.totalPoints);

		this.vaos[this.currentSourceIdx].unbind();
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
