import React, { FC, startTransition, useEffect, useState } from "react"
import { TextField } from "@mui/material"
import axios from "axios"
import { debounce } from "lodash-es"

const Chat: FC = () => {
  const [result, setResult] = useState("")
  const [input, setInput] = useState("")
  const [search, setSearch] = useState(false)

  useEffect(() => {
    const co = new AbortController()
    const fetchChat = debounce(() => {
      axios.post(
        "https://cleqy3.laf.dev/chat",
        {
          question: input,
        },
        {
          onDownloadProgress: e => {
            const xhr = e.event.target
            const { responseText } = xhr as { responseText: string }
            const result = responseText.replace(/["]/g, "")

            startTransition(() => {
              setResult(result)
            })
          },
          signal: co.signal,
        }
      )
    }, 1000)
    if (search) fetchChat()
    return () => {
      co.abort()
    }
  }, [search])
  return (
    <>
      <TextField
        id="standard-basic"
        label="输入您的问题..."
        variant="standard"
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value)
          setSearch(true)
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </>
  )
}

export default Chat
