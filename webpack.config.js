'use strict';

const webpack = require('webpack');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const jsPublicPath = publicPath + path.join('assets', 'js', 'app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        polyfills: './polyfills.js', // todo add polyfill for fetch api
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
        ],
        app: path.resolve(__dirname, 'resources', 'assets', 'js', 'app', 'index.js'), 
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: jsPublicPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 't3',
            filename: publicPath + 'index.html',
        }),
    ],
};

