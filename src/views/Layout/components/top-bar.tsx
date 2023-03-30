/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useStore } from "@/store"
import { Button, Tabs, type TabsProps } from "antd"
import { nanoid } from "nanoid"
import { FC, useState } from "react"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

const TopBar: FC = () => {
  const { setCurrentChatId } = useStore()
  const [activeKey, setActiveKey] = useState("_chat_default")
  const [chatItems, setChatItems] = useState<TabsProps["items"]>([
    {
      key: "_chat_default",
      label: `default`,
      children: null,
      closable: false,
    },
  ])
  const handleAdd = () => {
    const chatId = `_chat_${nanoid(5)}`
    const len = chatItems!.length
    const newItem = {
      key: chatId,
      label: `chat_${len}`,
      children: null,
    }
    chatItems!.push(newItem)

    setChatItems([...chatItems!])
    setCurrentChatId(chatId)
    setActiveKey(chatId)
  }
  const handleRemove = (targetKey: TargetKey) => {
    const lastIndex = chatItems!.findIndex(i => i.key === targetKey) - 1
    const newChatItems = chatItems!.filter(i => i.key !== targetKey)
    setChatItems(newChatItems)
    if (targetKey == activeKey && lastIndex >= 0)
      setActiveKey(newChatItems[lastIndex].key)
  }
  const handleTabsChange = (key: string) => {
    console.log(key)
    setActiveKey(key)
  }
  const hanleTabClik = (targetKey: TargetKey, action: "add" | "remove") => {
    action == "add" ? handleAdd() : handleRemove(targetKey)
  }
  return (
    <Tabs
      type="editable-card"
      activeKey={activeKey}
      items={chatItems}
      onChange={handleTabsChange}
      onEdit={hanleTabClik}
      tabBarExtraContent={<Button>User 占位</Button>}
    />
  )
  /* return (
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
  ) */
}

export default TopBar
