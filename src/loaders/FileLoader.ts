export default function FileLoader(url: string): Promise<any> {
	return new Promise((resolve: Function, reject: Function) => {
		const req = new XMLHttpRequest();
		req.onreadystatechange = () => {
			if (req.readyState !== 4) return;
			if (req.readyState === 4 && req.status === 200) {
				resolve(req.responseText, req.status);
			} else {
				reject('error', req.status);
			}
		};
		req.open('GET', url, true);
		req.send();
	});
}
