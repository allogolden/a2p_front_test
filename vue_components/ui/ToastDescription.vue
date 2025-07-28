<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="text-sm opacity-90">
    <slot />
  </div>
</template>
