import {
	clamp,
} from 'math/Utils';
import Vector3 from 'math/Vector3';

const MODE_DRAG = 'MODE_DRAG';
const MODE_PAN = 'MODE_PAN';

export default class OrbitControls {
	constructor(camera, element) {
		this.rotationSpeed = 5;
		this.panSpeed = 10;
		this._camera = camera;
		this._element = element;
		this._zoomMin = 0.1;
		this._zoomMax = Infinity;
		this._radius = Math.max(camera.position.x, camera.position.z);
		this._defaultRadius = Math.max(camera.position.x, camera.position.z);
		this._rotationX = Math.atan2(camera.position.y - 0, this._radius - 0);
		this._rotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
		this._defaultRotationX = Math.atan2(camera.position.y - 0, this._radius - 0);
		this._defaultRotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
		this._offsetX = 0;
		this._offsetY = 0;
		this._offsetPanX = 0;
		this._offsetPanY = 0;
		this._target = new Vector3();
		this._targetOffset = new Vector3();
		this._direction = new Vector3();
		this._up = new Vector3(0, 1, 0);
		this._width = window.innerWidth;
		this._height = window.innerHeight;

		this._element.addEventListener('mousedown', this._onTouchStart, false);
		this._element.addEventListener('mousemove', this._onTouchMove, false);
		this._element.addEventListener('mouseup', this._onTouchEnd, false);
		this._element.addEventListener('touchstart', this._onTouchStart, false);
		this._element.addEventListener('touchmove', this._onTouchMove, false);
		this._element.addEventListener('touchend', this._onTouchEnd, false);
		this._element.addEventListener('contextmenu', this._onContextMenu, false);
		window.addEventListener('mousewheel', this._onMouseWheel, false);
		window.addEventListener('keypress', this._onKeypress, false);
	}

	_onTouchStart = (event) => {
		event.preventDefault();

		switch (event.which) {
			case 3:
				this._mode = MODE_PAN;
				this._offsetY = this._target.y;
				this._offsetX = this._target.x;
				break;
			default: {
				this._mode = MODE_DRAG;
				this._offsetY = this._rotationY;
				this._offsetX = this._rotationX;
			}
		}

		this._startY = event.pageX / this._width;
		this._startX = event.pageY / this._height;
		this._targetOffset.copy(this._target);
		this.isDown = true;
	}

	_onTouchMove = (event) => {
		if (this.isDown) {
			const y = event.pageX / this._width;
			const x = event.pageY / this._height;

			switch (this._mode) {
				case MODE_PAN: {
					this._direction.copy(this._camera.position).subtract(this._target).normalize();
					const cross = this._direction.cross(this._up);
					const tx = this._targetOffset.x + (this._startY - y) * this.panSpeed * cross.x;
					const ty = this._targetOffset.y + -(this._startX - x) * this.panSpeed;
					const tz = this._targetOffset.z + (this._startY - y) * this.panSpeed * cross.z;
					this._target.set(tx, ty, tz);
					break;
				}
				default: {
					this._rotationX = this._offsetX + -(this._startX - x) * this.rotationSpeed;
					this._rotationY = this._offsetY + (this._startY - y) * this.rotationSpeed;
					this._rotationX = clamp(this._rotationX, -Math.PI / 2, Math.PI / 2);
				}
			}

			this.update();
		}
	}

	_onTouchEnd = () => {
		this.isDown = false;
	}

	_onContextMenu = (event) => {
		event.preventDefault();
	}

	_zoomConstraint(delta) {
		const value = delta / 1000;
		const speed = 3;
		this._radius += value * speed;
		this._radius = clamp(this._radius, this._zoomMin, this._zoomMax);
		this.update();
	}

	update() {
		const y = this._radius * Math.sin(this._rotationX);
		const r = this._radius * Math.cos(this._rotationX); // radius of the sphere
		const x = Math.sin(this._rotationY) * r;
		const z = Math.cos(this._rotationY) * r;
		this._camera.position.set(x, y, z).add(this._target);
		this._camera.lookAt(this._target.x, this._target.y, this._target.z);
	}

	_onMouseWheel = (event) => {
		let delta = 0;

		if (event.wheelDelta) {
			// Webkit, Opera, Explorer
			delta = event.wheelDelta;
		} else if (event.detail) {
			// Firefox
			delta = event.detail;
		}

		this._zoomConstraint(-delta);
	}

	_onKeypress = (event) => {
		switch (event.keyCode) {
			case 114: // r
				// Reset
				this.reset();
				break;
			default:
		}
	}

	reset() {
		this._target.set(0, 0, 0);
		this._rotationY = this._defaultRotationY;
		this._rotationX = this._defaultRotationX;
		this._radius = this._defaultRadius;
		this.update();
	}

	dispose() {
		this._element.removeEventListener('mousedown', this._onTouchStart);
		this._element.removeEventListener('mousemove', this._onTouchMove);
		this._element.removeEventListener('mouseup', this._onTouchEnd);
		this._element.removeEventListener('touchstart', this._onTouchStart);
		this._element.removeEventListener('touchmove', this._onTouchMove);
		this._element.removeEventListener('touchend', this._onTouchEnd);
		this._element.removeEventListener('contextmenu', this._onContextMenu);
		window.removeEventListener('mousewheel', this._onMouseWheel);
		window.removeEventListener('keypress', this._onKeypress);
		this._camera = null;
		this._element = null;
	}
}
