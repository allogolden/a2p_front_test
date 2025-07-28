<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
const props = defineProps<{ as?: string }>()
const attrs = useAttrs()
const tag = computed(() => props.as || 'button')
const setOpen = inject<(v:boolean)=>void>('setSheetOpen')
</script>
<template>
  <component :is="tag" v-bind="attrs" @click="setOpen && setOpen(true)">
    <slot />
  </component>
</template>
