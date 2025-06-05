/* eslint-disable @typescript-eslint/no-unused-vars */
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components = {
  // @ts-expect-error no type
  h1: ({ node, ...props }) => (
    <h1 className="text-4xl font-bold mb-4 leading-snug" {...props} />
  ),
  // @ts-expect-error no type
  h2: ({ node, ...props }) => (
    <h2 className="text-3xl font-semibold mb-3 leading-snug" {...props} />
  ),
  // @ts-expect-error no type
  h3: ({ node, ...props }) => (
    <h3 className="text-2xl font-semibold mt-4 mb-2 leading-tight" {...props} />
  ),
  // @ts-expect-error no type
  p: ({ node, ...props }) => <p className="leading-relaxed mb-4" {...props} />,
  // @ts-expect-error no type
  a: ({ node, ...props }) => <a target="_blank" rel="noreferrer" {...props} />,
  // @ts-expect-error no type
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-8 leading-relaxed" {...props} />
  ),
  // @ts-expect-error no type
  li: ({ node, ...props }) => <li {...props} />,
  // @ts-expect-error no type
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="bg-gray-100 p-4 rounded-lg text-gray-700 leading-relaxed mb-6"
      {...props}
    />
  ),

  // Table Styling
  // @ts-expect-error no type
  table: ({ node, ...props }) => (
    <table
      className="table-auto w-full text-sm border-collapse border border-gray-300"
      {...props}
    />
  ),
  // @ts-expect-error no type
  th: ({ node, ...props }) => (
    <th
      className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
      {...props}
    />
  ),
  // @ts-expect-error no type
  td: ({ node, ...props }) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),

  // Code Block Styling with Syntax Highlighter
  // code: ({ node, inline, className, children, ...props }) => {
  //   const match = /language-(\w+)/.exec(className || '')

  //   return !inline && match ? (
  //     <SyntaxHighlighter
  //       style={okaidia}
  //       language={match[1]}
  //       PreTag="div"
  //       className="rounded-md overflow-auto"
  //     >
  //       {String(children).replace(/\n$/, '')}
  //     </SyntaxHighlighter>
  //   ) : (
  //     <code className="bg-gray-100 p-1 rounded-md" {...props}>
  //       {children}
  //     </code>
  //   )
  // },
}

export function Summary({ response }: { response?: string }) {
  return (
    <div className="mt-5">
      {response ? (
        // @ts-expect-error type
        <Markdown remarkPlugins={[remarkGfm]} components={components}>
          {response}
        </Markdown>
      ) : (
        <div className="mb-5">
          <div className="w-full bg-accent animate-pulse h-5 rounded-md">
            &nbsp;
          </div>
          <div className="w-1/2 mt-2 bg-accent animate-pulse h-5 rounded-md">
            &nbsp;
          </div>
          <div className="w-3/4 mt-2 bg-accent animate-pulse h-5 rounded-md">
            &nbsp;
          </div>
        </div>
      )}
    </div>
  )
}
