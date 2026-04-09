interface RecaptchaVerifyResponse {
  success: boolean
  score: number
  action: string
  challenge_ts: string
  hostname: string
  'error-codes'?: string[]
}

export async function verifyRecaptcha(
  token: string,
): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured')
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  const data = (await response.json()) as RecaptchaVerifyResponse

  return {
    success: data.success === true,
    score: data.score ?? 0,
  }
}
