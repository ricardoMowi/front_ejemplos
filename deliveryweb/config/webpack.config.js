const path = require('path');
const webpack = require('webpack');
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  mode:'development',
  watch:true,
  entry: {
    vue: 'vue',
    shared: resolve('src/js/containers/shared/assets/shared.js'),
    admin: resolve('src/js/containers/admin/assets/admin.js'),
    clientService: resolve('src/js/containers/client-service/assets/client-service.js'),
    riderService: resolve('src/js/containers/rider-service/assets/rider-service.js'),
    sharedPublic: resolve('src/js/containers/shared-public/assets/shared-public.js'),
  },
  output: {
    filename: '[name].js',
    // Folder where the output of webpack's result go.
    path: resolve('assets/bundles/'),
  },
  module: {
    rules: [
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
            css: ['vue-style-loader', {
              loader: 'css-loader',
            }],
            js: [
              'babel-loader',
            ],
          },
          cacheBusting: true,
        },
      },
      {
        // This is required for other javascript modules you are gonna write besides vue.
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
      },
    ],
  },
  node: { fs: 'empty' },

}
