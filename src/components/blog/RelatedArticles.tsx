// Server Component — related posts section below the article.
// If posts is empty, renders nothing (no wrapper, no placeholder).

import type { BlogPost } from '@/lib/types'
import Container from '@/components/ui/Container'
import BlogCard from '@/components/blog/BlogCard'

interface RelatedArticlesProps {
  posts: BlogPost[]
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
      <Container>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related articles</h2>
        <ul
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {posts.map((post) => (
            <li key={post.sys.id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
