/**
 * @description 
 * @author ronffy
 * @Date 2021-01-06 18:22:43
 * @LastEditTime 2021-03-05 16:25:14
 * @LastEditors ronffy
 */
import React, { useEffect, useMemo, useReducer } from 'react';
import Tianqi from '@containers/tianqi';
import { Provider } from './context/AppContext';
import appReducer, { namespace } from './context/appReducer';
import { fetchUserInfo } from './services/app';

type AppProps = {
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const App: React.FC<AppProps> = () => {
  const [state, dispatch] = useReducer(appReducer, {
    userInfo: {
      username: ''
    }
  });
  const store = useMemo(() => {
    return (window.__store = {
      state,
      dispatch,
    })
  }, [state]);

  useEffect(() => {
    fetchUserInfo()
    .then(({ success, data }) => {
      if (!success) {
        return;
      }
      dispatch({
        type: `${namespace}/deepUpdateState`,
        payload: {
          userInfo: data
        }
      })
    })
  }, []);

  return (
    <Provider value={store}>
      <header>用户名称：{state.userInfo.username}</header>
      <Tianqi />
    </Provider>
  )
}

export default App
