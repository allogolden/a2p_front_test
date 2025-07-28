<script lang="ts" setup>
import { useAttrs } from 'vue'
const props = defineProps<{ class?: string; isActive?: boolean }>()
const attrs = useAttrs()
</script>
<template>
  <button v-bind="attrs" :class="['flex w-full items-center gap-2 p-2 rounded-md text-sm', props.isActive ? 'bg-muted' : '', props.class]">
    <slot />
  </button>
</template>
