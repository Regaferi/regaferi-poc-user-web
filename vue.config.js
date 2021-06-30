let path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {

    //基本路径
    publicPath: './',
    //输出文件目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: "static",
    //生产环境不需要生产map文件
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]', // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    chainWebpack: config => {
        //这里是对环境的配置，不同的环境对应不同的BASE_URL
        config.plugin("define").tap(args => {
            args[0]["process.env"].VUE_APP_LOGOUT_URL = JSON.stringify(
                process.env.VUE_APP_LOGOUT_URL
            );
            console.log(args[0]);

            return args;
        });

        //只在生产环境生效
        if (process.env.VUE_APP_CURRENTMODE === "production") {
            config.optimization.minimize(true);

            config.optimization.splitChunks({
                chunks: "all",
                cacheGroups: {
                    public: {
                        name: "public",
                        test: resolve("src/components"),
                        minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
                        minChunks: 2, // 最小公用次数
                        priority: 5, // 优先级
                        reuseExistingChunk: true // 公共模块必开启
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            });

        }
        //设置别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@api", resolve("src/api/api")) //接口地址
            .set("@assets", resolve("src/assets"));
    },


    devServer: {
        port: 8080,   // 开启服务器的端口 // 端口
        open: true, // 自动开启浏览器
        compress: false, // 开启压缩
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/apis/api': {    //将www.exaple.com印射为/apis
                target: "https://komoju.com",  // 接口域名
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }
            },
            '/apis': {    //将www.exaple.com印射为/apis
                target: process.env.VUE_APP_LOGOUT_URL,  // 接口域名
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }
            }
        },
    },
};
