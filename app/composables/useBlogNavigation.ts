import type { ContentItem } from '@/types/blog'

function parseCustomDate(dateStr?: string): Date {
  if (!dateStr) return new Date(0)

  const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1')
  return new Date(cleanDateStr)
}

export const useBlogNavigation = async (currentPath: string) => {
  // Fetch real blog posts only
  const { data: allBlogs } = await useAsyncData(`blog-navigation-${currentPath}`, () =>
    queryCollection('content')
      .all()
      .then((posts) => {
        return posts
          .filter((post) => {
            return (
              post.path?.startsWith('/blogs/') &&
              post.path !== '/blogs/about' &&
              post.path !== '/about'
            )
          })
          .sort((a, b) => {
            const aDate = parseCustomDate(a.meta?.date as string)
            const bDate = parseCustomDate(b.meta?.date as string)
            return bDate.getTime() - aDate.getTime()
          })
      })
  )

  const currentPostIndex = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null
    if (!blogs) return -1

    return blogs.findIndex((post: ContentItem) => post.path === currentPath)
  })

  const previousPost = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null

    if (!blogs || currentPostIndex.value <= 0) return null

    const post = blogs[currentPostIndex.value - 1]
    if (!post) return null

    return {
      path: post.path,
      title: post.title || 'Previous Post',
    }
  })

  const nextPost = computed(() => {
    const blogs = allBlogs.value as unknown as ContentItem[] | null

    if (!blogs || currentPostIndex.value === -1 || currentPostIndex.value >= blogs.length - 1) {
      return null
    }

    const post = blogs[currentPostIndex.value + 1]
    if (!post) return null

    return {
      path: post.path,
      title: post.title || 'Next Post',
    }
  })

  return {
    previousPost,
    nextPost,
    allBlogs,
  }
}