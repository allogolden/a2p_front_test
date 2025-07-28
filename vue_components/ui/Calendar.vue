<script lang="ts" setup>
import { useAttrs } from 'vue'
const props = defineProps<{ class?: string; modelValue?: Date }>()
const attrs = useAttrs()
</script>
<template>
  <input type="date" v-bind="attrs" :class="props.class" />
</template>
