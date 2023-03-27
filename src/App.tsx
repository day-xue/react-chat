import axios from "axios"
import { debounce } from "lodash-es"
import React, { FC, startTransition, useEffect, useState } from "react"
import { Remarkable } from "remarkable"

const md = new Remarkable()
const App: FC = props => {
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
    <div>
      <input
        type="text"
        onBlur={e => {
          setInput(e.target.value)
          setSearch(true)
        }}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: md.render(result) }} /> */}
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  )
}

export default App
