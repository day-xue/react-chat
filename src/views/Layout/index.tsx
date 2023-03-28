import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ChatIcon from "@mui/icons-material/Chat"
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
} from "@mui/material"
import { FC, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const RouterMap = {
  "0": "/chat",
  "1": "/user",
}

const Layout: FC = () => {
  const [nav, setNav] = useState<"0" | "1">("0")
  const navigate = useNavigate()

  useEffect(() => {
    navigate(RouterMap[nav])
  }, [nav])

  return (
    <>
      <Container className={styles.layout__wrapper}>
        <Outlet></Outlet>

        <Paper elevation={3} className={styles.bottom__wrapper}>
          <BottomNavigation
            showLabels
            value={nav}
            onChange={(_, v) => {
              setNav(v)
            }}>
            <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
            <BottomNavigationAction label="My" icon={<AccountCircleIcon />} />
          </BottomNavigation>
        </Paper>
      </Container>
    </>
  )
}

export default Layout
