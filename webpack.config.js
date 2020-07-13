'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = {
	context: path.resolve('src'),
	entry: './index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'main.js',
	},
	extensions: ['', '.js', '.jsx', '.json'],
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
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							localsConvention: 'camelCase',
							modules: { localIdentName: '[path][name]_[local]--[hash:base64:5]' },
						},
					},
					{
						loader: require.resolve('sass-loader'),
						options: { sourceMap: true },
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
	},

	production: {
		mode: 'production',
	},
};

module.exports = function webpackConfig(env) {
	return merge(base, environments[env] || environments.production);
};
