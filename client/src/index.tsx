/**
 * @description 
 * @author ronffy
 * @Date 2021-01-04 18:45:25
 * @LastEditTime 2021-01-14 14:26:24
 * @LastEditors ronffy
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styleLog from './utils/styleLog';

styleLog('Tag', process.env.TAG);
styleLog('Env', process.env.NODE_ENV);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  })
}
