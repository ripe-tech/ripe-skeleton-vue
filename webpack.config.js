const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("uxf-webpack/config/webpack.config.full");

config.entry = "./js/main.js";
config.output.path = path.join(__dirname, "dist");
config.output.filename = "ripe-skeleton-vue.min.js?[hash]";
config.output.library = "RipeSekeletonVue";
config.output.publicPath = "/";
config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 3000,
    stats: "minimal",
    hot: true,
    historyApiFallback: true
};

config.node = {
    fs: "empty"
};

config.plugins.push(
    new HtmlWebpackPlugin({
        title: "RIPE Skeleton for Vue.js",
        template: "./index.html",
        cache: false,
        inject: "head",
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: false,
            preserveLineBreaks: false
        }
    })
);

module.exports = config;
