<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; value: string }>()
const attrs = useAttrs()
const tabsValue = inject('tabsValue') as any
</script>

<template>
  <div
    role="tabpanel"
    v-show="tabsValue && tabsValue.value === props.value"
    v-bind="attrs"
    :class="cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)"
  >
    <slot />
  </div>
</template>
