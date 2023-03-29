import { useStore } from "@/store"
import { Avatar, Button, Typography } from "@mui/material"
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const User: FC = props => {
  const navigate = useNavigate()
  const {
    userInfo: { avatar, username },
  } = useStore()
  // useEffect(() => {}, [])

  return (
    <main className={styles.user__wrapper}>
      {avatar ? (
        <Avatar className="avatar" src={avatar} />
      ) : (
        <Avatar className="avatar">{username?.slice(0, 2) || "游"}</Avatar>
      )}
      <Typography variant="h6" gutterBottom className="name">
        {username || "游客"}
      </Typography>
      <div>
        <Button onClick={() => navigate("/login")}>GO TO LOGIN 👉🏻</Button>
      </div>
    </main>
  )
}

export default User
