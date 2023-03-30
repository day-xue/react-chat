import { FC } from "react"
import { Outlet } from "react-router-dom"
import TopBar from "./components/top-bar"
import styles from "./index.module.scss"

const Layout: FC = () => {
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
