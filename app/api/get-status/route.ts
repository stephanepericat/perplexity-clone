import { NextResponse } from 'next/server'

// Opt out of caching; every request should send a new event
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { runId } = await req.json()

  try {
    const response = await fetch(
      `${process.env.INNGEST_DOMAIN}/v1/events/${runId}/runs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
        },
      },
    )
    const json = await response.json()
    return NextResponse.json(json.data, { status: 200 })
  } catch (e) {
    return NextResponse.json(e, { status: 500 })
  }
}
