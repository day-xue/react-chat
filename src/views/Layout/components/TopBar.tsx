/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useStore } from "@/store"
import { Avatar, Tabs } from "antd"
import { nanoid } from "nanoid"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const ExtraAvatar: FC = () => {
  const {
    userInfo: { username, avatar },
  } = useStore()

  const navigate = useNavigate()

  return (
    <div className="tab__extra" onClick={() => navigate("/user")}>
      {avatar ? (
        <Avatar src={avatar} className="user__avatar" />
      ) : (
        <Avatar className="user__avatar">
          {username?.slice(0, 2) || "游"}
        </Avatar>
      )}
    </div>
  )
}
const TopBar: FC = () => {
  const { setCurrentChatId, chatMapKeys, setChatMapKeys } = useStore()
  const [activeKey, setActiveKey] = useState("_chat_default")
  const navigate = useNavigate()

  const handleAdd = () => {
    const chatId = `_chat_${nanoid(5)}`
    const len = chatMapKeys!.length
    const newItem = {
      key: chatId,
      label: `chat_${len}`,
      children: null,
    }
    chatMapKeys!.push(newItem)
    setChatMapKeys([...chatMapKeys!])
    setCurrentChatId(chatId)
    setActiveKey(chatId)
  }

  const handleRemove = (targetKey: TargetKey) => {
    const lastIndex = chatMapKeys!.findIndex(i => i.key === targetKey) - 1
    const newChatItems = chatMapKeys!.filter(i => i.key !== targetKey)
    setChatMapKeys(newChatItems)
    if (targetKey == activeKey && lastIndex >= 0)
      setActiveKey(newChatItems[lastIndex].key)
  }

  const handleActive = (key: string) => {
    setActiveKey(key)
    setCurrentChatId(key)
  }

  const handleEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    action == "add" ? handleAdd() : handleRemove(targetKey)
  }

  return (
    <section className="tabs">
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        items={chatMapKeys}
        onChange={handleActive}
        onTabClick={() => {
          if (location.pathname !== "/chat") navigate("/chat")
        }}
        onEdit={handleEdit}
        tabBarExtraContent={<ExtraAvatar />}
      />
    </section>
  )
}

export default TopBar
