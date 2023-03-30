import { FC, MouseEvent, useState } from "react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Input,
  Popover,
  Typography,
} from "@mui/material"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import { useStore } from "@/store"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import { useNavigate } from "react-router-dom"

const TopBar: FC = () => {
  const {
    userInfo: { avatar, username },
  } = useStore()

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpBtnClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <section className="topBar">
      <AppBar position="static">
        <Toolbar>
          <div onClick={handleOpBtnClick} className="add__wrapper">
            <AddOutlinedIcon className="addIcon" />
          </div>

          <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            <Typography sx={{ p: "6px" }}>
              <Input
                size="small"
                endAdornment={
                  <div style={{ padding: "4px" }}>
                    <CheckRoundedIcon color="action" />
                  </div>
                }
              />
            </Typography>
          </Popover>

          <Box className="searchBar">
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              chat1
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              chat2
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              chat3
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              chat4
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              chat5
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }} onClick={() => navigate("/user")}>
            {avatar ? (
              <Avatar
                className="avatar"
                src={avatar}
                sx={{ width: "24px", height: "24px" }}
              />
            ) : (
              <Avatar
                className="avatar"
                sx={{
                  width: "24px",
                  height: "24px",
                  bgcolor: "rgb(189 189 189 / 46%)",
                }}>
                <span style={{ fontSize: 13 }}>
                  {username?.slice(0, 2) || "游"}
                </span>
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </section>
  )
}

export default TopBar
