export default function () {
	try {
		return !!window.WebGLRenderingContext &&
		!!document.createElement('canvas').getContext('experimental-webgl');
	} catch (error) {
		return false;
	}
}
