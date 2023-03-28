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
    data: {
      ...restOption,
    },
    onDownloadProgress: onDownloadProgress,
  })
}
