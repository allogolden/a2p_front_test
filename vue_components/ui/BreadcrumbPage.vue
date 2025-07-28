<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    v-bind="attrs"
    :class="cn('font-normal text-foreground', props.class)"
  >
    <slot />
  </span>
</template>
