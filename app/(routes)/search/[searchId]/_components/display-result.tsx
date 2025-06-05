import { useEffect, useState } from 'react'
import { TabList } from './tab-list'
import { Answer } from './answer'
import { ImageList } from './image-list'
import { Sources } from './sources'

import { supabase } from '@/lib/supabase'

import type { BraveSearchResult } from '@/lib/search-types'
import type { FormattedResult, InputRecord } from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Send } from 'lucide-react'

export function DisplayResult({
  record,
  searchId,
}: {
  record?: InputRecord
  searchId: string
}) {
  const [activeTab, setActiveTab] = useState('Answer')
  const [searchResults, setSearchResults] = useState<InputRecord>()
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)

  const getSearchRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('Library')
        .select('*,Chats(*)')
        .eq('search_id', searchId)
        .order('id', { ascending: true, referencedTable: 'Chats' })

      if (error) {
        throw error
      }

      setSearchResults(data[0] as InputRecord)
    } catch (e) {
      console.error(e)
    }
  }

  const getApiSearchResults = async (record: InputRecord | null) => {
    setLoading(true)
    try {
      const call = await fetch('/api/brave-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchInput: userInput ? userInput : record?.search_input,
          searchType: record?.type || 'search',
        }),
      })

      const res = await call.json()

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
            user_search_input: record?.search_input || userInput,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      await getSearchRecord()
      await generateAiResponse(
        data[0].id,
        record || (data[0] as InputRecord),
        formattedResults,
      )
      setLoading(false)
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
    <div className="pb-25">
      {searchResults?.Chats?.map((chat, index) => {
        return (
          <div key={index}>
            <div className="mt-7">
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
            <div className="bg-background border rounded-lg p-4 my-6 flex items-center gap-2 fixed bottom-2 w-full max-w-[720px] shadow-2xl">
              <Input
                placeholder="Ask a follow up question..."
                className="focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button
                disabled={!userInput}
                onClick={() => getApiSearchResults(null)}
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
