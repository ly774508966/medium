import { warn, log } from 'utils/Console';

// https://github.com/toji/webvr-samples/blob/master/03-vr-presentation.html

const ERROR_WEBVR_DEVICE_NOT_LATEST = 'Your browser supports WebVR but not the latest version';
const ERROR_WEBVR_DEVICE_NOT_SUPPORTED = 'Your browser does not support WebVR';

class WebVRVive {
	constructor() {
		this.vrDisplay = null;
		this.frameData = null;
		this.ready = false;
		this.available = navigator.getVRDisplays !== undefined;
		this._createUI();
	}

	setup() {
		if (navigator.getVRDevices) {
			this.uiUpdateStatus(ERROR_WEBVR_DEVICE_NOT_LATEST, 'error');
			warn(ERROR_WEBVR_DEVICE_NOT_LATEST);
		} else {
			this.uiUpdateStatus(ERROR_WEBVR_DEVICE_NOT_SUPPORTED, 'error');
			warn(ERROR_WEBVR_DEVICE_NOT_SUPPORTED);
		}
		if (!this.available) return;

		this.frameData = new window.VRFrameData();

		navigator.getVRDisplays().then((displays) => {
			log('displays', displays);

			if (displays.length > 0) {
				this.vrDisplay = displays[0];

				// It's heighly reccommended that you set the near and far planes to
				// something appropriate for your scene so the projection matricies
				// WebVR produces have a well scaled depth buffer.
				this.vrDisplay.depthNear = 0.1;
				this.vrDisplay.depthFar = 1024.0;

				if (this.vrDisplay.capabilities.canPresent) {
					this.uiButtonState(this.ui.enter, 'disabled');
				}

				// The UA may kick us out of VR present mode for any reason, so to
				// ensure we always know when we begin/end presenting we need to
				// listen for vrdisplaypresentchange events.
				window.addEventListener('vrdisplaypresentchange', this.onVRDisplayPresentChange, false);
				// These events fire when the user agent has had some indication that
				// it would be appropariate to enter or exit VR presentation mode, such
				// as the user putting on a headset and triggering a proximity sensor.
				// You can inspect the `reason` property of the event to learn why the
				// event was fired, but in this case we're going to always trust the
				// event and enter or exit VR presentation mode when asked.
				window.addEventListener('vrdisplayactivate', this.onVRRequestPresent, false);
				window.addEventListener('vrdisplaydeactivate', this.onVRExitPresent, false);

				this.uiUpdateStatus('ready');
				this.ready = true;
			} else {
				this.uiUpdateStatus('WebVR supported, but no VRDisplays found');
			}
		});
	}

	uiToggleButton(button, visible) {
		const display = visible ? 'block' : 'none';
		button.style.display = display;
	}

	uiButtonState(button, state) {
		switch (state) {
			case 'disabled':
				button.disabled = 'disabled';
				break;
			default:
				break;
		}
	}

	uiUpdateStatus(text = '', state = '') {
		this.ui.status.innerHTML = text;
		this.ui.status.className = 'status';
		this.ui.status.classList.add(state);
	}

	_createUI() {
		this.ui = {
			enter: this._uiCreateButton('enter'),
			exit: this._uiCreateButton('exit'),
			reset: this._uiCreateButton('reset'),
			status: this._uiCreateStatus(),
		};

		// Default visibility
		this.uiToggleButton(this.ui.exit, false);

		this.ui.enter.onclick = () => {
			if (!this.available) return;
			this.onVRRequestPresent();
		};

		this.ui.reset.onclick = () => {
			if (!this.available) return;
			this.vrDisplay.resetPose();
		};
	}

	_uiCreateButton(text) {
		const button = document.createElement('button');
		button.textContent = text;
		button.classList.add('btn', `btn-${text}`);
		return button;
	}

	_uiCreateStatus() {
		const div = document.createElement('div');
		div.classList.add('status');
		return div;
	}

	onVRRequestPresent() {
		// This can only be called in response to a user gesture.
		this.vrDisplay.requestPresent([{ source: this.renderer.canvas }]).then(() => {
			// Nothing to do because we're handling things in onVRPresentChange.
		}, () => {
			this.uiUpdateStatus('requestPresent failed', 'error');
		});
	}

	onVRExitPresent() {
		// No sense in exiting presentation if we're not actually presenting.
		// (This may happen if we get an event like vrdisplaydeactivate when
		// we weren't presenting.)
		if (!this.vrDisplay.isPresenting) return;

		this.vrDisplay.exitPresent().then(() => {
			// Nothing to do because we're handling things in onVRPresentChange.
		}, () => {
			this.uiUpdateStatus('exitPresent failed', 'error');
		});
	}

	onVRPresentChange() {
		// When we begin or end presenting, the canvas should be resized to the
		// recommended dimensions for the display.
		// onResize();

		if (this.vrDisplay.isPresenting) {
			if (this.vrDisplay.capabilities.hasExternalDisplay) {
				// Because we're not mirroring any images on an external screen will
				// freeze while presenting. It's better to replace it with a message
				// indicating that content is being shown on the VRDisplay.
				this.uiUpdateStatus('presenting');
				// On devices with an external display the UA may not provide a way
				// to exit VR presentation mode, so we should provide one ourselves.
				this.uiToggleButton(this.ui.enter, false);
				this.uiToggleButton(this.ui.exit, true);
			}
		} else {
			// If we have an external display take down the presenting message and
			// change the button back to "Enter VR".
			if (this.vrDisplay.capabilities.hasExternalDisplay) {
				this.uiUpdateStatus();
				this.uiToggleButton(this.ui.enter, true);
				this.uiToggleButton(this.ui.exit, false);
			}
		}
	}

	getFrameData() {
		if (this.ready) {
			this.vrDisplay.getFrameData(this.frameData);
		}
	}

	getEyeParameters(eye) {
		return this.vrDisplay.getEyeParameters(eye);
	}
}

export default new WebVRVive();
