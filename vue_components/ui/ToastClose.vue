<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <button v-bind="attrs" class="absolute right-2 top-2 p-1">
    <slot />
  </button>
</template>
