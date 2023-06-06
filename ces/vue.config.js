const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "url": require.resolve("url/"),
        "zlib": require.resolve("browserify-zlib"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
      }
    }
  }
});