<script lang="ts" setup>
import { useAttrs } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <li
    role="presentation"
    aria-hidden="true"
    v-bind="attrs"
    :class="cn('[&>svg]:w-3.5 [&>svg]:h-3.5', props.class)"
  >
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
