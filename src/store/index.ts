import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
const initState = {
  historyChatMap: {},
  userInfo: {
    avatar: null,
    username: null,
  },
  token: null,
}
type ChartType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uuid: string
  question?: any
  answer?: any
  type: "L" | "R"
  timeStamp: number
}
type UserInfo = { username: string | null; avatar: string | null }

interface StoreType {
  historyChatMap: { [namespace: string]: ChartType }
  add?: (value: ChartType) => void
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
  token: string | null
  setToken: (token: string) => void
}

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initState,
        setUserInfo(userInfo: UserInfo) {
          set({ userInfo })
        },
        setToken(token: string) {
          set({ token })
        },
      }),
      {
        storage: createJSONStorage(() => window.sessionStorage),
        name: "_chat_persist_",
      }
    )
  )
)
