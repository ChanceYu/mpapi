'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const webpack = require('webpack');
const path = require('path');

const packageJSON = require('./package.json');

const getConfig = function (outputPath) {
    let config = {
        entry: path.join(__dirname, 'src/index.js'),
        output: {
            filename: 'mpapi.js',
            library: 'mpApi',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.BannerPlugin(
`${packageJSON.name}
version: ${packageJSON.version}
address: ${packageJSON.homepage}
description: ${packageJSON.description}
author:  ${packageJSON.author}
license: ${packageJSON.license}`)
        ],
        resolve: {
            extensions: ['.js']
        }
    }

    if(isProduction){
      config.plugins.push(
          new webpack.optimize.UglifyJsPlugin({
              warnings: false,
              sourceMap: false,
              mangle: false
          })
      )
    }

    config.output.path = outputPath

    return config
}

module.exports = [
  getConfig(path.join(__dirname, 'lib'))
]