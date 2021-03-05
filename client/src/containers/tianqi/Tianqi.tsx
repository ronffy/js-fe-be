/**
 * @description 
 * @author ronffy
 * @Date 2021-03-03 17:46:44
 * @LastEditTime 2021-03-05 16:22:08
 * @LastEditors ronffy
 */
import React, { useEffect, useReducer } from 'react';
import ReactECharts from 'echarts-for-react';
import tianqiReducer, { namespace } from './tianqiReducer';
import { fetchTianqi40Day } from '../../services/tianqi';

type TianqiProps = {
}

// #----------- 上: TS类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Tianqi: React.FC<TianqiProps> = ({
}) => {
  const [options, dispatch] = useReducer(tianqiReducer, {
    title: {
      left: 'center',
      text: ''
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '空气质量',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        },
      },
      {
        type: 'value',
        name: '气温',
        axisLabel: {
          formatter: '{value} °C'
        },
        splitLine: {
          show: false
        },
      }
    ],
    series: [
      {
        name: '空气质量',
        data: [],
        type: 'bar',
        smooth: true,
      },
      {
        name: '最高气温',
        data: [],
        type: 'line',
        yAxisIndex: 1,
      },
      {
        name: '最低气温',
        data: [],
        type: 'line',
        yAxisIndex: 1,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
  });

  useEffect(() => {
    fetchTianqi40Day()
      .then(({ success, data }) => {
        if (!success) {
          return;
        }
        const xAxis = [];
        const series = Array.from({ length: 3 }, () => []);
        for (const item of data.data) {
          xAxis.push(item.date);
          series[0].push(item.air);
          series[1].push(item.tem1);
          series[2].push(item.tem2);
        }
        dispatch({
          type: `${namespace}/deepUpdateState`,
          payload: {
            'xAxis.0.data': xAxis,
            'title.text': `${data.city}未来40天气温及空气质量`,
          },
        });
        dispatch({
          type: `${namespace}/updateSeriesData`,
          payload: series,
        });
      })
  }, []);

  return (
    <div>
      <ReactECharts
        option={options}
      />
    </div>
  )
}

export default Tianqi
