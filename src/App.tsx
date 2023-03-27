import { FC } from "react"
import { StyledEngineProvider, CssBaseline } from "@mui/material"
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
