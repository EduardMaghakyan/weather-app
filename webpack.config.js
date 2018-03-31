const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./app/scripts/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "dist/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            contentBase: path.join(__dirname, "public")
        }
    },
    plugins: [
        new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")])
    ],
    devtool: "source-map"
};
