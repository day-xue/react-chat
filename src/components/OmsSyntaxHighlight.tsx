import ReactMarkdown from "react-markdown"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  darcula,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism"

// darcula webstorm
// vscDarkPlus vscode暗色主题

type tProps = {
  textContent: string
  darkMode: "dark" | "light" // markdown文本
}

const them = {
  dark: vscDarkPlus,
  light: darcula,
}

const OmsViewMarkdown = (props: tProps) => {
  const { textContent, darkMode } = props
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              showLineNumbers={false}
              style={them[darkMode] as any}
              language={match[1]}
              PreTag="div"
              {...props}>
              {String(children)}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}>
      {textContent}
    </ReactMarkdown>
  )
}

export default OmsViewMarkdown
