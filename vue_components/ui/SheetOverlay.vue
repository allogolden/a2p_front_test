<script lang="ts" setup>
import { inject } from 'vue'
const open = inject('sheetOpen') as any
const setOpen = inject('setSheetOpen') as ((v:boolean)=>void)|undefined
</script>
<template>
  <div v-if="open?.value" class="fixed inset-0 z-50 bg-black/80" @click="setOpen && setOpen(false)" />
</template>
