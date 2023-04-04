import { userInfoApi } from "@/api"
import { useStore } from "@/store"
import { catchApiError } from "@/utils/catchApiError"
import { useEffect } from "react"

export default function () {
  const { setUserInfo } = useStore()

  const refreshUserInfo = () => {
    userInfoApi()
      .then(res => {
        const { avatar, username, callCount } = res.userInfo || {}
        setUserInfo({
          avatar,
          username,
          callCount,
        })
      })
      .catch(catchApiError)
  }

  useEffect(() => {
    refreshUserInfo()
  }, [])

  return {
    refreshUserInfo,
  }
}
