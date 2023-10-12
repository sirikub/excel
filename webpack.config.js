const path = require('path') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // для очистки папки dist
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //выносим css из js файла

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions: ['.js'],
        // import '../../../../../core/component' теперь пишем просто import '@core/component'
        alias: {
            '@': path.resolve(__dirname, 'src') //пишем символ @, то сразу переходим в папку src вместо ../../../
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin([          
            { 
                from: path.resolve(__dirname, 'src/favicon.ico'), 
                to: path.resolve(__dirname, 'dist') 
            },     
        ]),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ]
}

