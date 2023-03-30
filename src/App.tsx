import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Router from "./router"
const App: FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/chat")
  }, [])
  return (
    <>
      <Router />
    </>
  )
}

export default App
