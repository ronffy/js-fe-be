/**
 * @description 
 * @author ronffy
 * @Date 2021-03-02 15:10:25
 * @LastEditTime 2021-03-02 15:19:34
 * @LastEditors ronffy
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

module.exports = () => {
  const themePath = path.join(__dirname, './src/themes/default.less')
  return lessToJs(fs.readFileSync(themePath, 'utf8'))
}
