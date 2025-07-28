<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
const show = inject('tooltipShow') as any
</script>
<template>
  <div
    v-if="show && show.value"
    v-bind="attrs"
    :class="cn('z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md', props.class)"
  >
    <slot />
  </div>
</template>
