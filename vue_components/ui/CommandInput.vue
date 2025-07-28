<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <input v-bind="attrs" class="border w-full p-2" />
</template>
