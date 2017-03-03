const fs = require('fs');
const path = require('path');

function isDir(file) {
	return fs.statSync(path.join('./examples/src/js/', file)).isDirectory();
}
const dirs = fs.readdirSync('./examples/src/js/').filter(isDir);

const entries = {};

// To make developing an example faster
// set the env variable EXAMPLE e.g:
// EXAMPLE=linegeometry npm run start
const exampleDir = process.env.EXAMPLE;

if (exampleDir !== undefined) {
	entries[exampleDir] = `./examples/src/js/${exampleDir}/index.js`;
} else {
	dirs.forEach(dir => {
			entries[dir] = `./examples/src/js/${dir}/index.js`;
	});
}

module.exports = {
	entry: entries,
	devtool: 'source-map',
	output: {
		path: './examples/js',
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		loaders: [{
			test: /\.ts(x?)$/,
			exclude: /node_modules/,
			loader: 'babel-loader!ts-loader'
		}, {
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
