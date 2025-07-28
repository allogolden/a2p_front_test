<script lang="ts" setup>
import { useSlots } from 'vue'
import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardContent from './CardContent.vue'
import CardTitle from './CardTitle.vue'
import CardDescription from './CardDescription.vue'
const props = defineProps<{ title: string; description: string }>()
const slots = useSlots()
</script>
<template>
  <Card class="h-full">
    <CardHeader>
      <div v-if="slots.icon" class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <slot name="icon" />
      </div>
      <CardTitle>{{ props.title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription class="text-base">{{ props.description }}</CardDescription>
    </CardContent>
  </Card>
</template>
