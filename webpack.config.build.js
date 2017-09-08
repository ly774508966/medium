const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.join(process.cwd(), 'src/index.ts'),
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: production ? 'ixviii.medium.min.js' : 'ixviii.medium.js',
    library: 'ixviii.medium',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
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
                  browsers: [
                    'last 2 versions',
                    'ios_saf >= 10.2',
                    'not IE <= 10'
                  ]
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
