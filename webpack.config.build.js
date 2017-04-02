const fs = require('fs');
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.ts',
	output: {
		path: __dirname + '/lib',
		filename: production ? 'ixviii.medium.min.js' : 'ixviii.medium.js',
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
	stats: 'minimal',
	plugins: production ? [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			}
		}),
	] : [],
};
