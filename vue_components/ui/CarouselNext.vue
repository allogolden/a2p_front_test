<script setup lang="ts">
import { inject } from 'vue'
const next = inject('carouselNext') as (()=>void)|undefined
</script>
<template>
  <button type="button" @click="next && next()" class="absolute right-0 top-1/2 -translate-y-1/2">
    <slot />
  </button>
</template>
