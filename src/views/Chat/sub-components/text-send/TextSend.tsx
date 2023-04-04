import { fetchChat, type AxiosProgressEvent } from "@/api"
import { useStore } from "@/store"
import { catchApiError } from "@/utils/catchApiError"
import { Input, message } from "antd"
import { nanoid } from "nanoid"
import { memo, useEffect, useRef, useState, type FC } from "react"
import { flushSync } from "react-dom"

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
  const {
    setChat,
    currentChatId,
    updateCurrentChatIdAnswer,
    callCount,
    setCallCount,
  } = useStore()
  const [loading, setLoading] = useState(false)
  const oldChat = useRef<{ [currentId: string]: ResChunkType }>({})
  const scrollRef = useRef<any>()
  const onDownloadProgress = (e: AxiosProgressEvent) => {
    const xhr = e.event.target
    const { responseText } = xhr
    const lastIndex = responseText.lastIndexOf("\n", responseText.length - 2)
    let chunk = responseText
    if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
    const data = JSON.parse(chunk) as ResChunkType
    // TODO: for debug
    //console.log("chunkData", data)
    oldChat.current![currentChatId] = data
    updateCurrentChatIdAnswer(data.text)
    const scrollHeight = scrollRef.current?.scrollHeight
    scrollRef.current?.scrollTo(0, scrollHeight)
  }
  useEffect(() => {
    scrollRef.current = document.querySelector(".content .chatList")
  }, [])
  const handleSearch = () => {
    if (!question.trim()) return catchApiError(new Error("请输入问题"))
    setLoading(true)
    if (callCount <= 0) {
      message.error("剩余问答次数不足，请联系管理员")
      return
    }
    flushSync(() => {
      setChat(currentChatId, {
        id: nanoid(),
        question: question.trim(),
        type: "R",
        timeStamp: Date.now(),
      })
    })
    const scrollHeight = scrollRef.current?.scrollHeight
    scrollRef.current?.scrollTo(0, scrollHeight)
    setQuestion("")
    fetchChat({
      question,
      onDownloadProgress,
      parentMessageId: oldChat.current?.[currentChatId]?.id,
      chatId: currentChatId,
    })
      .then(() => {
        setCallCount(callCount - 1)
      })
      .catch(catchApiError)
      .finally(() => {
        setLoading(false)
      })
  }

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
