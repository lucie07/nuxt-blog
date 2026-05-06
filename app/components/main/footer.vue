<script setup lang="ts">
const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
</script>

<template>
  <footer class="mt-10 border-t border-[#FFD77A]/60 dark:border-[#FFD77A]/30">
    <div class="px-6 container max-w-5xl mx-auto">
      <div class="py-7 md:py-8 flex items-center justify-center text-center">
        <p class="text-sm font-medium text-zinc-800 dark:text-zinc-300">
          © 2026 Lucie Mingmei Hao
        </p>
      </div>
    </div>
  </footer>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
