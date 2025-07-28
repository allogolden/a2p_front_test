<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
const open = inject('accordionOpen') as any
const toggle = inject('toggleAccordionOpen') as (() => void) | undefined
</script>

<template>
  <div class="flex">
    <button
      type="button"
      @click="toggle && toggle()"
      v-bind="attrs"
      :data-state="open?.value ? 'open' : 'closed'"
      :class="cn('flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline', props.class)"
    >
      <slot />
      <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{ 'rotate-180': open?.value }" />
    </button>
  </div>
</template>
