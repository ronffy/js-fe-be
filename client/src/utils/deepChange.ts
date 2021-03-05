/**
 * @description 深度修改数据
 * @author ronffy
 * @Date 2021-03-03 20:21:52
 * @LastEditTime 2021-03-03 20:23:51
 * @LastEditors ronffy
 */
function deepChange(target, change) {
  for (const k in change) {
    const value = change[k];
    if (!k.includes('.')) {
      target[k] = value;
      continue;
    }
    // 开始处理多级的修改
    const keys = k.split('.');
    keys.reduce((pre, curr, index) => {
      if (index === keys.length - 1) {
        // pre是数组，且当前要修改的项值是null时，视为删除该项
        if (Array.isArray(pre) && Number.isNaN(parseInt(curr))) {
          pre[curr].call(pre, ...(
            Array.isArray(value)
              ? value
              : [value]
          ));
        } else {
          // 最终赋值
          pre[curr] = value;
        }
      } else {
        return (pre[curr] = pre[curr] || {});
      }
    }, target);
  }
  return target;
}

export default deepChange
