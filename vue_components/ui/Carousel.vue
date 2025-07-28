<script lang="ts" setup>
import { provide } from 'vue'
const scrollPrev = () => {}
const scrollNext = () => {}
provide('carouselPrev', scrollPrev)
provide('carouselNext', scrollNext)
</script>
<template>
  <div class="relative">
    <slot />
  </div>
</template>
