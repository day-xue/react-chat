/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useStore, StoreType } from "@/store"
import { Avatar, Tabs, Popover } from "antd"
import { nanoid } from "nanoid"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../index.module.scss"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const topBarStoreSelector = (s: StoreType) => {
  return {
    setCurrentChatId: s.setCurrentChatId,
    chatMapKeys: s.chatMapKeys,
    setChatMapKeys: s.setChatMapKeys,
  }
}

const Select = () => {
  const navigate = useNavigate()

  const {
    userInfo: { username },
    setUserInfo,
    setToken,
  } = useStore()

  return (
    <div className={styles.select__wrapper}>
      <div className="select__item" onClick={() => navigate("/user")}>
        个人中心
      </div>
      <div
        className="select__item"
        onClick={() => {
          setUserInfo({ username: null, avatar: null })
          setToken(null)
          navigate("/login")
        }}>
        {username ? "退出登录" : "去登录"}
      </div>
    </div>
  )
}
const ExtraAvatar: FC = () => {
  const {
    userInfo: { username, avatar },
  } = useStore()

  return (
    <Popover
      placement="bottomRight"
      content={Select}
      trigger="hover"
      overlayInnerStyle={{ padding: 5 }}>
      <div className="tab__extra">
        {avatar ? (
          <Avatar src={avatar} className="user__avatar" />
        ) : (
          <Avatar className="user__avatar">
            {username?.slice(0, 2) || "游"}
          </Avatar>
        )}
      </div>
    </Popover>
  )
}
const TopBar: FC = () => {
  const { setCurrentChatId, chatMapKeys, setChatMapKeys } =
    useStore(topBarStoreSelector)
  const [activeKey, setActiveKey] = useState("")
  const navigate = useNavigate()

  const handleAdd = () => {
    const chatId = `_chat_${nanoid(5)}`
    const newItem = {
      key: chatId,
      label: chatId,
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
    let newActiveKey: TargetKey = "_chat_default"
    if (targetKey == activeKey && lastIndex >= 0) {
      newActiveKey = newChatItems[lastIndex].key
    }
    setActiveKey(newActiveKey)
    setCurrentChatId(newActiveKey)
  }

  const handleActive = (key: string) => {
    setActiveKey(key)
    setCurrentChatId(key)
  }

  const handleEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    action == "add" ? handleAdd() : handleRemove(targetKey)
  }

  return (
    <>
      <input type="checkbox" className="isLogin__check" />
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
    </>
  )
}

export default TopBar
