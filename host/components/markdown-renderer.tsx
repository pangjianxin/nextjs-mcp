"use client"

import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const components: Components = {
    // 自定义代码块渲染（无语法高亮）
    code(props) {
      const { children, className, ...rest } = props
      const match = /language-(\w+)/.exec(className || "")
      const language = match ? match[1] : ""
      const isInline = !className

      if (!isInline && match) {
        return (
          <div className="my-4">
            {language && (
              <div className="bg-gray-800 text-gray-200 px-3 py-1 text-xs font-medium rounded-t-md">{language}</div>
            )}
            <pre
              className={`bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto ${language ? "rounded-t-none" : ""}`}
            >
              <code className="text-sm font-mono" {...rest}>
                {children}
              </code>
            </pre>
          </div>
        )
      }

      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...rest}>
          {children}
        </code>
      )
    },
    // 自定义表格样式
    table(props) {
      const { children } = props
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md">
            {children}
          </table>
        </div>
      )
    },
    thead(props) {
      const { children } = props
      return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    },
    th(props) {
      const { children } = props
      return (
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
          {children}
        </th>
      )
    },
    td(props) {
      const { children } = props
      return (
        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
          {children}
        </td>
      )
    },
    // 自定义链接样式
    a(props) {
      const { href, children } = props
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {children}
        </a>
      )
    },
    // 自定义引用块样式
    blockquote(props) {
      const { children } = props
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
          {children}
        </blockquote>
      )
    },
    // 自定义标题样式
    h1(props) {
      const { children } = props
      return <h1 className="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-gray-100">{children}</h1>
    },
    h2(props) {
      const { children } = props
      return <h2 className="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-gray-100">{children}</h2>
    },
    h3(props) {
      const { children } = props
      return <h3 className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-gray-100">{children}</h3>
    },
    h4(props) {
      const { children } = props
      return <h4 className="text-base font-bold mt-3 mb-2 text-gray-900 dark:text-gray-100">{children}</h4>
    },
    h5(props) {
      const { children } = props
      return <h5 className="text-sm font-bold mt-3 mb-2 text-gray-900 dark:text-gray-100">{children}</h5>
    },
    h6(props) {
      const { children } = props
      return <h6 className="text-xs font-bold mt-3 mb-2 text-gray-900 dark:text-gray-100">{children}</h6>
    },
    // 优化的列表样式
    ul(props) {
      const { children } = props
      return <ul className="list-disc ml-5 space-y-0.5 my-2">{children}</ul>
    },
    ol(props) {
      const { children } = props
      return <ol className="list-decimal ml-5 space-y-0.5 my-2">{children}</ol>
    },
    li(props) {
      const { children } = props
      return <li className="text-gray-900 dark:text-gray-100 leading-relaxed pl-1">{children}</li>
    },
    // 自定义段落样式
    p(props) {
      const { children } = props
      return <p className="mb-2 text-gray-900 dark:text-gray-100 leading-relaxed">{children}</p>
    },
    // 自定义强调样式
    strong(props) {
      const { children } = props
      return <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>
    },
    em(props) {
      const { children } = props
      return <em className="italic text-gray-900 dark:text-gray-100">{children}</em>
    },
    // 自定义分割线
    hr() {
      return <hr className="my-6 border-gray-300 dark:border-gray-600" />
    },
  }

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
