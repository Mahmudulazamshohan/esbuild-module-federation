// @ts-nocheck
import path from 'path';
import EsbuildLoader from 'esbuild-loader';
import { Configuration } from 'webpack';
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require('./package.json').dependencies;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();


const config: any = smp.wrap({
  mode: 'development',
  entry: './src/index.ts',
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    port: 3000,
    open: true,
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
    historyApiFallback: true,
  },
  output: {
    filename: 'remoteEntry.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        service1: `service1@${process?.env?.SERVICE1_URL || 'http://localhost:3001'}/remoteEntry.js`,
        service2: `service2@${process?.env?.SERVICE2_URL || 'http://localhost:3002'}/remoteEntry.js`,
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "esbuild-loader",
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
    ],
  },
});

export default config;