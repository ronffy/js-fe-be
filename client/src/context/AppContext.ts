/**
 * @description tpl01项目的 state 通过 context 通信
 * @author ronffy
 * @Date 2019-12-04 13:52:29
 * @LastEditTime 2021-03-05 16:27:42
 * @LastEditors ronffy
 */
import React, { Dispatch } from 'react';
import { Action } from './ReducerFactory';

export type AppState = {
  userInfo: {
    username: string
    [props: string]: any
  }
}

type AppContextProps = {
  state: AppState
  dispatch: Dispatch<Action>
}

const AppContext = React.createContext(({} as AppContextProps));

export const Provider = AppContext.Provider;
export const Consumer = AppContext.Consumer;

export default AppContext;

