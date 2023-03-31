import ReactMarkdown from "react-markdown"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"

type tProps = {
  textContent: string
  darkMode: "dark" | "light"
}
const them = {
  dark: oneDark,
  light: oneLight,
}

const codeStyle: React.CSSProperties = {
  backgroundColor: "#282c33",
  color: "#fff",
  borderRadius: "6px",
  padding: "5px",
  width: "100%",
}

const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props
  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        code({ node, inline, className, children, ...props }) {
          // console.log(className)
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              showLineNumbers={false}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={them[darkMode] as any}
              language={match[1]}
              PreTag="div"
              {...props}>
              {String(children)}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter
              showLineNumbers={false}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={them[darkMode] as any}
              language={"js"}
              PreTag="div"
              {...props}>
              {String(children)}
            </SyntaxHighlighter>
          )
        },
      }}>
      {textContent}
    </ReactMarkdown>
  )
}

export default OmsViewMarkdown
