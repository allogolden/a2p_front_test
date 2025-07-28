<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const open = inject('alertDialogOpen') as any
const setOpen = inject('setAlertDialogOpen') as ((v:boolean)=>void)|undefined
</script>
<template>
  <Teleport to="body">
    <div v-if="open">
      <div class="fixed inset-0 z-50 bg-black/80" @click="setOpen && setOpen(false)" />
      <div :class="cn('fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-lg sm:rounded-lg', props.class)" role="alertdialog">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
