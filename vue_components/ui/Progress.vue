<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string; value?: number }>()
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', props.class)">
    <div class="h-full w-full flex-1 bg-primary transition-all" :style="{ transform: `translateX(-${100 - (props.value || 0)}%)` }" />
  </div>
</template>
