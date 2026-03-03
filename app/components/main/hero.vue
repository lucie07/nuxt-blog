<script setup lang="ts">
import { homePage } from '~/data'
</script>

<template>
  <div class="container mx-auto px-6">
    <!-- HERO WRAPPER -->
    <div class="relative overflow-hidden rounded-2xl">
      <!-- Background image -->
      <img
        src="/image-10-resized.png"
        alt="landing page feature image"
        class="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
      />

      <!-- Optional dark overlay for text readability -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Text overlay -->
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-2xl p-6 sm:p-10">
          <h1 class="text-white font-semibold leading-tight text-4xl md:text-5xl my-3">
            {{ homePage.title }}
          </h1>
          <p class="text-white/90 text-base md:text-lg">
            {{ homePage.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
