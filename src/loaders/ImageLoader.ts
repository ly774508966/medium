export default function ImageLoader(src): Promise<HTMLImageElement> {
	return new Promise((resolve: Function, reject: Function) => {
		const image = new Image();

		image.onload = () => {
			resolve(image);
		};

		image.onerror = () => {
			reject(`Failed to load ${src}`);
		};

		image.src = src;
	});
}
