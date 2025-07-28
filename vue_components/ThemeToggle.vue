<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import Button from './ui/Button.vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggle">
    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" :class="{ 'dark:-rotate-90 dark:scale-0': true }" v-show="!isDark" />
    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" :class="{ 'dark:rotate-0 dark:scale-100': true }" v-show="isDark" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
