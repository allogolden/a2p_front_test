<script lang="ts" setup>
import { inject } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const open = inject('dropdownOpen') as any
const setOpen = inject('setDropdownOpen') as ((v:boolean)=>void)|undefined
</script>
<template>
  <Teleport to="body">
    <div v-if="open?.value" class="fixed inset-0 z-50" @click="setOpen && setOpen(false)" />
    <div v-if="open?.value" :class="cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', props.class)">
      <slot />
    </div>
  </Teleport>
</template>
