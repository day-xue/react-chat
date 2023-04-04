import { getToken } from "@/utils/getToken"
import { type AxiosProgressEvent } from "axios"
import { defaultInstance, fetchApi } from "./request"

type FetchChatOption = {
  question: string
  parentMessageId?: string
  messageId?: string
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  chatId: string
}

export const fetchChat = (option: FetchChatOption) => {
  const { onDownloadProgress, ...restOption } = option

  return defaultInstance({
    url: "/chat",
    method: "POST",
    data: {
      ...restOption,
    },
    headers: {
      Authorization: getToken(),
    },
    onDownloadProgress: onDownloadProgress,
    timeout: 1000 * 60 * 2,
  })
}

export const loginApi = (payload: { username: string; password: string }) => {
  return fetchApi<
    typeof payload,
    {
      token: string
    }
  >({
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
  activeCode: string
}) => {
  return fetchApi<typeof payload, undefined>({
    url: "/register",
    method: "POST",
    data: {
      ...payload,
    },
  })
}

export const userInfoApi = () => {
  return fetchApi<
    undefined,
    {
      userInfo?: {
        username?: string
        callCount: number
        avatar?: string
      }
    }
  >({
    url: "/userInfo",
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  })
}

export * from "axios"
