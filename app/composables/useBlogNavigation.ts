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
  const parsedDate = new Date(cleanDateStr)

  return Number.isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate
}

function isRealBlogPost(post: ContentItem): boolean {
  const postPath = normalizePath(post.path)

  return (
    postPath.startsWith('/blogs/') &&
    postPath !== '/blogs/about' &&
    postPath !== '/about'
  )
}

function sortBlogsByDateDesc(a: ContentItem, b: ContentItem): number {
  const aDate = parseCustomDate(a.meta?.date as string)
  const bDate = parseCustomDate(b.meta?.date as string)

  return bDate.getTime() - aDate.getTime()
}

export const useBlogNavigation = async (currentPath: string) => {
  const normalizedCurrentPath = normalizePath(currentPath)

  // Fetch one canonical list of real blog posts only.
  // Important: keep this key unique to navigation so it does not share cached data
  // with homepage recent blogs or archive queries.
  const { data: allBlogs } = await useAsyncData('blog-navigation-all-posts', async () => {
    const posts = await queryCollection('content').all()

    return (posts as unknown as ContentItem[])
      .filter(isRealBlogPost)
      .sort(sortBlogsByDateDesc)
  })

  // Find current post index in the canonical blog list
  const currentPostIndex = computed(() => {
    const blogs = allBlogs.value as ContentItem[] | null
    if (!blogs) return -1

    return blogs.findIndex((post) => {
      return normalizePath(post.path) === normalizedCurrentPath
    })
  })

  // Previous post means the item before the current post in the canonical list
  const previousPost = computed(() => {
    const blogs = allBlogs.value as ContentItem[] | null

    if (!blogs || currentPostIndex.value <= 0) return null

    const post = blogs[currentPostIndex.value - 1]
    if (!post) return null

    return {
      path: normalizePath(post.path),
      title: post.title || 'Previous Post',
    }
  })

  // Next post means the item after the current post in the canonical list
  const nextPost = computed(() => {
    const blogs = allBlogs.value as ContentItem[] | null

    if (
      !blogs ||
      currentPostIndex.value === -1 ||
      currentPostIndex.value >= blogs.length - 1
    ) {
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