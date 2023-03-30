import { nanoid } from "nanoid"
import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { type TabsProps } from "antd"

const initState = {
  // textContent: null,

  /** 问答记录 */
  historyChatMap: {},
  /** 用户信息 */
  userInfo: {
    avatar: null,
    username: null,
  },
  /** token */
  token: null,
  /** 当前问答id */
  currentChatId: "_chat_default",
  /** 问答key集合 */
  chatMapKeys: [
    {
      key: "_chat_default",
      label: `default`,
      children: null,
      closable: false,
    },
  ],
}
type ChartType = {
  id: string
  parentMessageId?: string
  question?: string
  answer?: string
  type: "L" | "R"
  timeStamp: number
}
type UserInfo = { username?: string | null; avatar?: string | null }

interface StoreType {
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

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initState,
        // setTextContent(textContent) {
        //   set({ textContent })
        // },
        setUserInfo(userInfo: UserInfo) {
          set({ userInfo })
        },
        setToken(token) {
          set({ token })
        },
        setChat(chatId, chatOption) {
          const { historyChatMap } = get()
          if (!historyChatMap[chatId]) historyChatMap[chatId] = []
          const answer: ChartType = {
            id: nanoid(),
            question: chatOption.question,
            type: "L",
            timeStamp: Date.now(),
          }
          historyChatMap[chatId].push(...[chatOption, answer])
          set({ historyChatMap })
        },

        setCurrentChatId(id) {
          set({ currentChatId: id })
        },
        updateCurrentChatIdAnswer(text) {
          const { historyChatMap, currentChatId } = get()
          const lastLeftIndex = historyChatMap[currentChatId].length - 1
          historyChatMap[currentChatId][lastLeftIndex].answer = text
          set({ historyChatMap })
        },
        setChatMapKeys(chatMapKeys) {
          set({
            chatMapKeys,
          })
        },
      }),
      {
        storage: createJSONStorage(() => window.sessionStorage),
        name: "_chat_persist_",
      }
    )
  )
)
