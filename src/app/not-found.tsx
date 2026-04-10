import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white
                     hover:bg-primary-dark transition-colors duration-200
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Back to home
        </Link>
      </div>
    </Container>
  )
}
