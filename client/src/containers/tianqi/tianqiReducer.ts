/**
 * @description 通用 redux 的 reducer
 * @author ronffy
 * @Date 2019-12-26 20:00:17
 * @LastEditTime 2021-03-05 16:19:56
 * @LastEditors ronffy
 */
import { EChartsOption } from "echarts-for-react";
import ReducerFactory from '../../context/ReducerFactory';

export interface Action {
  type: string
  payload: any
}

export const namespace = 'tianqi';

const tianqiReducer = new ReducerFactory<EChartsOption>(namespace, {
  updateSeriesData(state, { payload }) {
    for (const [i, v] of payload.entries()) {
      state.series[i].data = v;
    }
  }
}).createReducer();

export default tianqiReducer
