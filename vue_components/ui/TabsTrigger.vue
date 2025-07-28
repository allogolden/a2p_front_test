<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string; value: string }>()
const attrs = useAttrs()

const tabsValue = inject('tabsValue') as any
const setTabsValue = inject('setTabsValue') as ((v: string) => void) | undefined
const isActive = computed(() => tabsValue && tabsValue.value === props.value)
</script>

<template>
  <button
    role="tab"
    type="button"
    :data-state="isActive ? 'active' : 'inactive'"
    @click="setTabsValue && setTabsValue(props.value)"
    v-bind="attrs"
    :class="cn('inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm', props.class)"
  >
    <slot />
  </button>
</template>
