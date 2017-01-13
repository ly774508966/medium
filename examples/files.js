const fs = require('fs');
const demos = [];
fs.readdir('./examples', (err, files) => {
	files.forEach(file => {
		if (file.indexOf('.html') !== -1 && file.indexOf('index') === -1) {
			demos.push(file.split('.html')[0]);
		}
	});
	fs.writeFile('./examples/files.json', JSON.stringify({ demos }, null, 2), 'utf-8');
});
