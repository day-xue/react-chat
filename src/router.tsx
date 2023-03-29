import { HashRouter, useRoutes } from "react-router-dom"
import Chat from "@/views/Chat"
import Layout from "@/views/Layout"
import User from "@/views/User"
import Login from "@/views/Login"

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "user",
        element: <User />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]
const Routes = () => useRoutes(routes)
const Router = () => (
  <HashRouter>
    <Routes />
  </HashRouter>
)

export default Router
