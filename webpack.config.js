var fs = require('fs'),
	path = require('path');

var dirs = fs.readdirSync('./examples/src/js/').filter(function(file) {
	return fs.statSync(path.join('./examples/src/js/', file)).isDirectory()
});

var entries = {}
dirs.forEach(dir => {
	entries[dir] = './examples/src/js/' + dir + '/index.js'
})

module.exports = {
	entry: entries,
	output: {
		path: './examples/js',
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel",
			query: {
				presets: ['es2015']
			}
		}]
	},
	quiet: true,
	noInfo: false,
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: false
	},
}
