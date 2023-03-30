import { fetchChat, type AxiosProgressEvent } from "@/api"
import { useStore } from "@/store"
import { debounce } from "lodash-es"
import { nanoid } from "nanoid"
import { memo, useRef, useState, type FC } from "react"
import { flushSync } from "react-dom"
import { Input, message } from "antd"

const { Search } = Input
type ResChunkType = {
  role: string
  id: string
  parentMessageId: string
  text: string
  delta: string
  detail: {
    id: string
    object: string
    created: number
    choices: Array<{
      delta: { content: string }
      finish_reason: string | null
      index: number
    }>
    model: string
  }
}
const TextSend: FC = () => {
  const [question, setQuestion] = useState("")
  const { setChat, currentChatId, updateCurrentChatIdAnswer } = useStore()
  const [loading, setLoading] = useState(false)
  const oldChat = useRef<{ [currentId: string]: ResChunkType }>({})

  const onDownloadProgress = (e: AxiosProgressEvent) => {
    const xhr = e.event.target
    const { responseText } = xhr
    const lastIndex = responseText.lastIndexOf("\n", responseText.length - 2)
    let chunk = responseText
    if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
    const data = JSON.parse(chunk) as ResChunkType
    // TODO: for debug
    console.log("chunkData", data)
    oldChat.current![currentChatId] = data
    updateCurrentChatIdAnswer(data.text)
  }

  const handleSearch = debounce(() => {
    setLoading(true)
    flushSync(() => {
      setChat(currentChatId, {
        id: nanoid(),
        question,
        type: "R",
        timeStamp: Date.now(),
      })
    })
    setQuestion("")
    fetchChat({
      question,
      onDownloadProgress,
      parentMessageId: oldChat.current?.[currentChatId]?.id,
      chatId: currentChatId,
    })
      .then(() => {
        console.log("ok")
      })
      .catch(() => {
        message.error("请先登录")
      })
      .finally(() => {
        setLoading(false)
      })
  }, 1000)

  return (
    <div className="text-send">
      <Search
        placeholder="请输入问题..."
        loading={loading}
        value={question}
        onChange={v => setQuestion(v.target.value)}
        onSearch={handleSearch}
      />
    </div>
  )
}

export default memo(TextSend)
