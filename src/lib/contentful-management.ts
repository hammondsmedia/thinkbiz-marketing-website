import { createClient } from 'contentful-management'
import type { FormSubmissionData } from './types'

// contentful-management v12 returns PlainClientAPI — no getSpace() chain.
const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

export async function createFormSubmission(data: FormSubmissionData): Promise<void> {
  await managementClient.entry.create(
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
