<script setup lang="ts">
import { aboutPage, footerData, navbarData, socialLinks } from '~/data'

const { data: aboutContent } = await useAsyncData('about-content', () =>
  queryCollection('content').path('/about').first()
)

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: footerData.aboutAuthor,
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: navbarData.homeTitle,
  description: 'Dive into web development with me and learn Js, Ts, Vue, Nuxt, Docker, k8s',
  link: '/lucie-mingmei-hao.jpg',
})
</script>

<template>
  <div class="py-5">
    <div class="px-6 py-5 sm:py-9 container max-w-3xl mx-auto">
      <h1 class="text-xl sm:text-4xl pb-8 font-bold">
        {{ aboutPage.title }}
      </h1>

      <NuxtImg
        src="/lucie-mingmei-hao.jpg"
        width="200"
        height="200"
        quality="70"
        class="rounded-md mb-2 w-[200px] h-auto"
      />

      <!--
      <div class="my-3 space-x-2 md:space-x-3 pb-10">
        <NuxtLink
          :to="socialLinks.githubLink"
          target="_blank"
          class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
          aria-label="Github"
        >
          <Icon name="fa:github" size="1em" class="-translate-y-[-10%]" />
        </NuxtLink>
        <NuxtLink
          :to="socialLinks.linkedinLink"
          target="_blank"
          class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
          aria-label="LinkedIn"
        >
          <Icon name="fa:linkedin-square" size="1em" class="-translate-y-[-10%]" />
        </NuxtLink>
        <NuxtLink
          :to="socialLinks.twitterLink"
          target="_blank"
          class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
          aria-label="Twitter"
        >
          <Icon name="fa:twitter-square" size="1em" class="-translate-y-[-10%]" />
        </NuxtLink>
        <NuxtLink
          :to="socialLinks.stackoverflowLink"
          target="_blank"
          class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
          aria-label="StackOverflow"
        >
          <Icon name="fa:stack-overflow" size="1em" class="-translate-y-[-10%]" />
        </NuxtLink>
      </div>
      -->

      <!--
      <h3 class="text-base sm:text-3xl font-semibold pb-6 sm:pb-12">
        {{ aboutPage.description }}
      </h3>
      -->

      <div class="prose prose-zinc dark:prose-invert max-w-none">
        <ContentRenderer
          v-if="aboutContent"
          :value="aboutContent"
        />
      </div>

    </div>
  </div>
</template>
