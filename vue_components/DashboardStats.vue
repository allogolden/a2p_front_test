<script lang="ts" setup>
import Card from './ui/Card.vue'
import CardContent from './ui/CardContent.vue'
import CardDescription from './ui/CardDescription.vue'
import CardHeader from './ui/CardHeader.vue'
import CardTitle from './ui/CardTitle.vue'
import Badge from './ui/Badge.vue'
import Progress from './ui/Progress.vue'
import { MessageSquare, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-vue-next'

const stats = [
  { title: 'Total Messages', value: '1,234,567', change: '+12.5%', trend: 'up', icon: MessageSquare },
  { title: 'Active Partners', value: '45', change: '+2', trend: 'up', icon: Users },
  { title: 'Success Rate', value: '98.7%', change: '+0.3%', trend: 'up', icon: TrendingUp },
  { title: 'Failed Messages', value: '1,234', change: '-5.2%', trend: 'down', icon: AlertTriangle },
]

const recentActivity = [
  { type: 'success', message: 'Message delivered to +998901234567', time: '2 min ago' },
  { type: 'error', message: 'Failed to deliver to +998901234568', time: '5 min ago' },
  { type: 'warning', message: 'Rate limit reached for Partner ABC', time: '10 min ago' },
  { type: 'success', message: 'New partner registered: XYZ Corp', time: '15 min ago' },
  { type: 'info', message: 'System maintenance completed', time: '1 hour ago' },
]
function getIcon(type:string){
  switch(type){
    case 'success': return CheckCircle
    case 'error': return XCircle
    case 'warning': return AlertTriangle
    default: return Clock
  }
}
</script>
<template>
  <div class="space-y-6">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">
            <span :class="stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">{{ stat.change }}</span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="(activity,index) in recentActivity" :key="index" class="flex items-center space-x-4">
              <component :is="getIcon(activity.type)" class="h-4 w-4" :class="{
                'text-green-500': activity.type==='success',
                'text-red-500': activity.type==='error',
                'text-yellow-500': activity.type==='warning',
                'text-blue-500': activity.type==='info'
              }" />
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">{{ activity.message }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system performance</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">CPU Usage</span>
              <span class="text-sm text-muted-foreground">45%</span>
            </div>
            <Progress :value="45" class="h-2" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Memory</span>
              <span class="text-sm text-muted-foreground">67%</span>
            </div>
            <Progress :value="67" class="h-2" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Storage</span>
              <span class="text-sm text-muted-foreground">23%</span>
            </div>
            <Progress :value="23" class="h-2" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Network</span>
              <Badge variant="default" class="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                Healthy
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
