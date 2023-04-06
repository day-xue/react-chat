import axios, {
  type AxiosInstance,
  type AxiosInterceptorManager,
  type AxiosInterceptorOptions,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from "axios"

export class Instance {
  private instance: AxiosInstance
  constructor(options?: CreateAxiosDefaults) {
    this.instance = axios.create(options)
  }
  setInterceptorsReq = (
    onFulfilled: Parameters<
      AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]
    >[0],
    onRejected?: Parameters<
      AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]
    >[1],
    options?: AxiosInterceptorOptions
  ) => {
    this.instance.interceptors.request.use(onFulfilled, onRejected, options)
  }
  setInterceptorsRes = (
    onFulfilled: Parameters<AxiosInterceptorManager<AxiosResponse>["use"]>[0],
    onRejected?: Parameters<AxiosInterceptorManager<AxiosResponse>["use"]>[1],
    options?: AxiosInterceptorOptions
  ) => {
    this.instance.interceptors.response.use(onFulfilled, onRejected, options)
  }
  getInstance = () => {
    return this.instance
  }
}
