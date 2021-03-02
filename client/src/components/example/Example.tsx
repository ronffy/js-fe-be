/**
 * @description 
 * @author ronffy
 * @Date 2021-01-11 17:32:25
 * @LastEditTime 2021-03-02 15:24:15
 * @LastEditors ronffy
 */
import React from 'react';
import { Button } from 'antd';
// import styles from './Example.less';
import './Example.less';

type ExampleProps = {
  name?: string
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Example: React.FC<ExampleProps> = ({
  name,
}) => {
  const handle = (_e: React.MouseEvent<HTMLInputElement>) => {

  }

  return (
    <div className="Example">
      <Button
        onClick={handle}
        type="primary"
      >点我吧7</Button>
      <span className="ml-10">example: </span>
      <span className="ml-10 title">{name}</span>
    </div>
  )
}

Example.defaultProps = {
  name: 'ronffy'
}

export default Example
