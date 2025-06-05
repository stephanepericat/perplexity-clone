import Image from 'next/image'
import type { SearchResult } from '@/lib/types'

export function Sources({ searchResults }: { searchResults?: SearchResult[] }) {
  return (
    <div className="my-5">
      {searchResults?.map((result, index) => {
        return (
          <div
            key={index}
            className="hover:cursor-pointer mb-6"
            onClick={() => {
              window.open(result?.url, '_blank')
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">{index + 1}</span>
              <Image
                src={result?.img}
                alt={result?.long_name}
                width={20}
                height={20}
                className="rounded-full border"
              />
              <div>
                <h3 className="text-xs text-primary font-semibold">
                  {result?.name}
                </h3>
                <h3 className="text-xs text-muted-foreground">
                  {result?.long_name}
                </h3>
              </div>
            </div>
            <h2 className="text-primary text-lg font-semibold mt-2">
              {result.title}
            </h2>
            <p
              className="text-sm text-muted-foreground line-clamp-2"
              dangerouslySetInnerHTML={{ __html: result?.description }}
            />
          </div>
        )
      })}
    </div>
  )
}
