const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
        hot: isDev,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            }
        ]
    }
}