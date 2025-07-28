<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="px-2 py-1.5 text-sm">
    <slot />
  </div>
</template>
