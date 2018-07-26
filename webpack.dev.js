'use strict';

const webpack = require('webpack');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const viewsPath = path.resolve(__dirname, 'resources', 'views');
const jsPublicPath = publicPath + path.join('/', 'assets', 'js', 'app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        runtimeChunk: false
    },
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: jsPublicPath, // The publicPath property is needed when running webpack dev server. 'path' does not seem to work.
    },
    devServer: {
        contentBase: publicPath,
        port: 60800,
        proxy: {
            '/api': 'http://localhost:3000',
        },
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin([jsPublicPath]),
        new HtmlWebpackPlugin({
            title: 't3',
            filename: viewsPath + path.join('/backend/', 'index.pug'),            
            template: '!!ejs-loader!./resources/assets/html/index.pug.ejs',
            inject: false,
            alwaysWriteToDisk: true, // Needed when running Webpack dev server. It relies on HtmlWebpackHarddiskPlugin.
        }),
        new HtmlWebpackHarddiskPlugin(),
    ],
};

