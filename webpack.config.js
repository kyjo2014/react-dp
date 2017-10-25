const HtmlWebpackpPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /app/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                include: /app/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader'
                }]
            }, {
                test: /\.less$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'app/style')
                ],
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'less-loader'
                }]
            },{
                //less文件 ， sass（scss）文件类似
                //loader的顺序是从下往上，也就是less先执行，最后执行style
                test: /\.less$/,
                include: path.resolve(__dirname, 'app/style'),
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader'
                }, {
                  loader: 'postcss-loader'
                }, {
                  loader: 'less-loader'
                }]
              }, {
                //图片文件
                test: /\.(png|jpg|svg|gif|jpeg|bmp)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            //
                            limit: 5000,
                            name: '[name]-[hash:5].[ext]'
                        }
                    }
                    /*, {
                                              //压缩图片文件
                                              loader: 'image-webpack-loader'
                                            }*/
                ]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [new HtmlWebpackpPlugin({
            filename: 'index.html',
            template: __dirname + '/app/index.html'
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == "dev") || 'false'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {

            }
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8686'
        })
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: './public',
        historyApiFallback: true,
        inline: true,
        hot: true
    }
}