import { fetchChat, type AxiosProgressEvent } from "@/api"
import { useStore } from "@/store"
import { Search } from "@mui/icons-material"
import { FormControl, IconButton, Input, InputLabel } from "@mui/material"
import { debounce } from "lodash-es"
import { nanoid } from "nanoid"
import { memo, useRef, useState, type FC } from "react"
import { flushSync } from "react-dom"
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

  const chatOptions = useRef<ResChunkType | null>(null)
  const onDownloadProgress = (e: AxiosProgressEvent) => {
    const xhr = e.event.target
    const { responseText } = xhr
    const lastIndex = responseText.lastIndexOf("\n", responseText.length - 2)
    let chunk = responseText
    if (lastIndex !== -1) chunk = responseText.substring(lastIndex)
    const data = JSON.parse(chunk) as ResChunkType
    console.log(data)
    updateCurrentChatIdAnswer(data.text)
  }
  const handleSearch = debounce(() => {
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
      parentMessageId: chatOptions.current?.id,
    }).then(() => {
      console.log("ok")
      /* const { id, parentMessageId, text } = chatOptions.current!
      console.log(chatOptions.current)
      setChat(currentChatId, {
        id,
        parentMessageId,
        question,
        answer: text,
        type: "L",
        timeStamp: Date.now(),
      }) */
    })
  }, 1000)

  return (
    <div className="text-send">
      <FormControl className="text-form" variant="standard">
        <InputLabel htmlFor="outlined-question">输入问题</InputLabel>
        <Input
          id="outlined-question"
          value={question}
          onChange={v => setQuestion(v.target.value)}
          className="text-area"
          endAdornment={
            <IconButton
              className="search-icon"
              onClick={handleSearch}
              type="button"
              aria-label="search">
              <Search />
            </IconButton>
          }
        />
      </FormControl>
    </div>
  )
}

export default memo(TextSend)
