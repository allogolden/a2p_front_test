<script lang="ts" setup>
import { inject } from 'vue'
const props = defineProps<{ class?: string }>()
const open = inject('collapsibleOpen') as any
</script>
<template>
  <div v-show="open?.value" :class="props.class">
    <slot />
  </div>
</template>
