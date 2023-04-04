import { FC, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import TopBar from "./components/TopBar"
import styles from "./index.module.scss"

const Layout: FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === "/") navigate("/user")
  }, [])
  return (
    <main className={styles.layout}>
      <TopBar />
      <div className="content">
        <Outlet></Outlet>
      </div>
    </main>
  )
}

export default Layout
