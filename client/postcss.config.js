/**
 * @description 
 * @author ronffy
 * @Date 2021-01-13 20:20:37
 * @LastEditTime 2021-01-15 16:06:31
 * @LastEditors ronffy
 */
module.exports = {
  ident: 'postcss',
  modules: true,
  plugins: [
    [
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ]
  ]
}