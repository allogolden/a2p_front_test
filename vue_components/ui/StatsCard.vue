<script lang="ts" setup>
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import type { Component } from 'vue'
const props = defineProps<{ title: string; value: string | number; icon: Component; footer?: unknown; iconClassName?: string }>()
</script>
<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-muted-foreground">{{ props.title }}</p>
          <p class="text-2xl font-bold">{{ props.value }}</p>
        </div>
        <component :is="props.icon" :class="props.iconClassName ?? 'h-8 w-8 text-blue-600'" />
      </div>
      <div v-if="props.footer" class="mt-2 text-xs text-muted-foreground flex items-center">
        <slot name="footer">{{ props.footer }}</slot>
      </div>
    </CardContent>
  </Card>
</template>
