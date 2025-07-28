<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ modelValue?: number; min?: number; max?: number; step?: number; class?: string }>()
const emit = defineEmits<{ (e:'update:modelValue', value:number): void }>()
const attrs = useAttrs()
function onInput(e: Event) {
  emit('update:modelValue', +(e.target as HTMLInputElement).value)
}
</script>
<template>
  <input
    type="range"
    v-bind="attrs"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :value="props.modelValue"
    @input="onInput"
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
  />
</template>
