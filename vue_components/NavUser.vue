<script lang="ts" setup>
import { LogOut, User } from 'lucide-vue-next'
import Avatar from './ui/Avatar.vue'
import AvatarFallback from './ui/AvatarFallback.vue'
import AvatarImage from './ui/AvatarImage.vue'
import DropdownMenu from './ui/DropdownMenu.vue'
import DropdownMenuContent from './ui/DropdownMenuContent.vue'
import DropdownMenuItem from './ui/DropdownMenuItem.vue'
import DropdownMenuLabel from './ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from './ui/DropdownMenuSeparator.vue'
import DropdownMenuTrigger from './ui/DropdownMenuTrigger.vue'
import SidebarMenu from './ui/SidebarMenu.vue'
import SidebarMenuButton from './ui/SidebarMenuButton.vue'
import SidebarMenuItem from './ui/SidebarMenuItem.vue'
import { useSidebar } from './ui/useSidebar'

const props = defineProps<{ user?: { username:string; email:string; avatar?:string }; logout?: () => void }>()
const { isMobile } = useSidebar()
</script>
<template>
  <SidebarMenu v-if="props.user">
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="props.user.avatar || '/placeholder.svg'" :alt="props.user.username" />
              <AvatarFallback class="rounded-lg">{{ props.user.username.substring(0,2).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ props.user.username }}</span>
              <span class="truncate text-xs">{{ props.user.email }}</span>
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56 rounded-lg" :side="isMobile ? 'bottom' : 'right'" align="end" side-offset="4">
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="props.user.avatar || '/placeholder.svg'" :alt="props.user.username" />
                <AvatarFallback class="rounded-lg">{{ props.user.username.substring(0,2).toUpperCase() }}</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ props.user.username }}</span>
                <span class="truncate text-xs">{{ props.user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User /> Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="props.logout">
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
