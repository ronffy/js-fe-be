/**
 * @description 通用 redux 的 reducer
 * @author ronffy
 * @Date 2019-12-26 20:00:17
 * @LastEditTime 2021-03-05 16:20:31
 * @LastEditors ronffy
 */
import { Reducer } from "react";
import produce from 'immer';
import deepChange from '@utils/deepChange';

export interface Action {
  type: string
  payload?: any
}

class ReducerFactory<S, A extends Action = Action> {
  namespace: string
  _reducerCases: Record<string, Function>
  
  constructor(namespace: string, methods?: Record<string, Function>) {
    this.namespace = namespace;
    this._reducerCases = {
      [`${namespace}/deepUpdateState`]: (state: S, action: A) => deepChange(state, action.payload),
      [`${namespace}/updateState`]: (state: S, action: A) => ({
        ...state,
        ...action.payload
      }),
    }
    if (Object.prototype.toString.call(methods) === '[object Object]') {
      for (const type of Object.keys(methods)) {
        this.addReducerCase(type, methods[type]);
      }
    }
  }

  getCaseType(type) {
    return type.includes('/') ? type : `${this.namespace}/${type}`;
  }

  static defaultAction = {
    type: '@@defaultActionType'
  }

  getReducerCase(type: string) {
    return this._reducerCases[this.getCaseType(type)];
  }
  addReducerCase(type: string, method: Function) {
    this._reducerCases[this.getCaseType(type)] = method;
  }
  rmReducerCase(type: string) {
    delete this._reducerCases[this.getCaseType(type)];
  }

  createReducer(initState?: S): Reducer<S, A> {
    return produce((state = initState, action: A = (ReducerFactory.defaultAction as A)) => {
      try {
        const reducer = this.getReducerCase(action.type);
        return typeof reducer === 'function' ? reducer(state, action) : state;
      } catch (error) {
        console.error('tianqiReducer error:', error);
        return state;
      }
    });
  }
}

export default ReducerFactory
