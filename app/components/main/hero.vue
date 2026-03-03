<script setup lang="ts">
import { homePage } from '~/data'
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1 class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-5xl my-5">
          {{ homePage.title }}
        </h1>
        <p class="dark:text-zinc-300">
          {{ homePage.description }}
        </p>
      </div>
      <div class="px-6 justify-self-center">
        <img
          src="/image-10-resized.png"
          alt="landing page feature image"
          class="max-w-[260px] w-full h-auto"
        />
      </div>
    </div>
  </div>
</template>
