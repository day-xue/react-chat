import { useRoutes } from "react-router-dom"
import Chat from "@/views/Chat"
import { BrowserRouter } from "react-router-dom"
import Layout from "@/views/Layout"

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "user",
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]
const Routes = () => useRoutes(routes)
const Router = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)

export default Router
