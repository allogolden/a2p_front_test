<script lang="ts" setup>
import ActionButton from './ActionButton.vue'
const props = defineProps<{ title: string; description?: string; action?: { label: string; onClick: () => void; icon?: any } }>()
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">{{ props.title }}</h1>
      <p v-if="props.description" class="text-muted-foreground">{{ props.description }}</p>
    </div>
    <ActionButton v-if="props.action" :onClick="props.action.onClick" :icon="props.action.icon">
      {{ props.action.label }}
    </ActionButton>
  </div>
</template>
