<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <li v-bind="attrs" :class="cn('inline-flex items-center gap-1.5', props.class)">
    <slot />
  </li>
</template>
