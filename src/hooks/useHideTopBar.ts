import { useEffect } from "react"

export default function () {
  useEffect(() => {
    ;(document.querySelector(".isLogin__check") as HTMLInputElement).checked =
      true
    return () => {
      ;(document.querySelector(".isLogin__check") as HTMLInputElement).checked =
        false
    }
  }, [])
}
