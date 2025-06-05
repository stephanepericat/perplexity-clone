import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { SearchResult } from '@/lib/types'

export function SourceList({
  results,
  setActiveTab,
}: {
  results: SearchResult[]
  setActiveTab: (tab: string) => void
}) {
  const mainResults = results.slice(0, 3)
  const additionalResults = results.length <= 3 ? 0 : results.length - 3

  return (
    <div
      className={cn(
        'grid gap-2',
        additionalResults > 0 ? 'grid-cols-[1fr_1fr_1fr_100px]' : 'grid-cols-3',
      )}
    >
      {mainResults?.map((result, index) => {
        return (
          <div
            key={index}
            className="p-3 rounded-lg bg-accent cursor-pointer hover:brightness-95 transition-all"
            onClick={() => {
              window.open(result?.url, '_blank')
            }}
          >
            <div className="flex gap-2 items-center">
              <Image
                src={result?.img}
                alt={result?.long_name}
                width={20}
                height={20}
              />
              <h2 className="text-xs text-muted-foreground">
                {result?.long_name}
              </h2>
            </div>
            <p
              className="text-xs line-clamp-2"
              dangerouslySetInnerHTML={{ __html: result?.description }}
            />
          </div>
        )
      })}
      {additionalResults > 0 && (
        <div
          className="p-3 rounded-lg bg-accent cursor-pointer hover:brightness-95 transition-all text-xs font-semibold flex flex-col items-center justify-center"
          onClick={() => setActiveTab('Sources')}
        >
          <span>+ {additionalResults}</span>
          <span>result(s)</span>
        </div>
      )}
    </div>
  )
}
