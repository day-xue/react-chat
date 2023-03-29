import { type AxiosProgressEvent } from "axios"
import { defaultInstance } from "./request"
type FetchChatOption = {
  question: string
  parentMessageId?: string
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
}

export const fetchChat = (option: FetchChatOption) => {
  const { onDownloadProgress, ...restOption } = option
  return defaultInstance({
    url: "/chat",
    method: "POST",
    data: {
      ...restOption,
    },
    onDownloadProgress: onDownloadProgress,
  })
}

export const login = (payload: { username: string; password: string }) => {
  return defaultInstance({
    url: "/login",
    method: "POST",
    data: {
      ...payload,
    },
  })
}

export const registerApi = (payload: {
  username: string
  password: string
  code: string
}) => {
  return defaultInstance({
    url: "/register",
    method: "POST",
    data: {
      ...payload,
    },
  })
}
export * from "axios"
