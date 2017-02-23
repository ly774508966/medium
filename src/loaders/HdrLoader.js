import parseHDR from 'parse-hdr';

export default class HdrLoader {
	constructor(src) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();

			req.responseType = 'arraybuffer';
			req.onreadystatechange = () => {
				if (req.readyState !== 4) return;
				if (req.readyState === 4 && req.status === 200) {
					resolve(parseHDR(req.response));
				} else {
					reject(req.status);
				}
			};

			req.open('GET', src, true);
			req.send();
		});
	}
}
