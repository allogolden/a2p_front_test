<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <button v-bind="attrs" class="h-8 px-3 text-sm">
    <slot />
  </button>
</template>
