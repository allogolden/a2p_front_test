<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
const open = inject('accordionOpen') as any
</script>

<template>
  <div
    :data-state="open?.value ? 'open' : 'closed'"
    :class="cn('overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', props.class)"
    v-show="open?.value"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template>
