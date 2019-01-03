const path = require('path');

const libraryName = 'raketa-ui';
const outputFile = 'bundle.js';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.js',
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "react"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "react-dom"
    },
    "styled-components": {
      commonjs: "styled-components",
      commonjs2: "styled-components",
      amd: "styled-components",
      root: "styled-components"
    }
  }
};