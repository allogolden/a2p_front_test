<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useAttrs } from 'vue'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs" :class="cn('text-sm [&_p]:leading-relaxed', props.class)">
    <slot />
  </div>
</template>
