<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <div role="tablist" v-bind="attrs" :class="cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', props.class)">
    <slot />
  </div>
</template>
