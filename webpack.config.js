const path = require('path')

module.exports = {
    // entry: './src/index.js',
    // 多入口打包
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
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
    }
}