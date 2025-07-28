<script lang="ts" setup>
import { Filter, X } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import DropdownMenu from '../ui/DropdownMenu.vue'
import DropdownMenuTrigger from '../ui/DropdownMenuTrigger.vue'
import DropdownMenuContent from '../ui/DropdownMenuContent.vue'
import DropdownMenuLabel from '../ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '../ui/DropdownMenuSeparator.vue'
import Checkbox from '../ui/Checkbox.vue'
import Label from '../ui/Label.vue'
import Badge from '../ui/Badge.vue'
const props = defineProps<{ filters: Record<string,string[]>; activeFilters: Record<string,string[]>; onFiltersChange: (f:Record<string,string[]>)=>void }>()
function handleFilterChange(cat:string, value:string, checked:boolean){
  const newFilters = { ...props.activeFilters }
  if(!newFilters[cat]) newFilters[cat] = []
  if(checked) newFilters[cat] = [...newFilters[cat], value]
  else newFilters[cat] = newFilters[cat].filter(v => v!==value)
  if(newFilters[cat].length===0) delete newFilters[cat]
  props.onFiltersChange(newFilters)
}
function clearAll(){ props.onFiltersChange({}) }
const activeCount = Object.values(props.activeFilters).flat().length
</script>
<template>
  <div class="flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="relative">
          <Filter class="mr-2 h-4 w-4" />
          Filters
          <Badge v-if="activeCount>0" variant="secondary" class="ml-2 h-5 w-5 rounded-full p-0 text-xs">{{ activeCount }}</Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-64" align="end">
        <div class="flex items-center justify-between p-2">
          <DropdownMenuLabel class="p-0">Filters</DropdownMenuLabel>
          <Button v-if="activeCount>0" variant="ghost" size="sm" @click="clearAll">Clear all</Button>
        </div>
        <DropdownMenuSeparator />
        <div v-for="(values,category) in props.filters" :key="category" class="p-2">
          <Label class="text-sm font-medium capitalize">{{ category }}</Label>
          <div class="mt-2 space-y-2">
            <div v-for="value in values" :key="value" class="flex items-center space-x-2">
              <Checkbox :id="`${category}-${value}`" :checked="props.activeFilters[category]?.includes(value) || false" @update:checked="val => handleFilterChange(category,value,val as boolean)" />
              <Label :for="`${category}-${value}`" class="text-sm">{{ value }}</Label>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
    <template v-for="(values,category) in props.activeFilters">
      <Badge v-for="value in values" :key="`${category}-${value}`" variant="secondary" class="gap-1">
        {{ value }}
        <X class="h-3 w-3 cursor-pointer" @click="handleFilterChange(category,value,false)" />
      </Badge>
    </template>
  </div>
</template>
