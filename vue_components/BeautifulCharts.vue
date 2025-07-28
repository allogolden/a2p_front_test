<script lang="ts" setup>
import Card from './ui/Card.vue'
import CardContent from './ui/CardContent.vue'
import CardHeader from './ui/CardHeader.vue'
import CardTitle from './ui/CardTitle.vue'
import Button from './ui/Button.vue'
import { Download, Maximize2, MoreHorizontal } from 'lucide-vue-next'
const props = defineProps<{ data: {name:string; value:number}[]; title: string; type: 'pie' | 'bar' | 'line' | 'doughnut'; height?: number }>()
</script>
<template>
  <Card class="shadow-xl border-0">
    <CardHeader class="pb-4">
      <div class="flex items-center justify-between">
        <CardTitle class="text-xl font-bold">{{ props.title }}</CardTitle>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Download class="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon"><Maximize2 class="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon"><MoreHorizontal class="w-4 h-4" /></Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex items-center justify-center text-muted-foreground" :style="{height: (props.height || 400)+'px'}">
        Chart for {{ props.type }} not implemented
      </div>
    </CardContent>
  </Card>
</template>
