<script lang="ts" setup>
import { computed, useAttrs, ref, watch } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const props = defineProps<{ modelValue?: boolean; defaultPressed?: boolean; variant?: VariantProps<typeof toggleVariants>["variant"]; size?: VariantProps<typeof toggleVariants>["size"]; class?: string }>()
const emit = defineEmits<{(e:'update:modelValue', value:boolean):void}>()
const attrs = useAttrs()

const pressed = ref(props.modelValue ?? props.defaultPressed ?? false)
watch(() => props.modelValue, v => { if(v !== undefined) pressed.value = v })
function onClick() { pressed.value = !pressed.value; emit('update:modelValue', pressed.value) }

const classes = computed(() => cn(toggleVariants({ variant: props.variant, size: props.size, className: props.class })))
</script>
<template>
  <button type="button" @click="onClick" v-bind="attrs" :data-state="pressed ? 'on' : 'off'" :class="classes">
    <slot />
  </button>
</template>
