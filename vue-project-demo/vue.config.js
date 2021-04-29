const { resolve } = require("core-js/fn/promise")

module.exports = {
  // publicPath: '/xx/x'
  chainWebpack: config => {
    config.resolve.symlinks(false)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/css/standard.less")]
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")(),
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 375,
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            replace: false
          })
        ]
      }
    },
    devServer: {
      hot: true,
      host: "localhost",
      port: 36600,
      open: true,
      proxy: {
        "/ajax": {
          target: "http://10.80.102.13/mock/223"
        }
      }
    }
  }
}