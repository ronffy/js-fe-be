/**
 * @description 
 * @author ronffy
 * @Date 2021-01-06 18:22:43
 * @LastEditTime 2021-01-14 11:32:42
 * @LastEditors ronffy
 */
import React from 'react';
import Example from '@components/example';

type AppProps = {
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <div style={{ height: 100 }}></div>
      <Example />
    </div>
  )
}

export default App
