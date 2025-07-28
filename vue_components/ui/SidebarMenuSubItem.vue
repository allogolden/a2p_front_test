<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <li :class="['pl-2', props.class]">
    <slot />
  </li>
</template>
