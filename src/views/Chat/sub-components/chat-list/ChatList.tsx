import { useStore } from "@/store"
import { Avatar, List } from "antd"
import dayjs from "dayjs"
import { FC, memo } from "react"
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
          <List.Item
            className={i.type === "R" ? "chat__right" : "chat__left"}
            key={i.id}>
            <List.Item.Meta
              avatar={
                i.type === "R" ? <Avatar>{username?.[0] || "游"}</Avatar> : null
              }
              description={dayjs(i.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
            />
            <div className="chat__info">
              <div className="message">
                <ChatItem
                  textContent={i.type == "L" ? i.answer! : i.question!}
                />
              </div>
            </div>
          </List.Item>
        )
      })}
    </List>
  )
}

export default memo(ChatList)
