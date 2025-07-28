<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ asChild?: boolean; class?: string; href?: string }>()
const attrs = useAttrs()
</script>
<template>
  <component
    :is="props.asChild ? 'span' : 'a'"
    :href="props.asChild ? undefined : props.href"
    v-bind="attrs"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </component>
</template>
