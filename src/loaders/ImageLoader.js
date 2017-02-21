import EventDispatcher from 'happens';

export default class ImageLoader {
	constructor(src) {
		EventDispatcher(this);
		this.src = src;
	}

	load() {
		const image = new Image();

		image.onload = () => {
			this.emit('loaded', image);
		};

		image.onerror = () => {
			this.emit('error', `Failed to load ${this.asset.src}`);
		};

		image.src = this.src;
	}
}
