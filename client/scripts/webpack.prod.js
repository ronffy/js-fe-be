/**
 * @description 
 * @author ronffy
 * @Date 2021-01-05 10:51:24
 * @LastEditTime 2021-03-02 17:35:05
 * @LastEditors ronffy
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const fs = require('fs-extra');
const configFactory = require('./webpack.base');
const paths = require('./paths');

const config = configFactory(process.env.NODE_ENV);

copyPublicFolder();

module.exports = merge(config, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new GenerateSW(),
  ]
});


function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appDist, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}