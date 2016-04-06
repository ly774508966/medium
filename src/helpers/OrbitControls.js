import {vec3} from 'gl-matrix'
import {radToDeg, clamp} from 'utils/math'

export default class OrbitControls {

	constructor(camera, element) {

		const defaults = {
			speed: 5
		}

		this._camera = camera
		this._element = element
		this._zoomMin = 0.1
		this._zoomMax = Infinity
		this._radius = Math.max(camera.position[0], camera.position[2])
		this._rotationX = Math.atan2(camera.position[1] - 0, this._radius - 0)
		this._rotationY = Math.atan2(camera.position[2] - 0, camera.position[0] - 0)
		this._offsetX = 0
		this._offsetY = 0
		this._width = window.innerWidth
		this._height = window.innerHeight

		this.settings = Object.assign(defaults, {})

		this._onTouchStartHandler = this._onTouchStart.bind(this)
		this._onTouchMoveHandler = this._onTouchMove.bind(this)
		this._onTouchEndHandler = this._onTouchEnd.bind(this)
		this._onMouseWheelHandler = this._onMouseWheel.bind(this)

		this._element.addEventListener('mousedown', this._onTouchStartHandler, false)
		this._element.addEventListener('mousemove', this._onTouchMoveHandler, false)
		this._element.addEventListener('mouseup', this._onTouchEndHandler, false)
		this._element.addEventListener('touchstart', this._onTouchStartHandler, false)
		this._element.addEventListener('touchmove', this._onTouchMoveHandler, false)
		this._element.addEventListener('touchend', this._onTouchEndHandler, false)
		window.addEventListener('mousewheel', this._onMouseWheelHandler, false)
	}

	_onTouchStart(event) {
		this._offsetY = this._rotationY
		this._offsetX = this._rotationX
		this._startY = event.pageX / this._width
		this._startX = event.pageY / this._height
		this.isDown = true
	}

	_onTouchMove(event) {

		if (this.isDown) {
			const y = event.pageX / this._width
			const x = event.pageY / this._height

			this._rotationX = this._offsetX + -(this._startX - x) * this.settings.speed
			this._rotationY = this._offsetY +  (this._startY - y) * this.settings.speed

			this._rotationX = clamp(this._rotationX, -Math.PI/2, Math.PI/2)

			this.update()
		}
	}

	_zoomConstraint(delta) {

		let value = delta / 1000
		this._radius += value
		this._radius = clamp(this._radius, this._zoomMin, this._zoomMax)
		this.update()
	}

	update() {

		let y = this._radius * Math.sin(this._rotationX)
		let r = this._radius * Math.cos(this._rotationX) // radius of the sphere
		let x = Math.sin(this._rotationY) * r
		let z = Math.cos(this._rotationY) * r

		let position = vec3.fromValues(x, y, z)

		this._camera.setPosition(position[0], position[1], position[2])
	}

	_onTouchEnd() {
		this.isDown = false
	}

	_onMouseWheel(event) {

		let delta = 0

		if(event.wheelDelta) {
			// Webkit, Opera, Explorer
			delta = event.wheelDelta
		} else if(event.detail) {
			// Firefox
			delta = event.detail
		}

		this._zoomConstraint(-delta)
	}

	dispose() {
		this._element.removeEventListener('mousedown', this._onTouchStartHandler)
		this._element.removeEventListener('mousemove', this._onTouchMoveHandler)
		this._element.removeEventListener('mouseup', this._onTouchEndHandler)
		this._element.removeEventListener('touchstart', this._onTouchStartHandler)
		this._element.removeEventListener('touchmove', this._onTouchMoveHandler)
		this._element.removeEventListener('touchend', this._onTouchEndHandler)
		window.removeEventListener('mousewheel', this._onMouseWheelHandler)
		this._camera = null
		this._element = null
	}
}
