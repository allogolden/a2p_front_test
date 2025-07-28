<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
const setTooltipShow = inject('setTooltipShow') as ((v: boolean) => void) | undefined
</script>
<template>
  <span
    v-bind="attrs"
    :class="props.class"
    @mouseenter="setTooltipShow && setTooltipShow(true)"
    @mouseleave="setTooltipShow && setTooltipShow(false)"
  >
    <slot />
  </span>
</template>
