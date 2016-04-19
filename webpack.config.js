module.exports = {
	entry: {
		'index': "./examples/src/js/index.js",
		'fullscreen-shader': "./examples/src/js/fullscreen-shader.js"
	},
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
