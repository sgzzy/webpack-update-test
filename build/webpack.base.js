const path = require("path");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack"); //!优化loader的处理时间！！！！！！！！
var happyThreadPool = HappyPack.ThreadPool({
    size: 5
});
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            /*  {
               test: /\.css$/,
               include: path.resolve(__dirname, "./src"),
               use: ["happypack/loader?id=css"]
             },
             {
               test: /\.png$/,
               include: path.resolve(__dirname, "./src"),
               use: ["happypack/loader?id=Pics"]
             },
             {
               test: /\.stylus$/,
               include: path.resolve(__dirname, "./src"),
               // exclude:"./node_modules",
               use: [
                 miniCssExtractPlugin.loader,
                 "css-loader",
                 "postcss-loader",
                 "stylus-loader"
               ]
             },
             {
               test: /\.js$/,
               include: path.resolve(__dirname, "./src"),
               use: ["happypack/loader?id=babel"]
             }, */
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "./src"),
                use: [process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : miniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            /* vue-loader>15版本样式解析配置不需要重新在loaderOptions中配置 */
            {
                test: /\.styl(us)?$/,
                include: path.resolve(__dirname, "../src"),
                use: [process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : miniCssExtractPlugin.loader, "css-loader", "postcss-loader", "stylus-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('dist/', 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('dist/', 'media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('dist/', 'fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.vue$/,
                include: path.resolve(__dirname, "../src"),
                use: [{
                    loader: "vue-loader",
                    options: {
                        transformAssetUrls: {
                            video: ['src', 'poster'],
                            source: 'src',
                            img: 'src',
                            image: 'xlink:href'
                        }
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "../node_modules")],
        alias: {
            "@": path.resolve(__dirname, "../src"),
            vue: path.resolve(
                __dirname,
                "../node_modules/vue/dist/vue.runtime.common.js"
            ),
        },
        extensions: [".js", ".vue", ".json"]
    },
    optimization: {
        splitChunks: {
            chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件,
            name: true,
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        /*  new HappyPack({
           id: "css",
           loaders: ["style-loader", "css-loader"],
           threadPool: happyThreadPool
         }),
         new HappyPack({
           id: "Pics",
           loaders: [
             {
               loader: "file-loader",
               options: {
                 name: "images/[name].[ext]"
               }
             }
           ],
           threadPool: happyThreadPool
         }),
         new HappyPack({
           id: "babel",
           loaders: ["babel-loader"],
           threadPool: happyThreadPool
         }),
         new HappyPack({
           id: "vue",
           loaders: ["vue-loader"],
           threadPool: happyThreadPool
         }), */
        new miniCssExtractPlugin({
            filename: "css/[name]_[contenthash:6].css"
        })
    ],
    node: {
        setImmediate: false, // Vue源码已实现
        /* 一下在浏览器汇总无需使用 */
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
