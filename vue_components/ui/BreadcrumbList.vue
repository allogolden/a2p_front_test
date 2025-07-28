<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <ol v-bind="attrs" :class="cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', props.class)">
    <slot />
  </ol>
</template>
