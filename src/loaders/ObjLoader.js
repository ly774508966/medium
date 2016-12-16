import Obj from 'utils/Obj';

export default class ObjLoader {
	constructor(url) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			req.onreadystatechange = () => {
				if (req.readyState !== 4) return;
				if (req.readyState === 4 && req.status === 200) {
					const data = new Obj.Mesh(req.responseText);
					resolve(data, req.status);
				} else {
					reject('error', req.status);
				}
			};
			req.open('GET', url, true);
			req.send();
		});
	}
}
