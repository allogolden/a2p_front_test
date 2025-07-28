<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
const setOpen = inject<(v:boolean)=>void>('setDialogOpen')
const props = defineProps<{ as?: string }>()
const attrs = useAttrs()
const tag = computed(() => props.as || 'button')
function handle() { if (setOpen) setOpen(false) }
</script>
<template>
  <component :is="tag" v-bind="attrs" @click="handle">
    <slot />
  </component>
</template>
