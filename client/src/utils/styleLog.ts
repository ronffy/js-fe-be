/**
 * @description 带样式的 log
 * @author ronffy
 * @Date 2021-01-08 14:24:27
 * @LastEditTime 2021-01-14 11:21:14
 * @LastEditors ronffy
 */
const baseStyle = {
  color: 'white',
};
const defaultKeyStyle = {
  ...baseStyle,
  background: '#606060',
  ['border-radius']: '2px 0 0 2px',
};
const defaultValStyle = {
  ...baseStyle,
  background: '#1d76b0',
  ['border-radius']: '0 2px 2px 0',
};

export default function styleLog(
  key: string,
  val: string,
  keyStyle = defaultKeyStyle,
  valStyle = defaultValStyle
) {
  console.log(
    `%c ${key} %c ${val} `,
    stringifyStyle(keyStyle),
    stringifyStyle(valStyle)
  );
}
function stringifyStyle(style) {  
  return Object.keys(style).reduce((pre, k) => `${pre}${k}:${style[k]};`, '');
}
