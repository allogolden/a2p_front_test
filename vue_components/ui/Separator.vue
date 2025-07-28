<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string; orientation?: 'horizontal' | 'vertical'; decorative?: boolean }>()
const attrs = useAttrs()
</script>
<template>
  <div
    role="separator"
    v-bind="attrs"
    :aria-orientation="props.orientation || 'horizontal'"
    :aria-hidden="props.decorative !== false"
    :class="cn('shrink-0 bg-border', (props.orientation || 'horizontal') === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', props.class)"
  />
</template>
