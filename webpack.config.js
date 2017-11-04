const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 10000 }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './static',
        watchOptions: {
            poll: 1000
        }
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};