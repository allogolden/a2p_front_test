<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="flex h-full w-full">
    <slot />
  </div>
</template>
