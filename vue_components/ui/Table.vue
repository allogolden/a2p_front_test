<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>

<template>
  <div class="relative w-full overflow-x-auto">
    <table v-bind="attrs" :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
