const path = require('path')

module.exports = {
    // entry: './src/index.js',
    // 多入口打包
    entry: {
        app: './src/index.js',
        admin: './src/index2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production'
}