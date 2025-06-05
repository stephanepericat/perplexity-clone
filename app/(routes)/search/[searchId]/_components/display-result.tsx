import { useEffect, useState } from 'react'
import { TabList } from './tab-list'
import { Answer } from './answer'
import { supabase } from '@/lib/supabase'

import SEARCH_RESULTS from '@/lib/mocks/search-results.json'

import type { BraveSearchResult } from '@/lib/search-types'
import type { FormattedResult } from '@/lib/types'

export function DisplayResult({
  record,
  searchId,
}: {
  record?: Record<string, string>
  searchId: string
}) {
  const [activeTab, setActiveTab] = useState('Answer')
  const [searchResults, setSearchResults] =
    useState<BraveSearchResult>(SEARCH_RESULTS)

  const getApiSearchResults = async (record: Record<string, string>) => {
    try {
      // const call = await fetch('/api/brave-search', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     searchInput: record?.search_input,
      //     searchType: record?.type,
      //   }),
      // })

      // const res = await call.json()
      const res = SEARCH_RESULTS

      const formattedResults: FormattedResult[] = res?.web?.results?.map(
        (result: any) => {
          return {
            description: result?.description,
            img: result?.profile?.img,
            long_name: result?.profile?.long_name,
            thumbnail: result?.thumbnail?.src,
            title: result?.title,
            url: result?.url,
          }
        },
      )

      // const { error } = await supabase
      //   .from('Chats')
      //   .insert([
      //     {
      //       search_id: searchId,
      //       search_results: formattedResults,
      //     },
      //   ])
      //   .select()

      // if (error) {
      //   throw error
      // }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (record) {
      getApiSearchResults(record)
    }
  }, [])

  return (
    <div className="mt-7">
      <h2 className="font-semibold text-3xl line-clamp-2">
        {record?.search_input}
      </h2>
      <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Answer' && <Answer searchResults={searchResults} />}
    </div>
  )
}
