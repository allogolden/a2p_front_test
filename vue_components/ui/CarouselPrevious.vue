<script setup lang="ts">
import { inject } from 'vue'
const prev = inject('carouselPrev') as (()=>void)|undefined
</script>
<template>
  <button type="button" @click="prev && prev()" class="absolute left-0 top-1/2 -translate-y-1/2">
    <slot />
  </button>
</template>
