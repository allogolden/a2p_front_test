<script lang="ts" setup>
const props = defineProps<{ title: string; description?: string }>()
</script>
<template>
  <div class="bg-gray-50 py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{{ props.title }}</h1>
      <p v-if="props.description" class="text-xl text-gray-600 max-w-2xl mx-auto">{{ props.description }}</p>
    </div>
  </div>
</template>
