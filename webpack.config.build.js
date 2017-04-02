const fs = require('fs');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: __dirname + '/lib',
		filename: 'ixviii.medium.js',
		libraryTarget: 'commonjs2',
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
		}, {
			test: /\.json$/,
			loader: 'json-loader',
		}],
	},
	stats: 'minimal'
};
