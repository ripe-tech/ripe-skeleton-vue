const path = require("path");
const webpack = require("webpack");
const eslintWebpackPlugin = require("eslint-webpack-plugin");
const vueLoader = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ESLintPlugin = eslintWebpackPlugin;
const VueLoaderPlugin = vueLoader.VueLoaderPlugin;

const config = {
    entry: "./js/main.js",
    target: process.env.WP_TARGET || "web",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "ripe-skeleton-vue.min.js?[fullhash]",
        library: "RipeSkeletonVue",
        libraryTarget: "umd",
        publicPath: "/"
    },
    devServer: {
        compress: false,
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        hot: true,
        historyApiFallback: true,
        watchFiles: ["js/**/*", "vue/**/*"]
    },
    plugins: [
        new VueLoaderPlugin({}),
        new ESLintPlugin({
            extensions: ["js", "jsx", "vue"]
        }),
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
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        js: "babel-loader",
                        scss: "vue-style-loader!css-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!ripe-sdk)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            sourceType: "unambiguous",
                            presets: [
                                process.env.NODE_ENV === "development"
                                    ? [
                                          "@babel/preset-env",
                                          {
                                              targets: {
                                                  browsers: ["last 2 years"]
                                              },
                                              useBuiltIns: "entry",
                                              corejs: "3"
                                          }
                                      ]
                                    : [
                                          "@babel/preset-env",
                                          {
                                              useBuiltIns: "entry",
                                              corejs: "3"
                                          }
                                      ]
                            ],
                            plugins: [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        regenerator: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: "file-loader",
                type: "javascript/auto",
                options: {
                    name: (path, query) => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].[ext]?[hash]";
                        }
                        return "[contenthash].[ext]";
                    },
                    esModule: false
                }
            },
            {
                test: /\.svga$/,
                loader: "file-loader",
                type: "javascript/auto",
                options: {
                    name: (path, query) => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].svg?[hash]";
                        }
                        return "[contenthash].svg";
                    },
                    esModule: false
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    resolve: {
        alias: {
            base$: "../../../js",
            vue$: "vue/dist/vue.esm.js"
        },
        fallback: {
            fs: false,
            http: false,
            https: false
        }
    },
    performance: {
        hints: false
    },
    devtool: "inline-source-map"
};

if (process.env.NODE_ENV === "production") {
    config.devtool = "source-map";
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]);
}

module.exports = config;
