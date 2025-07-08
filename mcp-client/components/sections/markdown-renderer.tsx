"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props: any) {
          const { node, inline, className, children, ...rest } = props
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...rest}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...rest}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
