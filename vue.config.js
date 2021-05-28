/*
module.exports = {
  devServer: {
    port: 8080,   // 开启服务器的端口 // 端口
    open: true, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
*/

// Vue.config.js 配置选项
let path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {

    // 选项

    // eslint-disable-next-line no-irregular-whitespace
    //  基本路径

    publicPath: "./",

    // eslint-disable-next-line no-irregular-whitespace
    //  构建时的输出目录

    outputDir: "dist",

    // eslint-disable-next-line no-irregular-whitespace
    //  放置静态资源的目录

    assetsDir: "static",

    // eslint-disable-next-line no-irregular-whitespace
    //  html 的输出路径

    indexPath: "index.html",

    //文件名哈希

    filenameHashing: true,

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
            // eslint-disable-next-line no-undef
            config.externals(externals);
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
            '/apis': {    //将www.exaple.com印射为/apis
                target: 'http://manager-api.regaferi-japan.com',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }
            }
        }
    },
    transpileDependencies: [
        'vuetify'
    ]

}
