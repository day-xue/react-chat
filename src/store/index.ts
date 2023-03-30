import { nanoid } from "nanoid"
import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
const initState = {
  historyChatMap: {},
  userInfo: {
    avatar: null,
    username: null,
  },
  token: null,
  textContent: null,
  currentChatId: "_chat_default",
}
type ChartType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: string
  parentMessageId?: string
  question?: string
  answer?: string
  type: "L" | "R"
  timeStamp: number
}
type UserInfo = { username?: string | null; avatar?: string | null }

interface StoreType {
  historyChatMap: { [chatId: string]: ChartType[] }
  setChat: (chatId: string, chatOption: ChartType) => void
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
  token: string | null
  setToken: (token: string) => void

  textContent: string | null
  setTextContent: (textContent: string) => void

  currentChatId: string
  setCurrentChatId: (id: string) => void

  updateCurrentChatIdAnswer: (text: string) => void
}

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initState,
        setUserInfo(userInfo = { avatar: null, username: null }) {
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
        setTextContent(textContent) {
          set({ textContent })
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
      }),
      {
        storage: createJSONStorage(() => window.sessionStorage),
        name: "_chat_persist_",
      }
    )
  )
)
