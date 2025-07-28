<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ ratio?: number; class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" :style="{ aspectRatio: String(props.ratio ?? 1) }" :class="cn('relative', props.class)">
    <slot />
  </div>
</template>
