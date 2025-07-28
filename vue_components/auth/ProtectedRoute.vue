<script lang="ts" setup>
import LoadingSpinner from '../common/LoadingSpinner.vue'
const props = defineProps<{ isAuthenticated?: boolean; isLoading?: boolean }>()
</script>
<template>
  <div v-if="props.isLoading" class="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
  <template v-else-if="props.isAuthenticated">
    <slot />
  </template>
</template>
