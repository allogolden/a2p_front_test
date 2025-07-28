<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="flex items-center px-2 py-1.5 text-sm">
    <slot />
  </div>
</template>
