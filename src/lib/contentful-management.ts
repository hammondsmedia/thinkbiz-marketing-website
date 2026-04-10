import { createClient } from 'contentful-management'
import type { PlainClientAPI } from 'contentful-management'
import type { FormSubmissionData } from './types'

// Lazy singleton — defers construction so an invalid/missing token doesn't
// throw at module-import time (which would fail the Next.js build).
let _client: PlainClientAPI | null = null

function getManagementClient(): PlainClientAPI {
  if (!_client) {
    _client = createClient(
      { accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN! },
      { type: 'plain' },
    )
  }
  return _client
}

export async function createFormSubmission(data: FormSubmissionData): Promise<void> {
  await getManagementClient().entry.create(
    {
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      environmentId: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
      contentTypeId: 'formSubmission',
    },
    {
      fields: {
        name: { 'en-US': data.name },
        email: { 'en-US': data.email },
        ...(data.phone ? { phone: { 'en-US': data.phone } } : {}),
        message: { 'en-US': data.message },
        source: { 'en-US': data.source },
        submittedAt: { 'en-US': new Date().toISOString() },
      },
    },
  )
}
