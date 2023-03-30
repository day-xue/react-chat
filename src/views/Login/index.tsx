import { FC, useState } from "react"
import styles from "./index.module.scss"
import { useNavigate } from "react-router-dom"
import { loginApi, registerApi } from "@/api"
import { useStore } from "@/store"
import { Form, Button, Input, Typography, message } from "antd"
import { LockOutlined, UserOutlined, GlobalOutlined } from "@ant-design/icons"
import { useRequest } from "ahooks"

const { Title } = Typography

const Footer = ({
  formType,
  setFormType,
}: {
  formType: "login" | "register"
  setFormType: (formType: "login" | "register") => void
}) => {
  return (
    <div className="footer">
      {formType === "login" ? (
        <>
          <Title level={5}>还没有账号?</Title>
          <Button onClick={() => setFormType("register")} type="link">
            去注册
          </Button>
        </>
      ) : (
        <Button onClick={() => setFormType("login")} type="link">
          返回登录
        </Button>
      )}
    </div>
  )
}

const Login: FC = () => {
  const { setToken, setUserInfo } = useStore()
  const [formType, setFormType] = useState<"login" | "register">("login")
  const navigate = useNavigate()

  const loginAction = useRequest(loginApi, {
    manual: true,
  })

  const registerAction = useRequest(registerApi, {
    manual: true,
  })

  const onFinish = (values: any) => {
    const { username, activeCode, password } = values

    if (formType === "login") {
      loginAction
        .runAsync({
          username,
          password,
        })
        .then(({ token, username, avatar }) => {
          setToken(token)
          setUserInfo({
            username,
            avatar,
          })
          message.success("登录成功")
          navigate("/user")
        })
        .catch((err: Error) => {
          message.error(err.message)
        })
    } else {
      registerAction
        .runAsync({
          username,
          password,
          activeCode,
        })
        .then(() => {
          message.success("注册成功")
          setFormType("login")
        })
        .catch((err: Error) => {
          message.error(err.message)
        })
    }
  }

  return (
    <div className={styles.login}>
      <Title level={3} className="title">
        登录 <span style={{ fontWeight: 700, lineHeight: 1 }}>/</span> 注册
      </Title>

      <Form
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {formType === "register" && (
          <Form.Item
            name="activeCode"
            rules={[{ required: true, message: "请输入激活码!" }]}>
            <Input
              prefix={<GlobalOutlined className="site-form-item-icon" />}
              placeholder="ActiveCode"
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginAction.loading || registerAction.loading}>
            {formType === "login" ? "登录" : "注册"}
          </Button>
          <Footer formType={formType} setFormType={setFormType} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
