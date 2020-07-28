'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = {
	context: path.resolve('src'),
	entry: [
		'core-js/stable',
		'regenerator-runtime/runtime',
		'bootstrap/dist/css/bootstrap.min.css',
		'./index.jsx',
	],
	output: {
		path: path.resolve('dist'),
		filename: 'main.js',
		publicPath: '/',
	},
	resolve: { extensions: ['.js', '.jsx', '.json'] },
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: { sourceMap: true },
				}],
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: {
								exportLocalsConvention: 'camelCase',
								localIdentName: '[path][name]_[local]--[hash:base64:5]',
							},
						},
					},
					{
						loader: require.resolve('sass-loader'),
						options: { sourceMap: true },
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							importLoaders: 1,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlPlugin({ template: path.resolve('src/template.html') }),
		new MiniCssExtractPlugin(),
	],
};

const environments = {
	development: {
		mode: 'development',
		devServer: {
			contentBase: path.resolve('dist'),
			historyApiFallback: true,
			open: true,
			proxy: {
				'/api': {
					target: 'http://localhost:4000',
					secure: false,
				},
			},
		},
	},

	production: {
		mode: 'production',
	},
};

module.exports = function webpackConfig(env) {
	return merge(base, environments[env] || environments.production);
};
