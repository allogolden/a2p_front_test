<script lang="ts" setup>
import { ref, provide } from 'vue'
const props = defineProps<{ class?: string }>()
const open = ref(true)
function setOpen(v:boolean){ open.value = v }
function toggleSidebar(){ open.value = !open.value }
provide('sidebarOpen', open)
provide('setSidebarOpen', setOpen)
provide('toggleSidebar', toggleSidebar)
provide('sidebarIsMobile', false)
</script>
<template>
  <aside :class="props.class">
    <slot />
  </aside>
</template>
