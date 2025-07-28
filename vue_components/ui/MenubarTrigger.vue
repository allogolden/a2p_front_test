<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <button v-bind="attrs" class="px-3 py-1.5 text-sm">
    <slot />
  </button>
</template>
