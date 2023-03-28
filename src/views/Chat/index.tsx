import { fetchChat, type AxiosProgressEvent } from "@/api"
import { debounce } from "lodash-es"
import { FC, startTransition, useCallback, useState } from "react"
import styles from "./index.module.scss"
import ChatList from "./sub-components/chatList/ChatList"
import TextSend from "./sub-components/text-send/TextSend"
const Chat: FC = () => {
  const [result, setResult] = useState("")

  const onDownloadProgress = (e: AxiosProgressEvent) => {
    const xhr = e.event.target
    const { responseText } = xhr as { responseText: string }
    const result = responseText
      .replace(/["]/g, "")
      .replace(/\\n/g, " \n")
      .replace(/[\\]/g, '"')
    startTransition(() => {
      setResult(result)
    })
  }
  const handleSeach = useCallback(
    debounce(question => {
      fetchChat({
        question,
        onDownloadProgress,
      })
    }, 1000),
    []
  )

  return (
    <div className={styles.chatList}>
      {/* <ChatItem textContent={result} /> */}
      <ChatList textContent={result} />
      <TextSend onSearch={handleSeach} />
    </div>
  )
}

export default Chat
