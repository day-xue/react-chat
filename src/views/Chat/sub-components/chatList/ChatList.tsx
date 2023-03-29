import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import { FC, memo } from "react"
import ChatItem from "./ChatItem"
import dayjs from "dayjs"
import { useStore } from "@/store"
import AiAvatar from "../ai-avatar"
type ChatListProps = {
  textContent: string
}
const test = [
  {
    uuid: "1",
    timeStamp: dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
    type: "req",
    content: "<span>reqreqreqreqreqreqreqreqreqreqreqreqreqreqreqreq</span>",
  },
  {
    uuid: "2",
    timeStamp: dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
    type: "res",
    content:
      "<span>resresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresresres</span>",
  },
]

const ChatList: FC<ChatListProps> = props => {
  const { textContent } = props
  const {
    userInfo: { username },
  } = useStore()

  return (
    <List className="chatList">
      {test.map(i => {
        return (
          <ListItem
            className={i.type === "req" ? "chat__right" : "chat__left"}
            key={i.uuid}>
            <ListItemAvatar className="avatar__wrapper">
              {i.type === "req" ? (
                <Avatar
                  className="avatar"
                  sx={{ width: "32px", height: "32px", marginLeft: "10px" }}>
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
                <ChatItem textContent={i.content} />
              </div>
            </div>
          </ListItem>
        )
      })}
    </List>
  )
}

export default memo(ChatList)
