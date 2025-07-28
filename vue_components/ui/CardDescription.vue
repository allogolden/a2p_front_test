<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </div>
</template>
