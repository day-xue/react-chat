import { Search } from "@mui/icons-material"
import { FormControl, IconButton, InputLabel, Input } from "@mui/material"
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
      <FormControl className="text-form" variant="standard">
        <InputLabel htmlFor="outlined-question">输入问题</InputLabel>
        <Input
          id="outlined-question"
          inputRef={questionRef}
          className="text-area"
          endAdornment={
            <IconButton
              className="search-icon"
              onClick={handleSearch}
              type="button"
              aria-label="search">
              <Search sx={{ fontSize: 25 }} />
            </IconButton>
          }
        />
      </FormControl>
    </div>
  )
}

export default memo(TextSend)
