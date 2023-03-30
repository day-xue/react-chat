import { type FC } from "react"
import styles from "./index.module.scss"
import ChatList from "./sub-components/chat-list/ChatList"
import TextSend from "./sub-components/text-send/TextSend"
const Chat: FC = () => {
  return (
    <div className={styles.chatList}>
      <ChatList />
      <TextSend />
    </div>
  )
}

export default Chat
