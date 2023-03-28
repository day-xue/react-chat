import axios, {
  type AxiosInstance,
  type AxiosInterceptorManager,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
} from "axios"

export class Instance {
  instance: AxiosInstance
  constructor(options?: CreateAxiosDefaults) {
    this.instance = axios.create(options)
  }
  setInterceptorsReq = (
    useCB: Parameters<
      AxiosInterceptorManager<InternalAxiosRequestConfig>["use"]
    >[0]
  ) => {
    this.instance.interceptors.request.use(useCB)
  }
  setInterceptorsRes = (
    useCB: Parameters<AxiosInterceptorManager<AxiosResponse>["use"]>[0]
  ) => {
    this.instance.interceptors.response.use(useCB)
  }
}
