<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useAttrs } from 'vue'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <h5 v-bind="attrs" :class="cn('mb-1 font-medium leading-none tracking-tight', props.class)">
    <slot />
  </h5>
</template>
