/*
 * @Description: 
 * @Date: 2020-02-29 12:19:00
 * @Author: mason
 */
//生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
//需要安装以下模块:
//npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
/** 
webpack-merge 合并配置
copy-webpack-plugin 拷贝静态资源
optimize-css-assets-webpack-plugin 压缩css
uglifyjs-webpack-plugin 压缩js
 */
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')    //注意大括号， 通过这个插件我们可以清除之前打包生成的js文件

module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
        }]),
        new CleanWebpackPlugin(),

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({//压缩js
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    }
})
