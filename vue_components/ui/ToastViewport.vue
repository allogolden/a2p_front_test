<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="fixed top-0 right-0 flex flex-col p-4 space-y-2 w-96">
    <slot />
  </div>
</template>
