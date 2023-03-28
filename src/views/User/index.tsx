import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const User: FC = props => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/login")
  }, [])

  return <></>
}

export default User
