<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import Checkbox from '../ui/Checkbox.vue'
import Table from '../ui/Table.vue'
import TableBody from '../ui/TableBody.vue'
import TableCell from '../ui/TableCell.vue'
import TableHead from '../ui/TableHead.vue'
import TableHeader from '../ui/TableHeader.vue'
import TableRow from '../ui/TableRow.vue'
import SearchInput from './SearchInput.vue'
import ActionButton from './ActionButton.vue'
import StatusBadge from './StatusBadge.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import FiltersDropdown from './FiltersDropdown.vue'

interface Column { key: string; label: string; render?: (value:any,item:any) => any }
const props = defineProps<{ columns: Column[]; data: any[]; onRowClick?: (item:any)=>void; onAdd?: ()=>void; addLabel?: string; searchPlaceholder?: string; filters?: Record<string,string[]>; isLoading?: boolean }>()
const searchTerm = ref('')
const activeFilters = ref<Record<string,string[]>>({})
const filteredData = computed(() => {
  return props.data.filter(item => {
    const matchesSearch = Object.values(item).some(v => String(v).toLowerCase().includes(searchTerm.value.toLowerCase()))
    const matchesFilters = Object.entries(activeFilters.value).every(([cat,vals]) => {
      if(vals.length===0) return true
      const itemVal = item[cat.toLowerCase()]
      return vals.includes(itemVal)
    })
    return matchesSearch && matchesFilters
  })
})
</script>
<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <SearchInput v-model:value="searchTerm.value" :placeholder="props.searchPlaceholder" />
      <FiltersDropdown :filters="props.filters || {}" :activeFilters="activeFilters.value" @onFiltersChange="val => activeFilters.value = val" />
      <ActionButton v-if="props.onAdd" @click="props.onAdd" :icon="Plus">{{ props.addLabel || 'Add Item' }}</ActionButton>
    </div>
    <div v-if="props.isLoading" class="rounded-lg border bg-card p-8">
      <LoadingSpinner size="lg" />
    </div>
    <div v-else class="w-full rounded-lg border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow class="hover:bg-muted">
            <TableHead class="w-12"><Checkbox /></TableHead>
            <TableHead v-for="col in props.columns" :key="col.key" class="font-medium text-muted-foreground">{{ col.label }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(item,index) in filteredData" :key="item.id || index" class="cursor-pointer hover:bg-muted transition-colors" @click="props.onRowClick && props.onRowClick(item)">
            <TableCell><Checkbox @click.stop /></TableCell>
            <TableCell v-for="col in props.columns" :key="col.key" class="font-medium">
              <template v-if="col.render">{{ col.render(item[col.key], item) }}</template>
              <template v-else-if="col.key.toLowerCase().includes('status')"><StatusBadge :status="item[col.key]" /></template>
              <template v-else>{{ item[col.key] }}</template>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
