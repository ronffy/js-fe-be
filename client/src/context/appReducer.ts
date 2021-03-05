/**
 * @description 
 * @author ronffy
 * @Date 2021-03-05 15:35:44
 * @LastEditTime 2021-03-05 16:21:37
 * @LastEditors ronffy
 */
import ReducerFactory from './ReducerFactory';
import { AppState } from './AppContext';

export const namespace = 'app';

const appReducer = new ReducerFactory<AppState>(namespace).createReducer();

export default appReducer;
