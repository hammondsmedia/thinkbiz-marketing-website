import Image from 'next/image'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import type { Options } from '@contentful/rich-text-react-renderer'
import type { Block, Inline, Text } from '@contentful/rich-text-types'
import { slugify } from './utils'

function extractHeadingText(node: Block | Inline): string {
  return node.content
    .map((child) => {
      if (child.nodeType === 'text') return (child as Text).value
      return ''
    })
    .join('')
}

export const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => {
      const id = slugify(extractHeadingText(node as Block))
      return <h2 id={id}>{children}</h2>
    },

    [BLOCKS.HEADING_3]: (node, children) => {
      const id = slugify(extractHeadingText(node as Block))
      return <h3 id={id}>{children}</h3>
    },

    [BLOCKS.HR]: () => <hr />,

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const asset = node.data.target as any
      const file = asset?.fields?.file
      const title: string = asset?.fields?.title ?? ''
      const description: string = asset?.fields?.description ?? ''

      if (!file?.url) return null

      const src = `https:${file.url as string}?fm=webp&w=800&q=80`
      const width: number = file?.details?.image?.width ?? 800
      const height: number = file?.details?.image?.height ?? 600

      return (
        <Image
          src={src}
          alt={description || title}
          width={width}
          height={height}
          className="rounded-lg my-6"
        />
      )
    },

    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri as string} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },

  renderMark: {
    [MARKS.CODE]: (text) => <code>{text}</code>,
  },
}
