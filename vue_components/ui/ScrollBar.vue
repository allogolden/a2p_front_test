<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" class="flex touch-none select-none p-[1px] w-2.5">
    <div class="flex-1 rounded-full bg-border" />
  </div>
</template>
