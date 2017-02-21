import EventDispatcher from 'happens';
import parseHdr from 'utils/HdrParser';

export default class BinaryLoader {
	constructor(src) {
		EventDispatcher(this);
		this.src = src;
	}

	load() {
		const req = new XMLHttpRequest();

		req.responseType = 'arraybuffer';
		req.onreadystatechange = () => {
			if (req.readyState !== 4) return;
			if (req.readyState === 4 && req.status === 200) {
				this.emit('loaded', parseHdr(req.response));
			} else {
				this.emit('error', req.status);
			}
		};

		req.open('GET', this.src, true);
		req.send();
	}
}
