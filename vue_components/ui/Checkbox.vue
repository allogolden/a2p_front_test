<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { useAttrs } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{ modelValue?: boolean; class?: string }>()
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <label :class="cn('inline-flex items-center', props.class)">
    <input
      type="checkbox"
      class="peer sr-only"
      :checked="props.modelValue"
      @change="onChange"
      v-bind="attrs"
    />
    <span
      class="h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center text-current"
      :class="{ 'bg-primary text-primary-foreground': props.modelValue }"
    >
      <Check class="h-4 w-4" v-if="props.modelValue" />
    </span>
  </label>
</template>
