import { useState } from 'react'
import { TabList } from './tab-list'

export function DisplayResult({ record }: { record?: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState('Answer')

  return (
    <div className="mt-7">
      <h2 className="font-semibold text-3xl line-clamp-2">
        {record?.search_input}
      </h2>
      <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
