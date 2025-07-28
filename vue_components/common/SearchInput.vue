<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import Input from '../ui/Input.vue'
const props = defineProps<{ value: string; placeholder?: string; class?: string }>()
const emit = defineEmits<{ (e:'update:value', value: string): void }>()
function onInput(e: Event) {
  emit('update:value', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <div :class="`relative flex-1 max-w-md ${props.class || ''}`">
    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input class="pl-10" :placeholder="props.placeholder || 'Search...'" :value="props.value" @input="onInput" />
  </div>
</template>
