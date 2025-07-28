<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <label v-bind="attrs" class="text-sm font-medium">
    <slot />
  </label>
</template>
