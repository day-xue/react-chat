import { type TabsProps } from "antd"

export type UserInfo = {
  username?: string | null
  avatar?: string | null
  callCount?: number | null
}

export type ChartType = {
  id: string
  parentMessageId?: string
  question?: string
  answer?: string
  type: "L" | "R"
  timeStamp: number
}

export interface StoreType {
  // textContent: string | null
  // setTextContent: (textContent: string) => void
  historyChatMap: { [chatId: string]: ChartType[] }
  setChat: (chatId: string, chatOption: ChartType) => void
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void

  token: string | null
  setToken: (token: string | null) => void

  currentChatId: string
  setCurrentChatId: (id: string) => void

  chatMapKeys: TabsProps["items"]
  setChatMapKeys: (chatMapKeys: TabsProps["items"]) => void

  updateCurrentChatIdAnswer: (text: string) => void
}
