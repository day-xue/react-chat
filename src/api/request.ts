import { AxiosRequestConfig, type CreateAxiosDefaults } from "axios"
import { Instance } from "./axiosClass"

const defaultOption: CreateAxiosDefaults = {
  baseURL: "https://cleqy3.laf.dev",
  timeout: 1000 * 60 * 2,
}

const instance$1 = new Instance(defaultOption)

instance$1.setInterceptorsReq(config => {
  return config
})
instance$1.setInterceptorsRes(res => {
  return res.data
})

export const defaultInstance = instance$1.getInstance()

type AxiosResponse<T> = {
  code: 0 | 1
  msg: string
  data: T
}

export const fetchApi = <T, R>(options: AxiosRequestConfig<T>): Promise<R> => {
  return new Promise((resolve, reject) => {
    defaultInstance<T, AxiosResponse<R>>(options)
      .then(res => {
        const { code, msg, data } = res
        if (code === 1) {
          resolve(data)
        } else {
          reject({ message: msg })
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
