const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

focusCommentsConfigBuilder = ENV => ({
    entry: ENV === 'dev' ? [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/example'
    ] : [
        './src'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'focus-comments.js',
        publicPath: '/'
    },
    plugins: ENV === 'dev' ? [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Focus comments',
            inject: 'body',
            templateContent: '<body><div class="comments"/></body>'
        })
    ] : [],
    module: {
        loaders: [
            {
                test: /.js$/,
                loaders: ENV === 'dev' ? ['react-hot', 'babel'] : ['babel'],
                include: [
                    path.resolve(__dirname, './src')
                ]
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: { mimetype: 'image/png' }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
});

const focusCommentsProdConfig = focusCommentsConfigBuilder('prod');
focusCommentsProdConfig.builder = focusCommentsConfigBuilder;

module.exports = focusCommentsProdConfig;
