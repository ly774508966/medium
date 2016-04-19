import * as GL from './GL'
import {mat4, quat} from 'gl-matrix'
import {degToRad} from 'utils/math'
import PerspectiveCamera from 'core/PerspectiveCamera'
import OrthographicCamera from 'core/OrthographicCamera'

export default class Renderer {

	constructor(settings = {}) {

		// Default renderer settings
		const defaults = {
			width: 1280,
			height: 720,
			near: 0.1,
			far: 100
		}

		// Apply defaults
		Object.assign(this, defaults, settings)

		// Create canvas
		this.canvas = document.createElement('canvas')
		this.canvas.width = this.width
		this.canvas.height = this.height

		// Setup matrices
		this.modelViewMatrix = mat4.create()
		this.projectionMatrix = mat4.create()

		// Matrix stack for scene object translations
		this.modelViewMatrixStack = []

		this.pixelRatio = 1

		// Try initialising gl
		try {
			const gl = this.canvas.getContext('experimental-webgl')
			gl.viewportWidth = this.canvas.width
			gl.viewportHeight = this.canvas.height
			GL.set(gl)
		} catch (error) {
			console.log('Webgl not supported')
		}

		const gl = GL.get()

		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.enable(gl.DEPTH_TEST)
	}

	setSize(width, height) {

		const gl = GL.get()

		this.width = width * this.pixelRatio
		this.height = height * this.pixelRatio

		this.canvas.width = this.width
		this.canvas.height = this.height

		this.canvas.style.width = `${width}px`
		this.canvas.style.height = `${height}px`

		gl.viewportWidth = this.width
		gl.viewportHeight = this.height

		this.rotation = 0
	}

	setDevicePixelRatio(ratio = 1) {
		this.pixelRatio = ratio || 1
		this.setSize(this.width, this.height)
	}

	modelViewPushMatrix() {
		let copy = mat4.create()
		mat4.copy(copy, this.modelViewMatrix)
		this.modelViewMatrixStack.push(copy)
	}

	modelViewPopMatrix() {
		if(this.modelViewMatrixStack.length === 0){
			throw 'Invalid modelViewPopMatrix'
		}
		this.modelViewMatrix = this.modelViewMatrixStack.pop()
	}

	render(scene, camera) {

		const gl = GL.get()

		this.rotation++

		gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight)

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		if(camera instanceof PerspectiveCamera){
			mat4.perspective(this.projectionMatrix, camera.fov, gl.viewportWidth / gl.viewportHeight, this.near, this.far)
		} else if(camera instanceof OrthographicCamera) {
			mat4.ortho(this.projectionMatrix, -1.0, 1.0, -1.0, 1.0, this.near, this.far)
		} else {
			throw 'Camera type not supported'
		}

		mat4.identity(this.modelViewMatrix)

		mat4.lookAt(this.modelViewMatrix, camera.position, camera.center, camera.up)

		// Render the scene
		scene.children.forEach((child, i) => {
			this.modelViewPushMatrix()
			child.draw(this.modelViewMatrix, this.projectionMatrix)
			this.modelViewPopMatrix()
		})
	}
}
