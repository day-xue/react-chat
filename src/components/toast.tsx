import { createRoot } from "react-dom/client"
import { ReactElement } from "react"
import Snackbar from "@mui/material/Snackbar"

const renderNodeToRoot = (node: ReactElement, container: HTMLElement) => {
  const root = createRoot(container)
  if ("render" in root) {
    root.render(node)
  } else {
    console.error(
      "Your React version is too low, Do not support root.render api!"
    )
  }
}

const toast = (msg: string) => {
  const container = document.createElement("div")
  document.body.appendChild(container)
  const unmount = () => {
    const pNode = container && container.parentNode
    if (pNode) {
      pNode.removeChild(container)
    }
  }
  renderNodeToRoot(
    <Snackbar
      open={true}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={1000}
      onClose={unmount}
      message={msg}
    />,
    container
  )
}
export default toast
