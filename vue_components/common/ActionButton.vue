<script lang="ts" setup>
import Button from '../ui/Button.vue'
import { defineProps } from 'vue'

const props = defineProps<{ onClick?: () => void; icon?: any; variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'; size?: 'default' | 'sm' | 'lg' | 'icon'; class?: string; disabled?: boolean }>()
</script>
<template>
  <Button :variant="props.variant" :size="props.size" :disabled="props.disabled" :class="props.class" @click="props.onClick">
    <component v-if="props.icon" :is="props.icon" class="mr-2 h-4 w-4" />
    <slot />
  </Button>
</template>
