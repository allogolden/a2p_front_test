<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <span v-bind="attrs" class="ml-auto text-xs tracking-widest text-muted-foreground">
    <slot />
  </span>
</template>
