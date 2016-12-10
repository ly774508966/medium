import {
	clamp,
} from 'math/utils';

export default class OrbitControls {
	constructor(camera, element) {
		const defaults = {
			speed: 5,
		};

		this._camera = camera;
		this._element = element;
		this._zoomMin = 0.1;
		this._zoomMax = Infinity;
		this._radius = Math.max(camera.position.x, camera.position.z);
		this._rotationX = Math.atan2(camera.position.y - 0, this._radius - 0);
		this._rotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
		this._offsetX = 0;
		this._offsetY = 0;
		this._width = window.innerWidth;
		this._height = window.innerHeight;

		this.settings = Object.assign(defaults, {});

		this._element.addEventListener('mousedown', this._onTouchStart, false);
		this._element.addEventListener('mousemove', this._onTouchMove, false);
		this._element.addEventListener('mouseup', this._onTouchEnd, false);
		this._element.addEventListener('touchstart', this._onTouchStart, false);
		this._element.addEventListener('touchmove', this._onTouchMove, false);
		this._element.addEventListener('touchend', this._onTouchEnd, false);
		window.addEventListener('mousewheel', this._onMouseWheel, false);
	}

	_onTouchStart = (event) => {
		this._offsetY = this._rotationY;
		this._offsetX = this._rotationX;
		this._startY = event.pageX / this._width;
		this._startX = event.pageY / this._height;
		this.isDown = true;
	}

	_onTouchMove = (event) => {
		if (this.isDown) {
			const y = event.pageX / this._width;
			const x = event.pageY / this._height;

			this._rotationX = this._offsetX + -(this._startX - x) * this.settings.speed;
			this._rotationY = this._offsetY + (this._startY - y) * this.settings.speed;

			this._rotationX = clamp(this._rotationX, -Math.PI / 2, Math.PI / 2);

			this.update();
		}
	}

	_onTouchEnd = () => {
		this.isDown = false;
	}

	_zoomConstraint(delta) {
		const value = delta / 1000;
		this._radius += value;
		this._radius = clamp(this._radius, this._zoomMin, this._zoomMax);
		this.update();
	}

	update() {
		const y = this._radius * Math.sin(this._rotationX);
		const r = this._radius * Math.cos(this._rotationX); // radius of the sphere
		const x = Math.sin(this._rotationY) * r;
		const z = Math.cos(this._rotationY) * r;
		this._camera.position.set(x, y, z);
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

	dispose() {
		this._element.removeEventListener('mousedown', this._onTouchStart);
		this._element.removeEventListener('mousemove', this._onTouchMove);
		this._element.removeEventListener('mouseup', this._onTouchEnd);
		this._element.removeEventListener('touchstart', this._onTouchStart);
		this._element.removeEventListener('touchmove', this._onTouchMove);
		this._element.removeEventListener('touchend', this._onTouchEnd);
		window.removeEventListener('mousewheel', this._onMouseWheel);
		this._camera = null;
		this._element = null;
	}
}
