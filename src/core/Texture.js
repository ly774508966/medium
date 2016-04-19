import * as GL from './GL'

export default class Texture {

	constructor(options) {

		const gl = GL.get()

		const defaults = {
			src: ''
		}

		this.settings = Object.assign({}, defaults, options)

		this.texture = gl.createTexture()
		this.image = new Image()
		this.image.onload = this.onTextureLoaded.bind(this)
		this.image.src = this.settings.src
	}

	onTextureLoaded() {

		const gl = GL.get()

		gl.bindTexture(gl.TEXTURE_2D, this.texture)
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.bindTexture(gl.TEXTURE_2D, null)
	}
}
