import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material"
import { FC, useState } from "react"
import styles from "./index.module.scss"
import { useNavigate } from "react-router-dom"
type UserForm = {
  username: string
  password: string
  code: string
}

const Login: FC = props => {
  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    password: "",
    code: "",
  })
  const [formType, setFormType] = useState<"login" | "register">("login")
  const navigate = useNavigate()
  const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value
    setUserForm({
      ...userForm,
      username,
    })
  }
  const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setUserForm({
      ...userForm,
      password,
    })
  }
  const setCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value
    setUserForm({
      ...userForm,
      code,
    })
  }
  const renderFooter = () => {
    if (formType === "login")
      return (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">还没有账号?</Typography>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{ color: "#1976d2" }}
            onClick={() => setFormType("register")}>
            去注册
          </Typography>
        </Box>
      )

    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="button"
          display="block"
          gutterBottom
          sx={{ color: "#1976d2" }}
          onClick={() => setFormType("login")}>
          返回登录
        </Typography>
      </Box>
    )
  }
  const handleClick = () => {
    if (formType === "login") {
      const { username, password } = userForm
      fetch("https://cleqy3.laf.dev/login", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(res => {
          if (res?.success) {
            navigate("/user")
            return
          }
          console.error(res.msg)
        })
    } else {
      const { username, password, code } = userForm
      fetch("https://cleqy3.laf.dev/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          code,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res?.success) {
            setFormType("login")
            return
          }
          console.error(res.msg)
        })
    }
  }
  return (
    <Container maxWidth={false} className={styles.login__wrapper}>
      <main>
        <Typography component="h1" sx={{ fontSize: 26, mb: 4 }}>
          <b>登录 / 注册</b>
        </Typography>

        <FormControl fullWidth>
          <FormLabel>用户名</FormLabel>
          <Input
            margin="none"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={userForm?.username}
            onChange={setUsername}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel>密码</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={userForm?.password}
            onChange={setPassword}
          />
        </FormControl>
        {formType === "register" && (
          <FormControl fullWidth margin="normal">
            <FormLabel>激活码</FormLabel>
            <Input
              name="code"
              type="code"
              placeholder="123456"
              value={userForm?.code}
              onChange={setCode}
            />
          </FormControl>
        )}

        <Button
          fullWidth
          sx={{ mt: 4, mb: 3 }}
          variant="contained"
          onClick={handleClick}>
          {formType === "login" ? "登录" : "注册"}
        </Button>
        {renderFooter()}
      </main>
    </Container>
  )
}

export default Login
