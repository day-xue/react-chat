/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useStore } from "@/store"
import { Button, Tabs, type TabsProps } from "antd"
import { nanoid } from "nanoid"
import { FC, useState } from "react"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const TopBar: FC = () => {
  const { setCurrentChatId } = useStore()
  const [activeKey, setActiveKey] = useState("_chat_default")
  const [chatItems, setChatItems] = useState<TabsProps["items"]>([
    {
      key: "_chat_default",
      label: `default`,
      children: null,
      closable: false,
    },
  ])
  const handleAdd = () => {
    const chatId = `_chat_${nanoid(5)}`
    const len = chatItems!.length
    const newItem = {
      key: chatId,
      label: `chat_${len}`,
      children: null,
    }
    chatItems!.push(newItem)

    setChatItems([...chatItems!])
    setCurrentChatId(chatId)
    setActiveKey(chatId)
  }
  const handleRemove = (targetKey: TargetKey) => {
    const lastIndex = chatItems!.findIndex(i => i.key === targetKey) - 1
    const newChatItems = chatItems!.filter(i => i.key !== targetKey)
    setChatItems(newChatItems)
    if (targetKey == activeKey && lastIndex >= 0)
      setActiveKey(newChatItems[lastIndex].key)
  }
  const handleTabsChange = (key: string) => {
    console.log(key)
    setActiveKey(key)
  }
  const hanleTabClik = (targetKey: TargetKey, action: "add" | "remove") => {
    action == "add" ? handleAdd() : handleRemove(targetKey)
  }
  return (
    <Tabs
      type="editable-card"
      activeKey={activeKey}
      items={chatItems}
      onChange={handleTabsChange}
      onEdit={hanleTabClik}
      tabBarExtraContent={<Button>User 占位</Button>}
    />
  )
}

export default TopBar
