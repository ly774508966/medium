import PerspectiveCamera from '../cameras/PerspectiveCamera';
import { clamp } from '../math/Utils';
import Vector3 from '../math/Vector3';

const MODE_DRAG = 'MODE_DRAG';
const MODE_PAN = 'MODE_PAN';
const MODE_ZOOM = 'MODE_ZOOM';
const UP = new Vector3(0, 1, 0);
const EASE_THRESHOLD = 0.0001;

export default class OrbitControls {
  public rotationSpeed: number;
  public panSpeed: number;
  public zoom: boolean;
  public pan: boolean;
  public smoothing: boolean;
  public easing: number;
  public _camera: PerspectiveCamera;
  public _element: HTMLElement;
  public _zoomMin: number;
  public _zoomMax: number;
  public _radius: number;
  public _radiusOffset: number;
  public _defaultRadius: number;
  public _rotationX: number;
  public _rotationY: number;
  public _defaultRotationX: number;
  public _defaultRotationY: number;
  public _x: number;
  public _y: number;
  public _z: number;
  public _offsetX: number;
  public _offsetY: number;
  public _offsetPanX: number;
  public _offsetPanY: number;
  public target: Vector3;
  public _targetOffset: Vector3;
  public _direction: Vector3;
  public _lastZoomDistance: number;
  public _width: number;
  public _height: number;
  public _mode: string;
  public isDown: boolean;
  public _startX: number;
  public _startY: number;

  constructor(
    camera: PerspectiveCamera,
    element: HTMLCanvasElement | HTMLDivElement
  ) {
    this.rotationSpeed = 5;
    this.panSpeed = 10;
    this.zoom = true;
    this.pan = true;
    this.smoothing = false;
    this.easing = 0.1;
    this._camera = camera;
    this._element = element;
    this._zoomMin = 0.1;
    this._zoomMax = Infinity;
    this._radius = Math.max(camera.position.x, camera.position.z);
    this._radiusOffset = 0;
    this._defaultRadius = Math.max(camera.position.x, camera.position.z);
    this._rotationX = Math.atan2(camera.position.y - 0, +this._radius - 0);
    this._rotationY = Math.atan2(camera.position.z - 0, camera.position.x - 0);
    this._defaultRotationX = Math.atan2(
      camera.position.y - 0,
      +this._radius - 0
    );
    this._defaultRotationY = Math.atan2(
      camera.position.z - 0,
      camera.position.x - 0
    );

    const y = this._radius * Math.sin(this._rotationX);
    const r = this._radius * Math.cos(this._rotationX);
    const x = Math.sin(this._rotationY) * r;
    const z = Math.cos(this._rotationY) * r;

    this._x = x;
    this._y = y;
    this._z = z;
    this._offsetX = 0;
    this._offsetY = 0;
    this._offsetPanX = 0;
    this._offsetPanY = 0;
    this.target = new Vector3();
    this._targetOffset = new Vector3();
    this._direction = new Vector3();
    this._lastZoomDistance = 0;
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

  public _onTouchStart = event => {
    event.preventDefault();

    if (event.touches) {
      // Device
      switch (event.touches.length) {
        case 1:
          this._mode = MODE_DRAG;
          this._offsetY = this._rotationY;
          this._offsetX = this._rotationX;
          break;
        case 2: {
          this._mode = MODE_ZOOM;
          this._radiusOffset = this._radius;
          break;
        }
        default: {
          this._mode = MODE_PAN;
          this._offsetY = this.target.y;
          this._offsetX = this.target.x;
        }
      }
    } else {
      // Desktop
      switch (event.which) {
        case 3:
          this._mode = MODE_PAN;
          this._offsetY = this.target.y;
          this._offsetX = this.target.x;
          break;
        default: {
          this._mode = MODE_DRAG;
          this._offsetY = this._rotationY;
          this._offsetX = this._rotationX;
        }
      }
    }

    this._startY = event.pageX / this._width;
    this._startX = event.pageY / this._height;
    this._targetOffset.copy(this.target);
    this._radiusOffset = this._radius;
    this.isDown = true;
  };

  public _onTouchMove = event => {
    if (this.isDown) {
      switch (this._mode) {
        case MODE_PAN: {
          if (!this.pan) return;
          const y = event.pageX / this._width;
          const x = event.pageY / this._height;
          this._direction
            .copy(this._camera.position)
            .subtract(this.target)
            .normalize();
          const cross = this._direction.cross(UP);
          const tx =
            this._targetOffset.x +
            -(this._startY - y) * this.panSpeed * cross.x;
          const ty = this._targetOffset.y + -(this._startX - x) * this.panSpeed;
          const tz =
            this._targetOffset.z +
            -(this._startY - y) * this.panSpeed * cross.z;
          this.target.set(tx, ty, tz);
          break;
        }
        case MODE_ZOOM: {
          if (!this.zoom) return;
          const dx = event.touches[0].pageX - event.touches[1].pageX;
          const dy = event.touches[0].pageY - event.touches[1].pageY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const sign = this._lastZoomDistance > distance ? 1 : -1;
          // Simulate the same data as the scroll
          this._zoomConstraint(sign * 100);
          this._lastZoomDistance = distance;
          break;
        }
        default: {
          // Drag
          const y = event.pageX / this._width;
          const x = event.pageY / this._height;
          this._rotationX =
            this._offsetX + -(this._startX - x) * this.rotationSpeed;
          this._rotationY =
            this._offsetY + (this._startY - y) * this.rotationSpeed;
          this._rotationX = clamp(this._rotationX, -Math.PI / 2, Math.PI / 2);
        }
      }

      this.update();
    }
  };

  public _onTouchEnd = () => {
    this.isDown = false;
  };

  public _onContextMenu = event => {
    event.preventDefault();
  };

  public _zoomConstraint(delta) {
    if (!this.zoom) return;
    const value = delta / 1000;
    const speed = 3;
    this._radius += value * speed;
    this._radius = clamp(this._radius, this._zoomMin, this._zoomMax);
    this.update();
  }

  public update() {
    const y = this._radius * Math.sin(this._rotationX);
    const r = this._radius * Math.cos(this._rotationX); // radius of the sphere
    const x = Math.sin(this._rotationY) * r;
    const z = Math.cos(this._rotationY) * r;

    if (this.smoothing) {
      this._x += (x - this._x) * this.easing;
      this._y += (y - this._y) * this.easing;
      this._z += (z - this._z) * this.easing;

      if (Math.abs(this._x - x) < EASE_THRESHOLD) {
        this._x = x;
      }

      if (Math.abs(this._y - y) < EASE_THRESHOLD) {
        this._y = y;
      }

      if (Math.abs(this._z - z) < EASE_THRESHOLD) {
        this._z = z;
      }
    } else {
      this._x = x;
      this._y = y;
      this._z = z;
    }

    this._camera.position.set(this._x, this._y, this._z).add(this.target);
    this._camera.lookAt(this.target.x, this.target.y, this.target.z);
  }

  public _onMouseWheel = event => {
    let delta = 0;

    if (event.wheelDelta) {
      // Webkit, Opera, Explorer
      delta = event.wheelDelta;
    } else if (event.detail) {
      // Firefox
      delta = event.detail;
    }

    this._zoomConstraint(-delta);
  };

  public _onKeypress = event => {
    switch (event.keyCode) {
      case 114: // r
        // Reset
        this.reset();
        break;
      default:
    }
  };

  public reset() {
    this.target.set(0, 0, 0);
    this._rotationY = this._defaultRotationY;
    this._rotationX = this._defaultRotationX;
    this._radius = this._defaultRadius;
    this.update();
  }

  public dispose() {
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
