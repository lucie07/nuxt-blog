<script lang="ts" setup>
import { navbarData } from '~/data'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        "Hello. I'm Lucie Mingmei Hao. Web, research and design",
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Hello there',
  title: navbarData.homeTitle,
  description: 'Web, research and design',
  link: '/image-10-resized.png',
})
</script>

<template>
  <div>
    <!-- Full-width hero -->
    <MainHero />

    <!-- Keep the rest constrained -->
    <main class="container max-w-5xl mx-auto text-zinc-600">
      <MainRecent />
    <!-- <MainTrending /> -->
    </main>
  </div>
</template>
