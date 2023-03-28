import { Search } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import React, { FC, memo, useRef } from "react"
type TextSendProps = {
  onSearch: (question: string) => void
}

const TextSend: FC<TextSendProps> = props => {
  const { onSearch } = props
  const questionRef = useRef<HTMLInputElement | null>(null)
  const handleSearch = () => {
    const question = questionRef.current?.value
    onSearch(question!)
  }
  return (
    <div className="text-send">
      <TextField
        className="text-area"
        label="输入您的问题..."
        variant="standard"
        inputRef={questionRef}
      />
      <IconButton
        className="search-icon"
        onClick={handleSearch}
        type="button"
        aria-label="search">
        <Search sx={{ fontSize: 25 }} />
      </IconButton>
    </div>
  )
}

export default memo(TextSend)
