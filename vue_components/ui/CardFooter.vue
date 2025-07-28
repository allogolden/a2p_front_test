<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" :class="cn('flex items-center p-6 pt-0', props.class)">
    <slot />
  </div>
</template>
