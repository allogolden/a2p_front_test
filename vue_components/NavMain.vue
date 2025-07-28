<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next'
import Collapsible from './ui/Collapsible.vue'
import CollapsibleContent from './ui/CollapsibleContent.vue'
import CollapsibleTrigger from './ui/CollapsibleTrigger.vue'
import SidebarGroup from './ui/SidebarGroup.vue'
import SidebarGroupLabel from './ui/SidebarGroupLabel.vue'
import SidebarMenu from './ui/SidebarMenu.vue'
import SidebarMenuButton from './ui/SidebarMenuButton.vue'
import SidebarMenuItem from './ui/SidebarMenuItem.vue'
import SidebarMenuSub from './ui/SidebarMenuSub.vue'
import SidebarMenuSubButton from './ui/SidebarMenuSubButton.vue'
import SidebarMenuSubItem from './ui/SidebarMenuSubItem.vue'

const props = defineProps<{ items: { title: string; url: string; icon?: any; isActive?: boolean; items?: { title: string; url: string }[] }[] }>()
</script>
<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in props.items" :key="item.title">
        <Collapsible as-child :default-open="item.isActive" class="group/collapsible">
          <SidebarMenuItem>
            <template v-if="item.items && item.items.length">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton :isActive="item.isActive">
                  <component v-if="item.icon" :is="item.icon" />
                  <span>{{ item.title }}</span>
                  <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="sub in item.items" :key="sub.title">
                    <SidebarMenuSubButton :isActive="false" as-child>
                      <a :href="sub.url"><span>{{ sub.title }}</span></a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </template>
            <template v-else>
              <SidebarMenuButton :isActive="item.isActive" as-child>
                <a :href="item.url">
                  <component v-if="item.icon" :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </template>
          </SidebarMenuItem>
        </Collapsible>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
