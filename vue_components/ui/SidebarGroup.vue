<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div :class="['p-2', props.class]">
    <slot />
  </div>
</template>
