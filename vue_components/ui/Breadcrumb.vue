<script lang="ts" setup>
const props = defineProps<{ class?: string }>()
</script>
<template>
  <nav aria-label="breadcrumb" :class="props.class">
    <slot />
  </nav>
</template>
