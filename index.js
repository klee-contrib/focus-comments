const configBuilder = require('./webpack.config').builder;
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(configBuilder('dev')), {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    contentBase: './dist/'
}).listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Webpack dev server listening at localhost:3000`);
});
