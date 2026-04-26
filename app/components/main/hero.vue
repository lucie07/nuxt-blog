<script setup lang="ts">
import { homePage } from '~/data'
</script>

<template>
  <div class="container mx-auto px-6">
    <!-- HERO WRAPPER -->
    <div class="relative overflow-hidden rounded-none
             w-screen max-w-none
             left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <!-- Background image -->
      <img
        src="/feature-image.png"
        alt="landing page feature image"
        class="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
      />

      <!-- Optional dark overlay for text readability -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Text overlay -->
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="max-w-3xl p-6 sm:p-10">
          <h1 class="text-white font-semibold leading-tight text-4xl md:text-5xl">
            {{ homePage.title }}
          </h1>

          <h3 class="mt-3 text-white/90 font-medium text-xl md:text-2xl">
            {{ homePage.description }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
