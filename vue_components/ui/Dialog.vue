<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
const props = defineProps<{ modelValue?: boolean; defaultOpen?: boolean }>()
const emit = defineEmits<{(e:'update:modelValue', value:boolean): void}>()

const open = ref(props.modelValue ?? props.defaultOpen ?? false)
watch(() => props.modelValue, v => { if (v !== undefined) open.value = v })
function setOpen(v: boolean) { open.value = v; emit('update:modelValue', v) }
provide('dialogOpen', open)
provide('setDialogOpen', setOpen)
</script>
<template>
  <slot />
</template>
