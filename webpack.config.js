const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};