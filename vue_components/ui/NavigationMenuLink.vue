<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <a v-bind="attrs">
    <slot />
  </a>
</template>
