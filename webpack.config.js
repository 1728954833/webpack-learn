const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /.js$/,
            use: 'babel-loader'
        }, {
            test: /.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            test: /.(png|jpg|jpeg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 200,
                    name: 'img/[name]_[hash:8].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ],
}

// 三种文件指纹
// 1. hash: 和整个项目构建有关, 只要项目文件有修改整个项目构建的hash就会更改
// 2. chunkHash: 和webpack打包chunk有关, 不同entry生成不同的值
// 3. contentHash: 根据文件内容定义hash, 文件内容变化就会变