// @ts-nocheck
import path from 'path';
import { Configuration } from 'webpack';
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const config: any = {
  mode: 'development',
  entry: './src/index.tsx', // Entry point as TypeScript file
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: 3001,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
      'X-Webpack-Dev-Server': '1',
    },
    client: {
      overlay: false,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'service1',
      filename: 'remoteEntry.js', 
      exposes: {
        './Service1': './src/Service1.tsx'
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-router-dom'],
        },
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'esbuild-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;