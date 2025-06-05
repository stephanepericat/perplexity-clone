import { SourceList } from './source-list'
import { Summary } from './summary'
import type { SearchResult } from '@/lib/types'

export function Answer({
  searchResults,
  summary,
}: {
  searchResults?: SearchResult[]
  summary?: string
}) {
  const results = searchResults || ([] as SearchResult[])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-5">
        <SourceList results={results} />
        <Summary response={summary} />
      </div>
    </div>
  )
}
