/**
 * @description 
 * @author ronffy
 * @Date 2021-01-08 16:56:34
 * @LastEditTime 2021-01-08 17:01:38
 * @LastEditors ronffy
 */
const chalk = require('chalk');
const slog = require('single-line-log');

module.exports = class ConsoleWebpackPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    /**
     * Monitor file change 记录当前改动文件
     */
    compiler.hooks.watchRun.tap('ConsoleWebpackPlugin', (watching) => {
      const changeFiles = watching.watchFileSystem.watcher.mtimes
      for (let file in changeFiles) {
        console.log(chalk.green('当前改动文件：' + file))
      }
    })
    /**
     *  before a new compilation is created. 开始 compilation 编译 。
     */
    compiler.hooks.compile.tap('ConsoleWebpackPlugin', () => {
      this.beginCompile()
    })
    /**
     * Executed when the compilation has completed. 一次 compilation 完成。
     */
    compiler.hooks.done.tap('ConsoleWebpackPlugin', () => {
      this.timer && clearInterval(this.timer)
      const endTime = new Date().getTime()
      const time = (endTime - this.starTime) / 1000
      console.log(chalk.yellow(' 编译完成'))
      console.log(chalk.yellow('编译用时：' + time + '秒'))
    })
  }
  beginCompile() {
    const lineSlog = slog.stdout
    let text = '开始编译：'
    /* 记录开始时间 */
    this.starTime = new Date().getTime()
    this.timer = setInterval(() => {
      text += '█'
      lineSlog(chalk.green(text))
    }, 50)
  }
}
