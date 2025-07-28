<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <li :class="['relative', props.class]">
    <slot />
  </li>
</template>
