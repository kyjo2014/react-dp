var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/index.js'),
        vender: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].[chunkhash:8].js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "less-loader"]
                })
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                })
            }, {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=5000&name=img/[name].[chunkhash:8].[ext]'
            }, {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=5000&name=fonts/[name].[chunkhash:8].[ext]'
            }
        ],
        plugins: [
            new webpack.BannerPlugin("Copyright by"),
            new HtmlWebpackPlugin({
                template:__dirname+'/app/index.html'
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings:false
                }
            }),
            new ExtractTextPlugin('[name].[chunkhash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: '[name].[chunkhash:8].js'
            }),
            new webpack.DefinePlugin({
                __DEV__:JSON.stringify(JSON.parse((preocess.env.NODE_ENV == 'dev')||'false'))
            })
        ]
    }
}