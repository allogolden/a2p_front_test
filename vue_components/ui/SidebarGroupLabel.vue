<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div :class="['text-xs font-medium mb-2', props.class]">
    <slot />
  </div>
</template>
