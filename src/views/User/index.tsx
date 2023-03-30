import { useStore } from "@/store"
import { Avatar, Button, Typography } from "antd"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const { Title } = Typography

const User: FC = () => {
  const navigate = useNavigate()
  const {
    userInfo: { avatar, username },
    setUserInfo,
  } = useStore()

  return (
    <main className={styles.user__wrapper}>
      {avatar ? (
        <Avatar src={avatar} className="user__avatar" />
      ) : (
        <Avatar className="user__avatar">
          {username?.slice(0, 2) || "游"}
        </Avatar>
      )}
      <Title level={5} className="name">
        {username || "游客"}
      </Title>
      {!username ? (
        <div>
          <Button type="primary" onClick={() => navigate("/login")}>
            去登录
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="primary"
            onClick={() => {
              setUserInfo({ username: "", avatar: "" })
              navigate("/login")
            }}>
            退出账号
          </Button>
        </div>
      )}
    </main>
  )
}

export default User
