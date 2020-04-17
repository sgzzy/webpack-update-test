const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const baseConig = require("./webpack.base.js");
const merge = require("webpack-merge");

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devConfig = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name]_[hash:6].js"
    },
    cache: true,
    devtool: config.dev.devtool,
    optimization: {
        usedExports: true // 哪些导出的模块被使用了，再做打包
    },
    watch: true,
    watchOptions: {
        //默认为空，不监听的文件或者目录，支持正则
        ignored: /node_modules/,
        //监听到文件变化后，等300ms再去执行，默认300ms,
        aggregateTimeout: 300,
        //判断文件是否发生变化是通过不停的询问系统指定文件有没有变化，默认每秒问1次
        poll: 1000 //ms
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        clientLogLevel: 'warn', // warning将在5中移除
        color: true,
        historyApiFallback: true,
        publicPath: config.dev.assetsPublicPath,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false,
        open: config.dev.autoOpenBrowser,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        hot: true,
        hotOnly: true,
        quiet: true, // 使用friendlyErrorPlugin必须要开启   
        before(app) {
            app.use(express.static(__dirname + '/../src/ueditor/'))
            app.get('/simpleupload', function (req, res) {
                res.send(req.query);
            });
            app.get('/crossdomain.xml', function (req, res) {
                res.sendFile(path.join(__dirname, '../crossdomain.xml'));
            });
            app.post('/meituupload', function (req, res) {
                console.log(req.query)
                console.log(req.body)
                console.log(req.params)
                res.send(req.query);
            })
        },
    },
    optimization： {

    }，
    plugins: [
        new htmlWebpackPlugin({
            title: "ERP",
            template: "./index.html",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = merge(baseConig, devConfig);
