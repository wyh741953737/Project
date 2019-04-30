var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
});

module.exports = {
    devtool: 'eval',
    entry: [
        // 'webpack-dev-server/client?http://localhost:3005',
        './src/index'
    ],
    mode: "development",
    output: {
        path: path.join(__dirname, 'dist'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
          }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        devFlagPlugin,
        // new ExtractTextPlugin('app.css')
    ],

    module: {
        rules: [{
            exclude: '/node_modules/',
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            test: /\.css$/,
            loader: "babel-loader"
        },
        {
            exclude: '/node_modules/',
            test: /\.css$/,
            include: path.join(__dirname, 'src'),
            loader: 'css-loader'

        },
        {
            exclude: '/node_modules/',
            test: /\.json$/,
            include: path.join(__dirname, 'src'),
            loader: 'json-loader'
        }
     ]
    },

    resolve: {
        extensions: ['.js', '.json']
    }
};