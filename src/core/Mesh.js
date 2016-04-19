import * as GL from '../core/GL'
import {vec3, mat4} from 'gl-matrix'

export default class Mesh {

	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader

		this.position = vec3.create()
		this.rotation = vec3.create()
		this.scale = vec3.fromValues(1, 1, 1)
		this.modelMatrix = mat4.create()
	}

	set translateX(value = 0) {
		this.position[0] = value
	}

	get translateX() {
		return this.position[0]
	}

	set translateY(value = 0) {
		this.position[1] = value
	}

	get translateY() {
		return this.position[1]
	}

	set translateZ(value = 0) {
		this.position[2] = value
	}

	get translateZ() {
		return this.position[2]
	}

	set rotationX(value = 0) {
		this.rotation[0] = value
	}

	get rotationX() {
		return this.rotation[0]
	}

	set rotationY(value = 0) {
		this.rotation[1] = value
	}

	get rotationY() {
		return this.rotation[1]
	}

	set rotationZ(value = 0) {
		this.rotation[2] = value
	}

	get rotationZ() {
		return this.rotation[2]
	}

	set scaleX(value = 0) {
		this.scale[0] = value
	}

	get scaleX() {
		return this.scale[0]
	}

	set scaleY(value = 0) {
		this.scale[1] = value
	}

	get scaleY() {
		return this.scale[1]
	}

	set scaleZ(value = 0) {
		this.scale[2] = value
	}

	get scaleZ() {
		return this.scale[2]
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get()

		this.shader.bindProgram()

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer)
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

		if(this.shader.settings.vertexColors){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexColorBuffer)
			gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.geometry.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)
		}

		if(this.shader.settings.vertexNormals){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexNormalBuffer)
			gl.vertexAttribPointer(this.shader.vertexNormalAttribute, this.geometry.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0)
		}

		if(this.shader.settings.texture){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.textureCoordBuffer)
			gl.vertexAttribPointer(this.shader.textureCoordAttribute, this.geometry.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0)

			gl.activeTexture(gl.TEXTURE0)
			gl.bindTexture(gl.TEXTURE_2D, this.shader.texture.texture)
			gl.uniform1i(this.shader.samplerUniform, 0)
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.vertexIndexBuffer)

		mat4.identity(this.modelMatrix)
		mat4.translate(this.modelMatrix, this.modelMatrix, this.position)
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[0], [1, 0, 0])
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[1], [0, 1, 0])
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[2], [0, 0, 1])
		mat4.scale(this.modelMatrix, this.modelMatrix, this.scale)

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix)

		// gl.enable(gl.CULL_FACE)
		// gl.cullFace(gl.BACK)

		// gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.geometry.vertexPositionBuffer.numItems)
		gl.drawElements(gl.TRIANGLES, this.geometry.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)

		// gl.disable(gl.CULL_FACE)
	}
}
