<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronsUpDown, Plus } from 'lucide-vue-next'
import DropdownMenu from './ui/DropdownMenu.vue'
import DropdownMenuContent from './ui/DropdownMenuContent.vue'
import DropdownMenuItem from './ui/DropdownMenuItem.vue'
import DropdownMenuLabel from './ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from './ui/DropdownMenuSeparator.vue'
import DropdownMenuShortcut from './ui/DropdownMenuShortcut.vue'
import DropdownMenuTrigger from './ui/DropdownMenuTrigger.vue'
import SidebarMenu from './ui/SidebarMenu.vue'
import SidebarMenuItem from './ui/SidebarMenuItem.vue'
import SidebarMenuButton from './ui/SidebarMenuButton.vue'
import { useSidebar } from './ui/useSidebar'

const props = defineProps<{ teams: { name: string; logo: any; plan: string }[] }>()
const { isMobile } = useSidebar()
const activeTeam = ref(props.teams[0])
</script>
<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
              <component :is="activeTeam.logo" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ activeTeam.name }}</span>
              <span class="truncate text-xs">{{ activeTeam.plan }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56 rounded-lg" align="start" :side="isMobile ? 'bottom' : 'right'" sideOffset="4">
          <DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
          <DropdownMenuItem v-for="(team,index) in props.teams" :key="team.name" class="gap-2 p-2" @click="activeTeam = team">
            <div class="flex size-6 items-center justify-center rounded-sm border bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900">
              <component :is="team.logo" class="size-4 shrink-0" />
            </div>
            {{ team.name }}
            <DropdownMenuShortcut>⌘{{ index+1 }}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2">
            <div class="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus class="size-4" />
            </div>
            <div class="font-medium text-muted-foreground">Add team</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
