import * as GL from './GL'
import EventDispatcher from 'happens'

export default class Texture {

	constructor(options) {

		EventDispatcher(this)

		const defaults = {
			src: '',
			size: null
		}

		this.settings = Object.assign({}, defaults, options)
	}

	load() {

		const gl = GL.get()

		this.texture = gl.createTexture()
		this.image = new Image()
		this.image.onload = this.onTextureLoaded.bind(this)
		this.image.src = this.settings.src

		this.updateTexture(this.placeholder())
	}

	onTextureLoaded() {

		this.updateTexture(this.image)
		this.emit('loaded')
	}

	updateTexture(map) {

		const gl = GL.get()

		gl.bindTexture(gl.TEXTURE_2D, this.texture)
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._resizeImage(map))
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.bindTexture(gl.TEXTURE_2D, null)
	}

	placeholder() {

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.width = 1
		canvas.height = 1
		return canvas
	}

	_resizeImage() {

		// 2, 4, 8, 16... 4096
		const sizes = Array(12).fill(0).map((i, j) => {
			return Math.pow(2, j + 1)
		})

		// Return if the image size is already a power of 2
		sizes.forEach(size => {
			if(this.image.width === size && this.image.height === size)
				return this.image
		})

		const imageSize = Math.max(this.image.width, this.image.height)

		let size = sizes.reduce(function(prev, curr) {
			return (Math.abs(curr - imageSize) < Math.abs(prev - imageSize) ? curr : prev);
		})

		if(this.settings.size){
			size = this.settings.size
		}

		// console.log('chosen size', size);

		// Draw canvas with texture cropped inside
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.width = size
		canvas.height = size
		ctx.drawImage(this.image, 0, 0, size, size)

		return canvas
	}
}
