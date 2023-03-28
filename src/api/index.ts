import { defaultInstance, type AxiosProgressEvent } from "./request"
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

export const login = (payload: { username: string; password: string }) => {
  return defaultInstance({
    url: "https://cleqy3.laf.dev/login",
    data: {
      ...payload,
    },
  })
}

export const register = (payload: {
  username: string
  password: string
  code: string
}) => {
  return defaultInstance({
    url: "https://cleqy3.laf.dev/register",
    data: {
      ...payload,
    },
  })
}
