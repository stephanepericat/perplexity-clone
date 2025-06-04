import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { searchInput, searchType } = await req.json()

  console.log(searchInput, searchType)

  if (!searchInput || !searchType) {
    return NextResponse.json({ error: 'Missing search input or search type' })
  }

  try {
    const search = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchInput.trim())}&count=10`,
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
