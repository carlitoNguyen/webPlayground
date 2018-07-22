const { resolve } = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		'./main.js',
		'./assets/scss/main.scss',
	],

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '',
	},

	context: resolve(__dirname, 'src/app'),

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'src/build'),
		historyApiFallback: true,
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loaders: [
					'babel-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'sass-loader',
							query: {
								sourceMap: false,
							},
						},
					],
					publicPath: '../'
				})),
			},
		]
	},

	plugins: [
		new ExtractTextPlugin({ filename: './style.css', disable: false, allChunks: true }),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			hash: false,
			template: "./index.html",
		})
	]
};

module.exports = config;
