<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
const attrs = useAttrs()
const open = inject('dropdownOpen') as any
const setOpen = inject('setDropdownOpen') as ((v:boolean)=>void)|undefined
</script>
<template>
  <button type="button" v-bind="attrs" @click="setOpen && setOpen(!open?.value)">
    <slot />
  </button>
</template>
