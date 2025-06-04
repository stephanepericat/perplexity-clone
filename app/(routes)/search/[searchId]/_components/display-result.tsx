import { useEffect, useState } from 'react'
import { TabList } from './tab-list'
import { Answer } from './answer'

export function DisplayResult({ record }: { record?: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState('Answer')

  const getApiSearchResults = async (record: Record<string, string>) => {
    try {
      const res = await fetch('/api/brave-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchInput: record?.search_input,
          searchType: record?.type,
        }),
      })

      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (record) {
      getApiSearchResults(record!).then((res) => {
        console.log(res)
      })
    }
  }, [record])

  return (
    <div className="mt-7">
      <h2 className="font-semibold text-3xl line-clamp-2">
        {record?.search_input}
      </h2>
      <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Answer' && <Answer />}
    </div>
  )
}
