const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
// 配置cdn资源
const CdnSource = {
  production: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-i18n/8.22.1/vue-i18n.min.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.2.1/echarts.min.js',
    'https://cdn.bootcdn.net/ajax/libs/print-js/1.5.0/print.min.js'
  ],
  development: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-i18n/8.22.1/vue-i18n.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.2.1/echarts.js',
    'https://cdn.bootcdn.net/ajax/libs/print-js/1.5.0/print.js'
  ]
};

module.exports = {
  publicPath: '/',
  outputDir: 'jiepai',
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '/api': {
        // target:'http://192.168.124.3:5000', //ip
        // target: 'http://47.116.14.106', // 正式
        target: 'http://116.62.41.191', // test
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/api/'
        }
      }
    }
  },
  lintOnSave: false, // 'error'

  // webpack 配置秀修改
  configureWebpack: config => {
    config.externals = {
      echarts: 'echarts',
      axios: 'axios',
      vuex: 'Vuex',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      'print-js': 'printJS'
    };

    config.devtool = '#cheap-module-eval-source-map';

    // // console drop
    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      /*console.log(config);
      config.optimization.splitChunks = {
        cacheGroups: {
          // common: {
          //   chunks: 'all',
          //   test: /[\\/]src[\\/]js[\\/]/,
          //   name: 'common',
          //   minChunks: 2,
          //   maxInitialRequests: 5,
          //   minSize: 0,
          //   priority: 60
          // },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
            priority: 20,
          }
        }
      };*/

      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
      config.devtool = '#cheap-module-source-map';
    }
  },
  chainWebpack: config => {
    // 配置cdn
    config.plugin('html').tap(args => {
      args[0].cdn =
        process.env.VUE_APP_CURRENTMODE === 'production' ? CdnSource['production'] : CdnSource['development'];
      return args;
    });

    // 移除 prefetch 插件
    // config.plugins.delete('prefetch-index');
    // 移除 preload 插件
    // config.plugins.delete('preload-index');
    // 修复HMR
    // config.resolve.symlinks(true);
    config.devServer.set('disableHostCheck', true);
    config.resolve.extensions.add('.vue').add('.less');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));
  }
};
