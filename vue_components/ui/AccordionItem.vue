<script lang="ts" setup>
import { ref, watch, provide } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; modelValue?: boolean; defaultOpen?: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const open = ref(props.modelValue ?? props.defaultOpen ?? false)
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) open.value = v
  }
)
function toggle() {
  open.value = !open.value
  emit('update:modelValue', open.value)
}

provide('accordionOpen', open)
provide('toggleAccordionOpen', toggle)
</script>

<template>
  <div :class="cn('border-b', props.class)">
    <slot />
  </div>
</template>
