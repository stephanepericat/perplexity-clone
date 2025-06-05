'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

import { Header } from './_components/header'
import { DisplayResult } from './_components/display-result'

import type { InputRecord } from '@/lib/types'

export default function SearchResultPage() {
  const { searchId } = useParams()
  const [searchInputRecord, setSearchInputRecord] = useState<InputRecord>()

  const getSearchQueryRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('Library')
        .select('*,Chats(*)')
        .eq('search_id', searchId)

      if (error) {
        throw error
      }

      setSearchInputRecord(data[0] as InputRecord)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getSearchQueryRecord()
  }, [])

  return (
    <div>
      <Header record={searchInputRecord} />
      <div className="px-10 w-full max-w-[800px] mx-auto">
        <DisplayResult
          record={searchInputRecord}
          searchId={searchId as string}
        />
      </div>
    </div>
  )
}
