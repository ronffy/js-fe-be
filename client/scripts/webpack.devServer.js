/**
 * @description 
 * @author ronffy
 * @Date 2021-01-05 10:52:01
 * @LastEditTime 2021-03-02 14:58:26
 * @LastEditors ronffy
 */
const paths = require('./paths');

module.exports = function createDevServerConfig(config) {
  return {
    contentBase: paths.appDist,
    port: 8090,
    hot: true,
    compress: true,
    historyApiFallback: true,
    open: true,
    quiet: false,
    noInfo: true,
    ...config,
  }
}