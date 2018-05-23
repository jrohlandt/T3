'use strict';

const path = require('path');
const distDir = path.resolve(__dirname, 'public');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'resources', 'js', 'entry.js'),
    output: {
        filename: 'bundle.js',
        path: distDir,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 't3'
        }),
    ],
};

