const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StatsPlugin = require('stats-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack({

    // watch: true, // Enable this in development
    stats: {
        errors: true,
        timing: true
    },
    profile: true,
    context: path.resolve('./src'),
    entry: {
        main: './app.js',
    },
    output: {
        filename: '[name].js',
        chunkFilename: "[name].js",
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            // JS
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    presets: ['react']
                },
            },
            // SCSS
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader" }),
            },

        ],
    },
    devtool: "source-map",
    plugins: [
        new StatsPlugin('stats.json', {
            chunkModules: true,
            exclude: [/node_modules[\\\/]react/]
        }),
        new CopyWebpackPlugin([
            { from: './index.html' },
        ]),
        new ExtractTextPlugin("[name].css"),
    ],
    devServer: {
        contentBase: path.resolve('./dist'),
        compress: true,
        port: 9000
    }

}, (err, stats) => {
    if (err || stats.hasErrors()) {
    console.log('we have errors');
    console.log(err);
}
console.log('Duration:', (stats.endTime - stats.startTime));
});

const server = new WebpackDevServer(compiler);
server.listen(8080);
