<script lang="ts" setup>
import { ref, provide } from 'vue'
const show = ref(false)
function setShow(v: boolean) { show.value = v }
provide('tooltipShow', show)
provide('setTooltipShow', setShow)
</script>
<template>
  <span class="relative">
    <slot />
  </span>
</template>
