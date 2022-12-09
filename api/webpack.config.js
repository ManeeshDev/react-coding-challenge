// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// import path from 'path';
const path = require('path');
// import nodeExternals from 'webpack-node-externals';
const nodeExternals = require('webpack-node-externals');
require('dotenv').config();

const config = {
    entry: path.join(__dirname, 'server.js'),
    // entry: path.join(__dirname, 'src', 'bin', 'server.js'),
    devtool: 'source-map',
    node: {
        __dirname: true,
    },
    externals: [nodeExternals()],
    mode: process.env.NODE_ENV,
    // mode: process.env.NODE_ENV | 'development' | 'production' | 'none',
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             loader: 'eslint-loader',
            //             options: { fix: true },
            //         },
            //     ],
            // },
            // { test: /\.jsx?$/, loader: 'ts-loader' },
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.bundle.js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
        extensions: ['*', '.webpack.js', '.test.js', '.js', '.jsx', '.js', '.spec.js'],
        plugins: [],
    },
    target: 'node',
};

module.exports = config;
