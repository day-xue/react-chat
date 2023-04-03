import { useStore } from "@/store"
import { Avatar, Button, Tag, Typography, Tooltip } from "antd"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const { Title } = Typography

const User: FC = () => {
  const navigate = useNavigate()
  const {
    userInfo: { avatar, username },
    setToken,
    setUserInfo,
    callCount,
    setCallCount,
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
      <Tag
        color="magenta"
        className="user__leftTimes"
        icon={
          <Tooltip
            placement="top"
            title={"登录后每日使用次数最多可达100次!"}
            color="magenta">
            <ExclamationCircleOutlined />
          </Tooltip>
        }>
        剩余使用次数: {callCount || 0}次
      </Tag>

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
              setUserInfo({ username: null, avatar: null })
              setToken(null)
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
