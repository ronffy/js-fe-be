/**
 * @description 
 * @author ronffy
 * @Date 2021-01-05 10:51:24
 * @LastEditTime 2021-01-07 20:01:27
 * @LastEditors ronffy
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const configFactory = require('./webpack.base');

const config = configFactory(process.env.NODE_ENV);

module.exports = merge(config, {
  mode: 'production',
  devtool: 'hidden-source-map',
});