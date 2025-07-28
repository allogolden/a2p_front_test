<script lang="ts" setup>
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
const attrs = useAttrs()
</script>
<template>
  <img v-bind="attrs" :class="cn('aspect-square h-full w-full', props.class)" />
</template>
