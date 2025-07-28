<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ side?: 'top' | 'bottom' | 'left' | 'right'; class?: string }>()
const open = inject('sheetOpen') as any
</script>
<template>
  <Teleport to="body">
    <div v-if="open?.value" :class="cn('fixed z-50 gap-4 bg-background p-6 shadow-lg', props.class)" :data-side="props.side || 'right'">
      <slot />
    </div>
  </Teleport>
</template>
