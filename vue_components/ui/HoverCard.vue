<script lang="ts" setup>
import { ref, provide } from 'vue'
const open = ref(false)
function setOpen(v: boolean) { open.value = v }
provide('hoverCardOpen', open)
provide('setHoverCardOpen', setOpen)
</script>
<template>
  <span class="relative" @mouseenter="setOpen(true)" @mouseleave="setOpen(false)">
    <slot />
  </span>
</template>
