const path = require('path') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // для очистки папки dist
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //выносим css из js файла

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: filename('js'),
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
            template: 'index.html',
            minify: {
              removeComments: isProd,
              collapseWhitespace: isProd
            }
        }),
        // new CopyPlugin([          
        //     { 
        //         from: path.resolve(__dirname, 'src/favicon.ico'), 
        //         to: path.resolve(__dirname, 'dist') 
        //     }
        // ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [       
                MiniCssExtractPlugin.loader,   
              "css-loader",              
              "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader"
            }
          },
        ],
      },
}

