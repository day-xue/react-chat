import { List, ListItem } from "@mui/material"
import { FC, memo } from "react"
import ChatItem from "./ChatItem"
type ChatListProps = {
  textContent: string
}
const ChatList: FC<ChatListProps> = props => {
  const { textContent } = props
  return (
    <List className="chatList">
      <ListItem button>
        {/* <ListItemAvatar>
          <Avatar
            alt="Profile Picture"
            src="https://cleqy3-avatar.site.laf.dev/defaultAvatar.jpeg"
          />
        </ListItemAvatar> */}
        <ChatItem textContent={textContent} />
      </ListItem>
    </List>
  )
}

export default memo(ChatList)
