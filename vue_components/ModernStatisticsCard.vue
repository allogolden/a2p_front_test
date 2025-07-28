<script lang="ts" setup>
import { computed } from 'vue'
import { TrendingUp, TrendingDown, Minus } from 'lucide-vue-next'
import Card from './ui/Card.vue'
import CardContent from './ui/CardContent.vue'
import Badge from './ui/Badge.vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ title: string; value: string | number; subtitle?: string; icon: any; trend?: 'up' | 'down' | 'neutral'; trendValue?: string; color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'; loading?: boolean }>()

const colorVariants:any = {
  blue: { bg:'bg-blue-50/50', icon:'bg-blue-100 text-blue-600', trend:'text-blue-600' },
  green:{ bg:'bg-green-50/50', icon:'bg-green-100 text-green-600', trend:'text-green-600' },
  orange:{ bg:'bg-orange-50/50', icon:'bg-orange-100 text-orange-600', trend:'text-orange-600' },
  red:{ bg:'bg-red-50/50', icon:'bg-red-100 text-red-600', trend:'text-red-600' },
  purple:{ bg:'bg-purple-50/50', icon:'bg-purple-100 text-purple-600', trend:'text-purple-600' }
}
const colors = computed(()=>colorVariants[props.color || 'blue'])
const TrendIcon = computed(()=> props.trend==='up'?TrendingUp: props.trend==='down'?TrendingDown:Minus)
</script>
<template>
  <Card v-if="props.loading" class="bg-card/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-300">
    <CardContent class="p-6">
      <div class="animate-pulse">
        <div class="flex items-start justify-between mb-4">
          <div class="space-y-2">
            <div class="h-4 bg-muted rounded w-24"></div>
            <div class="h-8 bg-muted rounded w-32"></div>
          </div>
          <div class="w-12 h-12 bg-muted rounded-xl"></div>
        </div>
        <div class="h-4 bg-muted rounded w-20"></div>
      </div>
    </CardContent>
  </Card>
  <Card v-else :class="cn('bg-card/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]', colors.value.bg)">
    <CardContent class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="space-y-2">
          <p class="text-sm font-medium text-muted-foreground">{{ props.title }}</p>
          <p class="text-3xl font-bold group-hover:text-foreground transition-colors">{{ typeof props.value==='number' ? props.value.toLocaleString() : props.value }}</p>
        </div>
        <div :class="cn('p-3 rounded-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center', colors.value.icon)">
          <component :is="props.icon" class="w-6 h-6 flex-shrink-0" />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <p v-if="props.subtitle" class="text-sm text-muted-foreground flex-1">{{ props.subtitle }}</p>
        <Badge v-if="props.trendValue" variant="secondary" :class="cn('ml-2 flex items-center gap-1 transition-colors', props.trend==='up' ? 'bg-green-100 text-green-700 hover:bg-green-200' : props.trend==='down' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')">
          <component :is="TrendIcon.value" class="w-3 h-3" />
          {{ props.trendValue }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
