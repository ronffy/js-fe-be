/**
 * @description 全局服务方法
 * @author ronffy
 * @Date 2021-03-04 10:39:31
 * @LastEditTime 2021-03-04 14:11:37
 * @LastEditors ronffy
 */

/**
 * @description 请求用户信息
 */ 
export function fetchUserInfo() {
  return Promise.resolve({
    success: true,
    data: {
      username: 'ronffy'
    }
  })
}
