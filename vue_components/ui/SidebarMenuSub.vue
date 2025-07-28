<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <ul :class="['pl-4 mt-1 space-y-1', props.class]">
    <slot />
  </ul>
</template>
