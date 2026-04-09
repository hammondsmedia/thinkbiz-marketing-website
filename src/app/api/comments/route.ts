import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { redis } from '@/lib/redis'
import { verifyRecaptcha } from '@/lib/recaptcha'

// Shape stored in Redis — approved: false until manually reviewed
interface StoredComment {
  id: string
  authorName: string
  body: string
  createdAt: string
  approved: boolean
}

// Shape returned to the client — only approved ones, no internal flag exposed
interface PublicComment {
  id: string
  authorName: string
  body: string
  createdAt: string
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ comments: [] })

  try {
    const all = (await redis.get<StoredComment[]>(`comments:${slug}`)) ?? []
    const approved: PublicComment[] = all
      .filter((c) => c.approved)
      .map(({ id, authorName, body, createdAt }) => ({ id, authorName, body, createdAt }))
    return NextResponse.json({ comments: approved })
  } catch {
    return NextResponse.json({ comments: [] })
  }
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as {
    slug?: string
    authorName?: string
    body?: string
    recaptchaToken?: string
  }

  const { slug, authorName, body, recaptchaToken } = data

  if (!slug?.trim() || !authorName?.trim() || !body?.trim() || !recaptchaToken) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const { success, score } = await verifyRecaptcha(recaptchaToken)
    if (!success || score < 0.5) {
      return NextResponse.json({ error: 'Bot protection check failed' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 })
  }

  try {
    const existing: StoredComment[] = (await redis.get(`comments:${slug}`)) ?? []
    const newComment: StoredComment = {
      id: randomUUID(),
      authorName: authorName.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
      approved: false, // requires manual approval before showing publicly
    }
    await redis.set(`comments:${slug}`, [...existing, newComment])
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
