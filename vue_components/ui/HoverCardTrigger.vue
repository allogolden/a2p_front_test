<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
const attrs = useAttrs()
const setOpen = inject('setHoverCardOpen') as ((v:boolean)=>void)|undefined
</script>
<template>
  <span v-bind="attrs" @mouseenter="setOpen && setOpen(true)" @mouseleave="setOpen && setOpen(false)">
    <slot />
  </span>
</template>
