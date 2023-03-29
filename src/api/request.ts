import { type CreateAxiosDefaults, AxiosRequestConfig } from "axios"
import { Instance } from "./axiosClass"
const defaultOption: CreateAxiosDefaults = {
  baseURL: "https://cleqy3.laf.dev",
  timeout: 1000 * 60 * 2,
  withCredentials: true,
}

const instance$1 = new Instance(defaultOption)
instance$1.setInterceptorsReq(config => {
  return config
})
instance$1.setInterceptorsRes(res => {
  return res.data
})

export const defaultInstance = instance$1.getInstance()

export const defaultInstancePms = <REQ, RES>(
  options: AxiosRequestConfig<REQ>
): Promise<{
  success: boolean
  msg: string
  data: RES
}> => {
  return new Promise((resolve, reject) => {
    defaultInstance(options)
      .then(({ data }) => {
        if (data?.code) {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(err => {
        reject({ msg: err })
      })
  })
}
