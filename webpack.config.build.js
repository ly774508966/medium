const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.join(process.cwd(), 'src/index.ts'),
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: production ? 'ixviii.medium.min.js' : 'ixviii.medium.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'ios_saf >= 8', 'not IE <= 10']
                }
              }
            ]
          ],
          plugins: ['babel-plugin-transform-class-properties']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  stats: 'minimal',
  plugins: production ? [new BabiliPlugin()] : []
};
