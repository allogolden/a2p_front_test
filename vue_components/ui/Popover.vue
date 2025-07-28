<script lang="ts" setup>
import { ref, provide } from 'vue'
const open = ref(false)
function setOpen(v: boolean) { open.value = v }
provide('popoverOpen', open)
provide('setPopoverOpen', setOpen)
</script>
<template>
  <span class="relative">
    <slot />
  </span>
</template>
