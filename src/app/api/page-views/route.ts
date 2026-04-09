import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  try {
    const views = (await redis.get<number>(`pageviews:${slug}`)) ?? 0
    return NextResponse.json({ views })
  } catch {
    return NextResponse.json({ views: 0 })
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { slug?: string }
  const { slug } = body
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  try {
    const views = await redis.incr(`pageviews:${slug}`)
    return NextResponse.json({ views })
  } catch {
    // Redis not configured yet (placeholder credentials) — return 0 gracefully
    return NextResponse.json({ views: 0 })
  }
}
