import { Search } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"
import { AxiosProgressEvent } from "axios"
import { debounce } from "lodash-es"
import { FC, startTransition, useRef, useState } from "react"
import { fetchChat } from "../../api"
import OmsSyntaxHighlight from "../../components/OmsSyntaxHighlight"
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
      <OmsSyntaxHighlight darkMode="light" textContent={result} />
    </div>
  )
}

export default Chat
