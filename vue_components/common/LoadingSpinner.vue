<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'
const props = defineProps<{ size?: 'sm' | 'md' | 'lg'; class?: string }>()
const sizeClasses: Record<string,string> = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }
</script>
<template>
  <div :class="['flex items-center justify-center', props.class]">
    <Loader2 class="animate-spin" :class="sizeClasses[props.size || 'md']" />
  </div>
</template>
