import ReactDOM from "react-dom/client"
import vConsole from "vconsole"
import App from "./App"
import "./reset.css"
new vConsole()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
)
