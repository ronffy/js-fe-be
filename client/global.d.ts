/**
 * @description 
 * @author ronffy
 * @Date 2019-11-15 21:04:15
 * @LastEditTime 2021-03-05 16:29:37
 * @LastEditors ronffy
 */

declare module "*.css" {
  const content: {
    [propName: string]: any
  };
  export default content;
}

declare module "*.less" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: object;
  export default content;
}

interface System {
  import<T = any>(module: string): Promise<T>
}

declare const System: System

interface Window {
  __store: {
    state: any
    dispatch: any
  }
}

interface NodeModule {
  hot: any
}
