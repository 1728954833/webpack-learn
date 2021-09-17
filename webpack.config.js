const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
    // 自动监听打包
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        // 监听到改变后多少ms开始打包
        aggregateTimeout: 300,
        // 1s询问1000次需不需要打包
        poll: 1000
    },
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