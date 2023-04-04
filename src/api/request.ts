import { type CreateAxiosDefaults } from "axios"
import { Instance } from "./axiosClass"

const defaultOption: CreateAxiosDefaults = {
  baseURL: "https://cleqy3.laf.dev",
  timeout: 6000,
}

const instance$1 = new Instance(defaultOption)

instance$1.setInterceptorsReq(config => {
  return config
})
instance$1.setInterceptorsRes(res => {
  const { code, msg, data } = res.data || {}
  if (code === 3) {
    location.href = "#/login"
    // 兼容Error对象
    return Promise.reject({ message: msg })
  } else if (code === 0) {
    return Promise.reject({ message: msg })
  }
  return data
})

export const defaultInstance = instance$1.getInstance()
