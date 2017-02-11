const fs = require('fs');
const path = require('path');

function isDir(file) {
	return fs.statSync(path.join('./examples/src/js/', file)).isDirectory();
}
const dirs = fs.readdirSync('./examples/src/js/').filter(isDir);

const entries = {};
dirs.forEach(dir => {
	entries[dir] = `./examples/src/js/${dir}/index.js`;
});

module.exports = {
	entry: entries,
	devtool: 'source-map',
	output: {
		path: './examples/js',
		filename: '[name].js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-0'],
			},
		}],
	},
	stats: 'minimal',
};
