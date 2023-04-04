import OmsSyntaxHighlight from "@/components/OmsSyntaxHighlight"
import { FC, memo } from "react"

type ChatItemProps = {
  textContent: string
}

const ChatItem: FC<ChatItemProps> = props => {
  const { textContent } = props
  return (
    <div className="chatItem">
      <OmsSyntaxHighlight darkMode="dark" textContent={textContent} />
    </div>
  )
}

export default memo(ChatItem)
