/**
 * @description 
 * @author ronffy
 * @Date 2021-01-05 10:51:02
 * @LastEditTime 2021-03-04 10:53:30
 * @LastEditors ronffy
 */
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const package = require('../package.json');
const Webpackbar = require('webpackbar');
const paths = require('./paths');
const createTheme = require('../theme.config');

const isProd = process.env.NODE_ENV === 'production';
console.log(chalk.yellow(`Development:${!isProd}.`));
console.log(chalk.yellow(`Version:${package.version}.`));

function createStyleLoaders({
  less
} = {}) {
  return [
    {
      loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
    },
    less && {
      loader: 'less-loader',
      options: {
        lessOptions: {
          // 解决 antd4.x 与 less- loader4.x 如下报错：
          //   .bezierEasingMixin();
          //   Inline JavaScript is not enabled.Is it set in your options?
          javascriptEnabled: true,
          modifyVars: createTheme(),
        },
        ...less,
      }
    },
  ].filter(Boolean);
}

module.exports = function configFactory(env) {
  return {
    entry: paths.appEntry,
    output: {
      path: paths.appDist,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: [
            {
              loader: 'babel-loader',
            }
          ],
          // include: paths.appSrc,
        },
        // css、less
        {
          oneOf: [
            {
              test: /\.css$/,
              use: createStyleLoaders(),
            },

            // src
            {
              test: /\.less$/,
              include: paths.appSrc,
              use: createStyleLoaders({
                less: true,
              }),
            },

            // node_module
            {
              test: /\.less$/,
              include: paths.appNodeModules,
              use: createStyleLoaders({
                less: true,
              }),
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@components': paths.resolveApp('src/components'),
        '@containers': paths.resolveApp('src/containers'),
        '@utils': paths.resolveApp('src/utils'),
        '@services': paths.resolveApp('src/services'),
      }
    },
    plugins: [
      new Webpackbar(),
      isProd && new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({ 
        'process.env.TAG': JSON.stringify(package.version), 
      }),
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        filename: 'index.html',
        inject: true,
        version: {
          tag: package.version,
          env,
        }
      })
    ].filter(Boolean),

  }
}
