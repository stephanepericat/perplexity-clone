import { useEffect, useState } from 'react'
import { TabList } from './tab-list'
import { Answer } from './answer'
import { supabase } from '@/lib/supabase'

import SEARCH_RESULTS from '@/lib/mocks/search-results.json'

import type { BraveSearchResult } from '@/lib/search-types'
import type { FormattedResult, LibraryRecord } from '@/lib/types'

export function DisplayResult({
  record,
  searchId,
}: {
  record?: LibraryRecord
  searchId: string
}) {
  const [activeTab, setActiveTab] = useState('Answer')
  const [searchResults /*, setSearchResults */] =
    useState<BraveSearchResult>(SEARCH_RESULTS)

  const getApiSearchResults = async (record: LibraryRecord) => {
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
        (result: BraveSearchResult['web']['results'][0]) => {
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

      const { data, error } = await supabase
        .from('Chats')
        .insert([
          {
            search_id: searchId,
            search_results: formattedResults,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      await generateAiResponse(data[0].id, record, formattedResults)
    } catch (e) {
      console.error(e)
    }
  }

  const generateAiResponse = async (
    id: number,
    record: LibraryRecord,
    sources: FormattedResult[],
  ) => {
    try {
      const call = await fetch('/api/llm-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: record?.search_input,
          record: id,
          sources,
        }),
      })

      const res = await call.json()

      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (record) {
      console.log('Getting results...')
      getApiSearchResults(record)
    }
  }, [record])

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
