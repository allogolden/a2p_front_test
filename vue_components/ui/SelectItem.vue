<script lang="ts" setup>
import { useAttrs } from 'vue'
const props = defineProps<{ value: string }>()
const attrs = useAttrs()
</script>
<template>
  <option v-bind="attrs" :value="props.value">
    <slot />
  </option>
</template>
