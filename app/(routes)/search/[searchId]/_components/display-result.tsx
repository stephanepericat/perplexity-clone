import { useEffect, useState } from 'react'
import { TabList } from './tab-list'
import { Answer } from './answer'
import { ImageList } from './image-list'
import { Sources } from './sources'

import { supabase } from '@/lib/supabase'

// import SEARCH_RESULTS from '@/lib/mocks/search-results.json'

import type { BraveSearchResult } from '@/lib/search-types'
import type { FormattedResult, InputRecord } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

export function DisplayResult({
  record,
  searchId,
}: {
  record?: InputRecord
  searchId: string
}) {
  const [activeTab, setActiveTab] = useState('Answer')
  const [searchResults, setSearchResults] = useState<InputRecord>()

  const getSearchRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('Library')
        .select('*,Chats(*)')
        .eq('search_id', searchId)

      if (error) {
        throw error
      }

      setSearchResults(data[0] as InputRecord)
    } catch (e) {
      console.error(e)
    }
  }

  const getApiSearchResults = async (record: InputRecord) => {
    try {
      const call = await fetch('/api/brave-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchInput: record?.search_input,
          searchType: record?.type,
        }),
      })

      const res = await call.json()
      // const res = SEARCH_RESULTS

      const formattedResults: FormattedResult[] = res?.web?.results?.map(
        (result: BraveSearchResult['web']['results'][0]) => {
          return {
            description: result?.description,
            img: result?.profile?.img,
            long_name: result?.profile?.long_name,
            name: result?.profile?.name,
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
            user_search_input: record?.search_input,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      await getSearchRecord()
      await generateAiResponse(data[0].id, record, formattedResults)
    } catch (e) {
      console.error(e)
    }
  }

  const generateAiResponse = async (
    id: number,
    record: InputRecord,
    sources: FormattedResult[],
  ) => {
    try {
      const llmCall = await fetch('/api/llm-model', {
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

      const runId = await llmCall.json()

      const poll = setInterval(async () => {
        const statusCall = await fetch(`/api/get-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            runId,
          }),
        })

        const status = await statusCall.json()

        if (status?.[0]?.status === 'Completed') {
          clearInterval(poll)
          // get updated data from database
          await getSearchRecord()
        }
      }, 1000)
    } catch (e) {
      console.error(e)
      return null
    }
  }

  useEffect(() => {
    if (!record) {
      return
    }

    if (record?.Chats?.length === 0) {
      console.log('Getting results...')
      getApiSearchResults(record)
    } else {
      getSearchRecord()
    }

    setSearchResults(record)
  }, [record])

  return (
    <div>
      {searchResults?.Chats?.map((chat, index) => {
        return (
          <div key={index} className="mt-7">
            <h2 className="font-semibold text-3xl line-clamp-2">
              {chat.user_search_input}
            </h2>
            <TabList
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sourcesCount={chat.search_results?.length || 0}
            />
            {activeTab === 'Answer' && (
              <>
                <Answer
                  searchResults={chat.search_results}
                  setActiveTab={setActiveTab}
                  summary={chat.ai_response}
                />

                <Separator className="my-5" />
              </>
            )}
            {activeTab === 'Images' && (
              <ImageList searchResults={chat.search_results} />
            )}
            {/* {activeTab === 'Videos' && <p>videos</p>} */}
            {activeTab === 'Sources' && (
              <Sources searchResults={chat.search_results} />
            )}
          </div>
        )
      })}
    </div>
  )
}
