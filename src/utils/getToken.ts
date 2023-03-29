export const getToken = () => {
  const _chat_persist_ = sessionStorage.getItem("_chat_persist_")
  if (_chat_persist_) {
    return JSON.parse(_chat_persist_).state?.token
  }
  return null
}
