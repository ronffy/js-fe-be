
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

export type RequestResponse = {
  success: boolean
  message: string
  statusCode: number
  data: object | any[]
  [props: string]: any
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

const defaultOptions = {
  method: 'GET',
  headers: defaultHeaders,
  // 不实用 request 方法内的错误提示
  noErrorTip: false,
}

type RequestPromise<T, D extends any> = Promise<Partial<AxiosResponse<T>> & {
  success: boolean,
  message: string,
  statusCode: number,
  data: D
}>

export default function request<D>(url: string, options: AxiosRequestConfig = {}): RequestPromise<RequestResponse, D> {
  options = {
    ...(defaultOptions as Partial<AxiosResponse>),
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    url,
  }

  // 无论get or post 请求，外部都使用 data 字段传数据，request 方法内需将 get 的 data 转移到 params 字段
  if ((options.method.toUpperCase() === 'GET' && options.data)) {
    options.params = { ...options.data };
    delete options.data
  }

  return axios(options)
    .then(response => {
      const { status, statusText } = response
      const successe = checkRspStatus(response)
      if (successe) {
        return Promise.resolve({
          ...response,
          success: true,
          message: statusText,
          statusCode: status,
          data: response.data
        })
      }

      const error = {
        name: 'http error',
        message: 'http response status error',
        config: options,
        code: `${status}`,
        response,
        isAxiosError: false,
      }
      return Promise.reject(error)
    })
    .catch(error => {
      const { response } = error

      // 错误提示
      if (!(options as any).noErrorTip) {
        tipError(response || {
          ...error,
          status: 600
        })
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { statusText } = response
        statusCode = response.status
        msg = response.data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || 'Network Error'
      }

      /* eslint-disable */
      return Promise.resolve({
        ...response,
        data: response && response.data || {},
        success: false,
        status: statusCode,
        message: msg,
      })
    })
}

export function checkRspStatus({ status }: AxiosResponse) {
  if (status >= 200 && status < 300) {
    return true;
  }
  return false;
}

function tipError(response: AxiosResponse) {
  const { data = {}, status, statusText } = response;
  let errorMsg = data.message || statusText || '请求错误，请刷新重试';
  console.error('Http返回结果的 status 码错误，错误信息是:', response);

  if (status === 401 || data.code === 401 || data.state === 401) {
    message.error('Token过期，请退出重新登录。', 3);
    return;
  }
  message.error(errorMsg);
}
