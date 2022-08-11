const path = require('path');
const webpack = require('webpack');
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  mode:'development',
  watch: true,
  entry: {
    vue: 'vue',
    rap: resolve('src/js/containers/rap/assets/rap.js'),
    anniversaryPublic: resolve('src/js/containers/anniversary-public/assets/anniversary-public.js'),
    sharedPublic: resolve('src/js/containers/shared-public/assets/shared-public.js'),
    shared: resolve('src/js/containers/shared/assets/shared.js'),
    accounting: resolve('src/js/containers/accounting/assets/accounting.js'),
    admin: resolve('src/js/containers/admin/assets/admin.js'),
    anniversary: resolve('src/js/containers/anniversary/assets/anniversary.js'),
    volunteer: resolve('src/js/containers/volunteer/assets/volunteer.js'),
    adminImpact: resolve('src/js/containers/admin-impact/assets/admin-impact.js'),
    adminProjects: resolve('src/js/containers/admin-projects/assets/admin-projects.js'),
    massiveAttendance: resolve('src/js/containers/massive-attendance/assets/massive-attendance.js'),
    massiveEnrollment: resolve('src/js/containers/massive-enrollment/assets/massive-enrollment.js'),
  },
  output: {
    filename: '[name].js',
    // Folder where the output of webpack's result go.
    path: resolve('assets/bundles'),
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
