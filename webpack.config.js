const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        entry: './views/index.js',
        output: {
            path: __dirname + '/bin',
            filename: 'app.bundle.js',
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        }

    }
  ,
  {
    entry: './views/display/index.js',
    output: {
      path: __dirname + '/bin',
      filename: 'display.bundle.js',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }]
    }

  }
  ,
  {
    entry: './views/control/index.js',
    output: {
      path: __dirname + '/bin',
      filename: 'control.bundle.js',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }]
    }

  }
]
