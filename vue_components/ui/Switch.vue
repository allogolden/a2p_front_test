<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useAttrs } from 'vue'

const props = defineProps<{ modelValue?: boolean; class?: string }>()
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <label
    :class="cn('relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.modelValue ? 'bg-primary' : 'bg-input', props.class)"
  >
    <input
      type="checkbox"
      class="sr-only"
      :checked="props.modelValue"
      @change="onChange"
      v-bind="attrs"
    />
    <span
      class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform"
      :class="props.modelValue ? 'translate-x-5' : 'translate-x-0'"
    />
  </label>
</template>
