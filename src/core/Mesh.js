import * as GL from '../core/GL'
import {vec3, mat4} from 'gl-matrix'

export default class Mesh {

	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader

		this.position = vec3.create()
		this.rotation = vec3.create()
		this.modelMatrix = mat4.create()
	}

	set x(value = 0) {
		this.position[0] = value
	}

	get x() {
		return this.position[0]
	}

	set y(value = 0) {
		this.position[1] = value
	}

	get y() {
		return this.position[1]
	}

	set z(value = 0) {
		this.position[2] = value
	}

	get z() {
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

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get()

		this.shader.bindProgram()

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer)
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexColorBuffer)
		gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.geometry.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)

		mat4.identity(this.modelMatrix)
		mat4.translate(this.modelMatrix, this.modelMatrix, this.position)
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[0], [1, 0, 0])
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[1], [0, 1, 0])
		mat4.rotate(this.modelMatrix, this.modelMatrix, this.rotation[2], [0, 0, 1])

		this.shader.setUniforms(modelViewMatrix, projectionMatrix, this.modelMatrix)

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.geometry.vertexPositionBuffer.numItems)
	}
}
