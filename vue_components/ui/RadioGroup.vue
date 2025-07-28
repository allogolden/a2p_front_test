<script lang="ts" setup>
import { ref, watch, provide } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ modelValue?: string; defaultValue?: string; class?: string }>()
const emit = defineEmits<{(e:'update:modelValue', value:string):void}>()
const value = ref(props.modelValue ?? props.defaultValue ?? '')
watch(() => props.modelValue, v => { if(v !== undefined) value.value = v })
function setValue(v: string) { value.value = v; emit('update:modelValue', v) }
provide('radioValue', value)
provide('setRadioValue', setValue)
</script>
<template>
  <div role="radiogroup" :class="cn('grid gap-2', props.class)">
    <slot />
  </div>
</template>
