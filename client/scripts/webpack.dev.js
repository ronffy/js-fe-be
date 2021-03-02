/**
 * @description 
 * @author ronffy
 * @Date 2021-01-05 10:51:34
 * @LastEditTime 2021-03-02 15:00:45
 * @LastEditors ronffy
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('./webpack.base');
const createDevServerConfig = require('./webpack.devServer');

const port = process.env.PORT || 8090;

const config = configFactory(process.env.NODE_ENV);
const compiler = webpack(merge(config, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
}));

const devServerConfig = createDevServerConfig({
  port,
});

const app = new WebpackDevServer(compiler, devServerConfig);

app.listen(port, () => {
  console.log('end');
});

