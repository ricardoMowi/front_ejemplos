const path = require('path');
const webpack = require('webpack');
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);
//const merge = require('webpack-merge');
module.exports = {
  mode:'production',
  watch:true,
  entry: {
    // Since we need to load vue in the entry page.
    vue: 'vue',
    // This is where the `main-content` component is
    index: resolve('src/js/components/masterComponents/masterTemplateContainer.vue'),
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'test_mowi_component',
    umdNamedDefine: true,
    // Folder where the output of webpack's result go.
    path: resolve('assets/component'),
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
// module.exports = [
//   // Config 1: For browser environment
//   merge(commonConfig, {
//   }),
//   // Config 2: For Node-based development environments
//   merge(commonConfig, {
//   })
// ];

