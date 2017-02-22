export default class ImageLoader {
	constructor(src) {
		return new Promise((resolve, reject) => {
			const image = new Image();

			console.log(src);

			image.onload = () => {
				resolve(image);
			};

			image.onerror = () => {
				reject(`Failed to load ${this.asset.src}`);
			};

			image.src = src;
		});
	}
}
