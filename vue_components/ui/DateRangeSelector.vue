<script setup lang="ts">
import Calendar from 'lucide-vue-next/dist/esm/icons/calendar'
import Select from './Select.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
const props = defineProps<{ value: string; ranges?: { label: string; value: string }[] }>()
const emit = defineEmits<{ (e:'update:value', v:string): void }>()
const options = props.ranges || [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last year', value: '1y' },
  { label: 'All time', value: 'all' },
]
</script>
<template>
  <div class="flex items-center gap-2">
    <Calendar class="h-4 w-4 text-muted-foreground" />
    <Select :modelValue="props.value" @update:modelValue="v=>emit('update:value', v)">
      <SelectTrigger class="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
