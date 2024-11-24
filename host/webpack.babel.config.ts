// @ts-nocheck
import path from 'path';
import EsbuildLoader from 'esbuild-loader';
import { Configuration } from 'webpack';
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require('./package.json').dependencies;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
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
    plugins: [
        new ReactRefreshWebpackPlugin({ overlay: false }),
        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            remotes: {
                service1: 'service1@http://localhost:3001/remoteEntry.js',
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
                test: /\.(js|jsx|tsx|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            "@babel/preset-env",
                            { targets: { browsers: "last 2 versions" } },
                        ],
                        "@babel/preset-typescript",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                },
            },
        ]
    },
});

export default config;