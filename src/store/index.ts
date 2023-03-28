import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
const initState = {
  historyChatMap: {},
}
type ChartType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uuid: string
  question?: any
  answer?: any
  type: "L" | "R"
  timeStamp: number
}
interface StoreType {
  historyChatMap: { [namespace: string]: ChartType }
  add?: (value: ChartType) => void
}

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        ...initState,
      }),
      {
        storage: createJSONStorage(() => window.sessionStorage),
        name: "_chat_persist_",
      }
    )
  )
)
