<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="border rounded-md p-4 shadow-lg">
    <slot />
  </div>
</template>
