<script lang="ts" setup>
import { ref, watch, provide } from 'vue'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  class?: string
}>()
const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>()

const current = ref(props.modelValue ?? props.defaultValue ?? '')
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) current.value = v
  }
)
function setValue(val: string) {
  current.value = val
  emit('update:modelValue', val)
}

provide('tabsValue', current)
provide('setTabsValue', setValue)
</script>
<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
