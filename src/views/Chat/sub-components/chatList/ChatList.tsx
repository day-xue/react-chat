import { useStore } from "@/store"
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import { FC, memo } from "react"
import AiAvatar from "../ai-avatar"
import ChatItem from "./ChatItem"

const ChatList: FC = () => {
  const {
    userInfo: { username },
    historyChatMap,
    currentChatId,
  } = useStore()
  return (
    <List className="chatList">
      {historyChatMap[currentChatId]?.map(i => {
        return (
          <ListItem
            className={i.type === "R" ? "chat__right" : "chat__left"}
            key={i.id}>
            <ListItemAvatar className="avatar__wrapper">
              {i.type === "L" ? (
                <Avatar
                  className="avatar"
                  sx={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "10px",
                  }}>
                  {username?.[0] || "游"}
                </Avatar>
              ) : (
                <AiAvatar />
              )}
            </ListItemAvatar>
            <div className="chat__info">
              <ListItemText
                className="timeStamp"
                sx={{ fontSize: 12 }}
                primary={i.timeStamp}
              />
              <div className="message">
                <ChatItem
                  textContent={i.type == "L" ? i.answer! : i.question!}
                />
              </div>
            </div>
          </ListItem>
        )
      })}
    </List>
  )
}

export default memo(ChatList)
