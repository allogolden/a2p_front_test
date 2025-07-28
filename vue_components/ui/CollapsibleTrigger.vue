<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
const setOpen = inject<((v:boolean)=>void)>('setCollapsibleOpen')
const open = inject('collapsibleOpen') as any
const props = defineProps<{ as?: string }>()
const attrs = useAttrs()
const tag = computed(() => props.as || 'button')
function onClick() { if (setOpen) setOpen(!open?.value) }
</script>
<template>
  <component :is="tag" v-bind="attrs" @click="onClick">
    <slot />
  </component>
</template>
