'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

import { Header } from './_components/header'
import { DisplayResult } from './_components/DisplayResult'

export default function SearchResultPage() {
  const { searchId } = useParams()
  const [searchInputRecord, setSearchInputRecord] = useState({})

  const getSearchQueryRecord = async () => {
    try {
      const { data, error } = await supabase
        .from('Library')
        .select('*')
        .eq('search_id', searchId)

      if (error) {
        throw error
      }

      setSearchInputRecord(data[0])
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
      <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20">
        <DisplayResult record={searchInputRecord} />
      </div>
    </div>
  )
}
