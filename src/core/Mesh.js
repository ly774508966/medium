import * as GL from '../core/GL'
import {vec3} from 'gl-matrix'

export default class Mesh {

	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader
		this.position = vec3.create()
		this.rotation = vec3.create()
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get()

		this.shader.bindProgram()

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer)
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexColorBuffer)
		gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.geometry.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)

		this.shader.setUniforms(modelViewMatrix, projectionMatrix)

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.geometry.vertexPositionBuffer.numItems)
	}
}
