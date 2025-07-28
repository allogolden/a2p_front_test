<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { Circle } from 'lucide-vue-next'
const props = defineProps<{ value: string; class?: string }>()
const attrs = useAttrs()
const selected = inject('radioValue') as any
const setSelected = inject('setRadioValue') as ((v:string)=>void)|undefined
</script>
<template>
  <button type="button" v-bind="attrs" :class="cn('aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center', props.class)" :aria-checked="selected?.value === props.value" role="radio" @click="setSelected && setSelected(props.value)">
    <Circle class="h-2.5 w-2.5 fill-current" v-if="selected?.value === props.value" />
  </button>
</template>
