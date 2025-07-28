<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ modelValue?: string; class?: string }>()
const emit = defineEmits<{(e:'update:modelValue', value:string):void}>()
const attrs = useAttrs()
function onChange(e: Event) { emit('update:modelValue', (e.target as HTMLSelectElement).value) }
</script>
<template>
  <select v-bind="attrs" :value="props.modelValue" @change="onChange" :class="cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)">
    <slot />
  </select>
</template>
