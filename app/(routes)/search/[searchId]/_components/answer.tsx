import Image from 'next/image'

import type { BraveSearchResult } from '@/lib/search-types'

export function Answer({
  searchResults,
}: {
  searchResults: BraveSearchResult
}) {
  const webResults = searchResults?.web?.results

  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-5">
        {webResults?.map((result, index) => {
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
                  src={result?.profile?.img}
                  alt={result?.profile?.name}
                  width={20}
                  height={20}
                />
                <h2 className="text-xs text-muted-foreground">
                  {result?.profile?.long_name}
                </h2>
              </div>
              <p
                className="text-xs line-clamp-2"
                dangerouslySetInnerHTML={{ __html: result?.description }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
