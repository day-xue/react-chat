import { type CreateAxiosDefaults } from "axios"
import { Instance } from "./axiosClass"
const defaultOption: CreateAxiosDefaults = {
  baseURL: "",
  timeout: 1000 * 60 * 2,
}

const instance$1 = new Instance(defaultOption)
instance$1.setInterceptorsReq(config => {
  return config
})
instance$1.setInterceptorsRes(res => {
  return res.data
})

export const defaultInstance = instance$1.instance

export * from "axios"
