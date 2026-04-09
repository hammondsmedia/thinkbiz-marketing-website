import { NextRequest, NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { createFormSubmission } from '@/lib/contentful-management'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, recaptchaToken } = body as {
      name?: string
      email?: string
      phone?: string
      message?: string
      recaptchaToken?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim() || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { success, score } = await verifyRecaptcha(recaptchaToken)
    if (!success || score < 0.5) {
      return NextResponse.json({ error: 'Bot protection check failed' }, { status: 400 })
    }

    await createFormSubmission({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      message: message.trim(),
      source: 'contact-form',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[api/contact]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
