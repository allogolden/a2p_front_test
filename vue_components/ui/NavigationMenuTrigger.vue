<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <button v-bind="attrs" class="px-4 py-2 text-sm">
    <slot />
  </button>
</template>
