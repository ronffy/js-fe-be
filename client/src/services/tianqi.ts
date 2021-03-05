/**
 * @description 天气相关服务方法
 * @author ronffy
 * @Date 2021-03-04 10:39:31
 * @LastEditTime 2021-03-04 11:32:43
 * @LastEditors ronffy
 */
import request from '../utils/request';
import { tianqi } from '../config/api';
import tianqiSecret from '../config/tianqiSecret';

/**
 * @description 请求未来40天的天气
 */
interface Tianqi40DayRes {
  data: any[]
  city: string
  [props: string]: any
}

export function fetchTianqi40Day(params?) {
  return request<Tianqi40DayRes>(tianqi, {
    data: {
      version: 'v3',
      appid: tianqiSecret.appid,
      appsecret: tianqiSecret.appsecret,
      ...params,
    },
    transformRequest: [
      // 天气接口，要求请求头中不能包含 Content-Type 字段
      // axios 配置中无法不配置 Content-Type ，所以通过 transformRequest 方法删除该字段
      (data, headers) => {
        delete headers['Content-Type'];
        return data;
      }
    ]
  })
}