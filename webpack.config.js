const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /.js$/,
            use: 'babel-loader'
        }, {
            test: /.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /.(png|jpg|jpeg|gif)$/,
            use: 'file-loader'
        }, {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    // 小于这个大小打包成base64
                    limit: 10240
                }
            }]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // 基于哪个地址
        static: './dist',
        // 热跟新
        hot: true
    }
}