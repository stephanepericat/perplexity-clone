import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Clock, Link, Send } from 'lucide-react'
import moment from 'moment'

import type { InputRecord } from '@/lib/types'

export function Header({ record }: { record?: InputRecord }) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <UserButton />
        <div className="flex gap-1 items-center">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {moment(record?.created_at).fromNow()}
          </span>
        </div>
      </div>

      <h2 className="line-clamp-1 max-w-md">{record?.search_input}</h2>

      <div className="flex gap-3">
        <Button>
          <Link />
        </Button>
        <Button>
          <Send /> Share
        </Button>
      </div>
    </div>
  )
}
