<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const open = inject('hoverCardOpen') as any
</script>
<template>
  <Teleport to="body">
    <div v-if="open?.value" :class="cn('z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md', props.class)">
      <slot />
    </div>
  </Teleport>
</template>
