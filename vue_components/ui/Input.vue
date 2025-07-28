<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; type?: string }>()
const attrs = useAttrs()
</script>

<template>
  <input
    :type="props.type"
    v-bind="attrs"
    :class="cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', props.class)"
  />
</template>
