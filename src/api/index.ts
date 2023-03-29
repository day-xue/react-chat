import { type AxiosProgressEvent } from "axios"
import { defaultInstance, defaultInstancePms } from "./request"
type FetchChatOption = {
  question: string
  parentMessageId?: string
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
}

export const fetchChat = (option: FetchChatOption) => {
  const { onDownloadProgress, ...restOption } = option
  return defaultInstance({
    url: "https://cleqy3.laf.dev/chat",
    method: "POST",
    data: {
      ...restOption,
    },
    onDownloadProgress: onDownloadProgress,
  })
}

export const loginApi = (payload: { username: string; password: string }) => {
  return defaultInstancePms<typeof payload, undefined>({
    url: "https://cleqy3.laf.dev/login",
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
  return defaultInstancePms<typeof payload, undefined>({
    url: "https://cleqy3.laf.dev/register",
    data: {
      ...payload,
    },
  })
}
export * from "axios"
