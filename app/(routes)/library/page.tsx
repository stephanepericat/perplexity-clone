'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { GalleryHorizontalEnd, SquareArrowUpRight } from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { UserDetailContext } from '@/context/UserDetailContext'

import { Separator } from '@/components/ui/separator'

import type { LibraryRecord } from '@/lib/types'

export default function LibraryPage() {
  const router = useRouter()
  const { userDetail } = useContext(UserDetailContext)
  const [history, setHistory] = useState<LibraryRecord[]>([])

  const getHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('Library')
        .select('*')
        .eq('user_email', userDetail?.email)
        .order('id', { ascending: false })

      if (error) {
        throw error
      }

      setHistory(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (userDetail?.email) {
      getHistory()
    }
  }, [userDetail])

  return (
    <div className="mt-20 px-10 w-full max-w-[800px] mx-auto">
      <h1 className="font-bold text-3xl pb-4 flex items-center gap-2">
        <GalleryHorizontalEnd />
        Library
      </h1>
      <div>
        {history.map((record) => (
          <div
            key={record.id}
            className="my-4"
            onClick={() => router.push(`/search/${record.search_id}`)}
          >
            <div className="flex justify-between items-center gap-2 hover:cursor-pointer">
              <div>
                <h2 className="font-semibold text-xl text-primary">
                  {record.search_input}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {moment(record.created_at).fromNow()}
                </p>
              </div>
              <SquareArrowUpRight className="w-4 h-4" />
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  )
}
