import type { ContentItem } from '@/types/blog'

function normalizePath(path?: string): string {
  if (!path) return ''

  return path
    .replace(/^\/nuxt-blog(?=\/)/, '')
    .replace(/\/$/, '')
}

function parseCustomDate(dateStr?: string): Date {
  if (!dateStr) return new Date(0)

  const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1')
  return new Date(cleanDateStr)
}

export const useBlogNavigation = async (currentPath: string) => {
  const normalizedCurrentPath = normalizePath(currentPath)
  const asyncDataKey = `blog-navigation-${normalizedCurrentPath.replace(/[^\w-]/g, '-')}`

  // Fetch real blog posts only
  const { data: allBlogs } = await useAsyncData(asyncDataKey, () =>
    queryCollection('content')
      .all()
      .then((posts) => {
        return posts
          .filter((post) => {
            const postPath = normalizePath(post.path)

            return (
              postPath.startsWith('/blogs/') &&
              postPath !== '/blogs/about' &&
              postPath !== '/about'
            )
          })
          .sort((a, b) => {
            const aDate = parseCustomDate(a.meta?.date as string)
            const bDate = parseCustomDate(b.meta?.date as string)

            return bDate.getTime() - aDate.getTime()
          })
      })
  )

  // Find current post index
  const currentPostIndex = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null
    if (!blogs) return -1

    return blogs.findIndex((post: ContentItem) => {
      return normalizePath(post.path) === normalizedCurrentPath
    })
  })

  // Get previous post
  const previousPost = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null

    if (!blogs || currentPostIndex.value <= 0) return null

    const post = blogs[currentPostIndex.value - 1]
    if (!post) return null

    return {
      path: normalizePath(post.path),
      title: post.title || 'Previous Post',
    }
  })

  // Get next post
  const nextPost = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null

    if (!blogs || currentPostIndex.value === -1 || currentPostIndex.value >= blogs.length - 1) {
      return null
    }

    const post = blogs[currentPostIndex.value + 1]
    if (!post) return null

    return {
      path: normalizePath(post.path),
      title: post.title || 'Next Post',
    }
  })

  return {
    previousPost,
    nextPost,
    allBlogs,
  }
}