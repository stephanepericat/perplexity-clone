import Image from 'next/image'

import type { SearchResult } from '@/lib/types'

export function SourceList({ results }: { results: SearchResult[] }) {
  return (
    <>
      {results?.map((result, index) => {
        return (
          <div
            key={index}
            className="p-3 rounded-lg bg-accent w-[200px] cursor-pointer hover:brightness-95 transition-all"
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
    </>
  )
}
