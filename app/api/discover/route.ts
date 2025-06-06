import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { theme } = await req.json()

  if (!theme) {
    return NextResponse.json({ error: 'Missing theme' })
  }

  try {
    const search = await fetch(
      `https://api.search.brave.com/res/v1/news/search?q=${encodeURIComponent(theme.trim())}&count=10&freshness=pd&result_filter=news`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY ?? '',
        },
      },
    )

    const result = await search.json()

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong' })
  }
}
