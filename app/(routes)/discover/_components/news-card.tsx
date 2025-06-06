'use client'

import Image from 'next/image'
import { Bookmark } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'

import { cn } from '@/lib/utils'

import type { NewsResult } from '@/lib/news-types'

export function NewsCard({
  article,
  className = '',
  large = false,
}: {
  article: NewsResult
  className?: string
  large?: boolean
}) {
  return (
    <Card
      className={cn('pt-0 overflow-hidden hover:cursor-pointer', className)}
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="aspect-video bg-accent overflow-hidden">
        {article.thumbnail?.src && (
          <Image
            src={article.thumbnail.src}
            alt={article.title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardContent>
        <CardTitle
          className={cn(
            'line-clamp-2 mb-2',
            large ? 'text-xl' : 'leading-snug',
          )}
        >
          {article.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {article.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{article.age}</span>
        <Bookmark className="w-4 h-4" />
      </CardFooter>
    </Card>
  )
}
