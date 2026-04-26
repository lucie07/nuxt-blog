<script lang="ts" setup>
interface Props {
  path?: string
  title?: string
  date?: string
  description?: string
  image?: string
  alt?: string
  ogImage?: string
  tags?: Array<string>
  published?: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})
</script>

<template>
  <article class="group border dark:border-gray-800 m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700 dark:text-zinc-300">
    <NuxtLink :to="path">
      <NuxtImg
        class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500"
        width="300"
        :src="image"
        :alt="alt"
      />
      <div class="px-3 pb-4">
        <div class="text-black dark:text-zinc-300 space-y-3 pt-3 pb-2">
          <div class="flex items-center text-xs">
            <LogoDate class="-translate-y-[10%]" />
            {{ date }}
          </div>
          <div class="flex items-center gap-1 flex-wrap">
            <LogoTag />
            <template v-for="tag in tags" :key="tag">
              <span class="bg-[#FFECC7] text-[#5C3D00] dark:bg-[#996B00] dark:text-[#FFF4D6] rounded-md px-2 py-1 text-xs">
                {{ tag }}
              </span>
            </template>
          </div>
        </div>
        <h2
          class="text-base font-semibold text-black dark:text-zinc-300 pb-1 group-hover:text-[#996B00] dark:group-hover:text-[#996B00]"
        >
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2 text-xs">
          {{ description }}
        </p>
        <div class="flex group-hover:underline text-[#996B00] dark:text-[#996B00] items-center py-2">
          <p>Read More</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
