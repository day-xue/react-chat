import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { FC } from "react"
import Router from "./router"

const App: FC = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Router />
      </StyledEngineProvider>
    </>
  )
}

export default App
