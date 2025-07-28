<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>

<template>
  <tr v-bind="attrs" :class="cn('border-b transition-colors hover:bg-muted data-[state=selected]:bg-muted', props.class)">
    <slot />
  </tr>
</template>
