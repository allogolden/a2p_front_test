<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
