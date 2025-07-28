<script lang="ts" setup>
import { computed } from 'vue'
import Breadcrumb from './ui/Breadcrumb.vue'
import BreadcrumbItem from './ui/BreadcrumbItem.vue'
import BreadcrumbLink from './ui/BreadcrumbLink.vue'
import BreadcrumbList from './ui/BreadcrumbList.vue'
import BreadcrumbPage from './ui/BreadcrumbPage.vue'
import BreadcrumbSeparator from './ui/BreadcrumbSeparator.vue'

const props = defineProps<{ path?: string }>()
const segments = computed(() => (props.path || '/dashboard').split('/').filter(Boolean))
const breadcrumbs = computed(() => {
  const list: { title: string; href: string; isLast: boolean }[] = []
  list.push({ title: 'Главная страница', href: '/dashboard', isLast: segments.value.length === 0 })
  for (let i = 0; i < segments.value.length; i++) {
    const segment = segments.value[i]
    if (segment === 'dashboard') continue
    const href = '/' + segments.value.slice(0, i + 1).join('/')
    const title = segment.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    list.push({ title, href, isLast: i === segments.value.length - 1 })
  }
  return list
})
</script>
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(crumb,index) in breadcrumbs" :key="crumb.href">
        <BreadcrumbSeparator v-if="index>0" />
        <BreadcrumbItem>
          <BreadcrumbPage v-if="crumb.isLast">{{ crumb.title }}</BreadcrumbPage>
          <template v-else>
            <BreadcrumbLink :href="crumb.href">{{ crumb.title }}</BreadcrumbLink>
          </template>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
