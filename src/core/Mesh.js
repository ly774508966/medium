import * as GL from '../core/GL'

export default class Mesh {

	constructor(geometry, shader) {
		this.geometry = geometry
		this.shader = shader
	}

	draw(modelViewMatrix, projectionMatrix) {
		const gl = GL.get()

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer)
		gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.geometry.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0)

		gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexColorBuffer)
		gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.geometry.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0)

		this.shader.setUniforms(modelViewMatrix, projectionMatrix)

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.geometry.vertexPositionBuffer.numItems)
	}
}
