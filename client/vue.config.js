module.exports = {
    // 基本路径
    baseUrl: '/',
  
    // 输出文件目录
    outputDir: 'dist',
  
    // where to put static assets (js/css/img/font/...)
    assetsDir: 'static',
  
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
  
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false,
  
    // babel-loader skips `node_modules` deps by default.
    // explicitly transpile a dependency with this option.
    transpileDependencies: [/* string or regex */],
  
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
  
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
      config.module.rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({
          raw: true
        })
    },
    configureWebpack: () => {},
  
    // css相关配置
    css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
  
      // 开启 CSS source maps?
      sourceMap: false,
  
      // css预设器配置项
      loaderOptions: {},
  
      // 启用 CSS modules for all css / pre-processor files.
      modules: false
    },
  
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
  
    // options for the PWA plugin.
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // webpack-dev-server 相关配置
    devServer: {
      open: process.platform === 'darwin',
      disableHostCheck: false,
      host: '0.0.0.0',
      port: 8082,
      https: false,
      hotOnly: false,
      // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
      proxy: 'http://localhost:8081'  //本地开发
      // before: app => {}
    },
  
    // 第三方插件配置
    pluginOptions: {
      // ...
    },
}