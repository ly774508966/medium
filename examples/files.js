const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/js');
const demos = [];
fs.readdir(dir, (err, files) => {
	files.forEach(file => {
		if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
			demos.push(file.split('.js')[0]);
		}
	});
	fs.writeFile(path.join(__dirname, 'files.json'), JSON.stringify({
		demos
	}, null, 2), 'utf-8');
});
