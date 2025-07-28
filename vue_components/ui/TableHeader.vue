<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>

<template>
  <thead v-bind="attrs" :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
