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
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader',
                {
                    loader: "px2rem-loader",
                    options: {
                        // 1rem 就是 75px
                        remUnit: 75,
                        // px 转rem后面的小数点位数
                        remPrecision: 8
                    }
                }
            ]
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
    },
    // 开发环境 cheap-module-eval-source-map
    // 生产环境 cheap-module-source-map
    devtool: 'inline-source-map'
}


// source map
// 1. eval: 使用eval包裹代码
// 2. source map: 产生map文件
// 3. cheap: 不包含列信息
// 4. inline: 将map作为DataUrl嵌入
// 5. module: 包含loader的sourcemap