import { message } from "antd"

export const catchApiError = (err: Error) => {
  message.error(err.message)
}
