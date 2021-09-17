const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMini = require('css-minimizer-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js'
    },
    mode: 'production',
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
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            // 使用哪个模块
            chunks: ['app'],
            // 是否自动导入模块
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin()
    ],
    // CSS打包优化
    optimization: {
        // 在开发环境下开启
        minimize: true,
        minimizer: [
            new CSSMini(),
        ],
    }
}
