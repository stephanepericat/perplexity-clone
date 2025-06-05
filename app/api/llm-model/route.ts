import { NextResponse } from 'next/server'
import { inngest } from '@/lib/inngest/client'

// Opt out of caching; every request should send a new event
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.json()
  const { question, sources, record } = body

  try {
    const run = await inngest.send({
      name: 'perplexity/llm-model',
      data: {
        question,
        sources,
        record,
      },
    })

    return NextResponse.json(run, { status: 200 })
  } catch (e) {
    return NextResponse.json(e, { status: 500 })
  }
}
