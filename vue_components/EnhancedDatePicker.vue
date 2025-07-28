<script lang="ts" setup>
import { ref, watch } from 'vue'
import Calendar from './ui/Calendar.vue'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import Label from './ui/Label.vue'
import Popover from './ui/Popover.vue'
import PopoverTrigger from './ui/PopoverTrigger.vue'
import PopoverContent from './ui/PopoverContent.vue'
import { CalendarIcon, RotateCcw } from 'lucide-vue-next'
import { format, parse, isValid, subDays, startOfDay, endOfDay } from 'date-fns'

const props = defineProps<{ from?: Date; to?: Date; onDateChange: (from?: Date, to?: Date) => void; class?: string }>()

const presets = [
  { label: 'Today', getValue: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
  { label: 'Yesterday', getValue: () => ({ from: startOfDay(subDays(new Date(),1)), to: endOfDay(subDays(new Date(),1)) }) },
  { label: 'Last 7 days', getValue: () => ({ from: startOfDay(subDays(new Date(),6)), to: endOfDay(new Date()) }) },
  { label: 'Last 30 days', getValue: () => ({ from: startOfDay(subDays(new Date(),29)), to: endOfDay(new Date()) }) },
  { label: 'This month', getValue: () => ({ from: startOfDay(subDays(new Date(), new Date().getDate()-1)), to: endOfDay(new Date()) }) }
]

const fromOpen = ref(false)
const toOpen = ref(false)
const fromInput = ref(props.from ? format(props.from,'yyyy-MM-dd') : '')
const toInput = ref(props.to ? format(props.to,'yyyy-MM-dd') : '')

watch(() => props.from, v => { fromInput.value = v ? format(v,'yyyy-MM-dd') : '' })
watch(() => props.to, v => { toInput.value = v ? format(v,'yyyy-MM-dd') : '' })

function handleFromInputChange(value:string){
  fromInput.value = value
  if(value){ const d = parse(value,'yyyy-MM-dd', new Date()); if(isValid(d)) props.onDateChange(startOfDay(d), props.to) }
  else props.onDateChange(undefined, props.to)
}
function handleToInputChange(value:string){
  toInput.value = value
  if(value){ const d = parse(value,'yyyy-MM-dd', new Date()); if(isValid(d)) props.onDateChange(props.from, endOfDay(d)) }
  else props.onDateChange(props.from, undefined)
}
function handlePreset(p:{label:string; getValue:()=>{from:Date,to:Date}}){ const {from,to} = p.getValue(); props.onDateChange(from,to) }
function handleReset(){ props.onDateChange(undefined,undefined) }
</script>
<template>
  <div :class="['space-y-4', props.class]">
    <div class="flex flex-wrap gap-2">
      <Button v-for="preset in presets" :key="preset.label" variant="outline" size="sm" class="text-xs" @click="handlePreset(preset)">{{ preset.label }}</Button>
      <Button variant="outline" size="sm" class="text-xs" @click="handleReset"><RotateCcw class="w-3 h-3 mr-1" />Reset</Button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label class="text-sm font-medium">From Date</Label>
        <div class="flex gap-2">
          <div class="flex-1"><Input type="date" :value="fromInput" @input="e=>handleFromInputChange((e.target as HTMLInputElement).value)" /></div>
          <Popover :open="fromOpen" @update:open="v=>fromOpen=v">
            <PopoverTrigger as-child>
              <Button variant="outline" size="icon"><CalendarIcon class="h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar @change="d=>{ if(d) props.onDateChange(startOfDay(d as any), props.to); fromInput = format(d as any,'yyyy-MM-dd'); fromOpen=false }" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div class="space-y-2">
        <Label class="text-sm font-medium">To Date</Label>
        <div class="flex gap-2">
          <div class="flex-1"><Input type="date" :value="toInput" @input="e=>handleToInputChange((e.target as HTMLInputElement).value)" /></div>
          <Popover :open="toOpen" @update:open="v=>toOpen=v">
            <PopoverTrigger as-child>
              <Button variant="outline" size="icon"><CalendarIcon class="h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar @change="d=>{ if(d) props.onDateChange(props.from, endOfDay(d as any)); toInput = format(d as any,'yyyy-MM-dd'); toOpen=false }" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
    <div v-if="props.from && props.to" class="p-3 bg-muted border rounded-lg">
      <div class="flex items-center gap-2 text-sm">
        <CalendarIcon class="w-4 h-4" />
        <span class="font-medium">Selected Range:</span>
        <span>{{ format(props.from,'MMM dd, yyyy') }} - {{ format(props.to,'MMM dd, yyyy') }}</span>
      </div>
    </div>
  </div>
</template>
