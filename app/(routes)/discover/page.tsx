'use client'

import { useEffect, useState } from 'react'
import {
  CircleDollarSign,
  Compass,
  Cpu,
  LoaderCircle,
  Palette,
  Star,
  Volleyball,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { NewsCard } from './_components/news-card'

import type { NewsResult } from '@/lib/news-types'

const Themes = [
  {
    name: 'Top',
    icon: Star,
  },
  {
    name: 'Tech & Science',
    icon: Cpu,
  },
  {
    name: 'Finance',
    icon: CircleDollarSign,
  },
  {
    name: 'Arts & Culture',
    icon: Palette,
  },
  {
    name: 'Sports',
    icon: Volleyball,
  },
]

export default function DiscoverPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedTheme, setSelectedTheme] = useState<string>('Top')
  const [articles, setArticles] = useState<NewsResult[]>([])

  const getArticles = async () => {
    setArticles([])
    setLoading(true)

    try {
      const response = await fetch('/api/discover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: `${selectedTheme} news & updates`,
        }),
      })

      const { results = [] } = await response.json()

      console.log(results)
      setArticles(results as NewsResult[])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArticles()
  }, [selectedTheme])

  return (
    <div className="mt-20 px-10 w-full max-w-[800px] mx-auto">
      <h1 className="font-bold text-3xl pb-4 flex gap-2 items-center">
        <Compass />
        Discover
      </h1>
      <div className="flex mt-5 gap-2">
        {Themes.map((theme, index) => (
          <Button
            key={index}
            variant={selectedTheme === theme.name ? 'default' : 'outline'}
            className="rounded-full hover:cursor-pointer transition-colors"
            onClick={() => setSelectedTheme(theme.name)}
          >
            <theme.icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{theme.name}</span>
          </Button>
        ))}
      </div>
      {loading && (
        <LoaderCircle className="animate-spin w-10 h-10 mx-auto mt-10" />
      )}
      <div className="grid grid-cols-3 gap-6 my-10">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            className={index === 0 ? 'col-span-3' : ''}
            large={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
