import { Search } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"
import axios, { AxiosProgressEvent } from "axios"
import { debounce } from "lodash-es"
import React, { FC, startTransition, useRef, useState } from "react"
import OmsSyntaxHighlight from "../../components/OmsSyntaxHighlight"
type FetchChatOption = {
  question: string
  parentMessageId?: string
  onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
}

const fetchChat = (option: FetchChatOption) => {
  axios.post(
    "https://cleqy3.laf.dev/chat",
    {
      question: option.question,
    },
    {
      onDownloadProgress: option.onDownloadProgress,
    }
  )
}
const Chat: FC = () => {
  const [result, setResult] = useState("")
  const questionRef = useRef<HTMLInputElement | null>(null)

  const onDownloadProgress = (e: AxiosProgressEvent) => {
    const xhr = e.event.target
    const { responseText } = xhr as { responseText: string }
    const result = responseText
      .replace(/["]/g, "")
      .replace(/\\n/g, " \n ")
      .replace(/[\\]/g, '"')
    startTransition(() => {
      setResult(result)
    })
  }
  const handleSeach = debounce(() => {
    const question = questionRef.current?.value
    fetchChat({
      question: question!,
      onDownloadProgress,
    })
  }, 1000)
  return (
    <div style={{ overflow: "auto", paddingBottom: "50px" }}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          //id="standard-basic"
          label="输入您的问题..."
          variant="standard"
          inputRef={questionRef}
        />
        <IconButton
          sx={{ padding: 0 }}
          onClick={handleSeach}
          type="button"
          aria-label="search">
          <Search sx={{ fontSize: 25 }} />
        </IconButton>
      </Box>
      <OmsSyntaxHighlight darkMode="dark" textContent={result} />
    </div>
  )
}

export default Chat
