import Image from 'next/image'
import type { SearchResult } from '@/lib/types'

export function ImageList({
  searchResults,
}: {
  searchResults?: SearchResult[]
}) {
  const images = searchResults?.filter((result) => result.thumbnail) || []

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
      {images.map((image, index) => {
        return (
          <a
            className="aspect-video bg-accent"
            href={image.thumbnail}
            target="_blank"
            key={index}
          >
            <Image
              src={image.thumbnail!}
              alt={image.title}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        )
      })}
    </div>
  )
}
