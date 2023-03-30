import { useStore } from "@/store"
import { List } from "antd"
import dayjs from "dayjs"
import { FC, memo } from "react"
import ChatItem from "./ChatItem"

const ChatList: FC = () => {
  const { historyChatMap, currentChatId } = useStore()
  return (
    <List className="chatList">
      {historyChatMap[currentChatId]?.map(i => {
        return (
          <List.Item
            className={i.type === "R" ? "chat__right" : "chat__left"}
            key={i.id}>
            <List.Item.Meta
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
