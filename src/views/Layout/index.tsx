import { Container } from "@mui/material"
import { FC } from "react"
import { Outlet } from "react-router-dom"
import TopBar from "./components/top-bar"
import styles from "./index.module.scss"

const Layout: FC = () => {
  return (
    <>
      <Container
        className={styles.layout__wrapper}
        disableGutters
        maxWidth="sm"
        sx={{ pb: 7 }}>
        <TopBar />
        <div className="content">
          <Outlet></Outlet>
        </div>
      </Container>
    </>
  )
}

export default Layout
