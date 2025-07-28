<script lang="ts" setup>
import Badge from '../ui/Badge.vue'
const props = defineProps<{ status: string; variant?: 'default' | 'destructive' | 'outline' | 'secondary' }>()
function getStatusColor(status: string) {
  const s = status.toLowerCase()
  if (['active','delivered','success'].includes(s)) return 'bg-green-100 text-green-800 border-green-200'
  if (['inactive','failed','error'].includes(s)) return 'bg-red-100 text-red-800 border-red-200'
  if (['pending','processing'].includes(s)) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-gray-100 text-gray-800 border-gray-200'
}
</script>
<template>
  <Badge :variant="props.variant" :class="getStatusColor(props.status)">
    {{ props.status }}
  </Badge>
</template>
