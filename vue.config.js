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
