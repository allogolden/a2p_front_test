<script lang="ts" setup>
import { MessageSquare, BarChart3, Users, Database, Settings, Clock } from 'lucide-vue-next'
import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import TeamSwitcher from './TeamSwitcher.vue'
import Sidebar from './ui/Sidebar.vue'
import SidebarHeader from './ui/SidebarHeader.vue'
import SidebarContent from './ui/SidebarContent.vue'
import SidebarFooter from './ui/SidebarFooter.vue'
import SidebarRail from './ui/SidebarRail.vue'

const data = {
  teams: [ { name: 'A2P Platform', logo: MessageSquare, plan: 'Enterprise' } ],
  navMain: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3, isActive: true },
    { title: 'Partner Settings', url: '#', icon: Users, items: [
        { title: 'AN Patterns', url: '/an-patterns' },
        { title: 'Aplhanames', url: '/alphanames' },
        { title: 'CTNs', url: '/ctns' },
        { title: 'Partners', url: '/partners' },
        { title: 'Partners Statistics', url: '/partners-statistics' },
        { title: 'SHN Patterns', url: '/shn-patterns' },
        { title: 'Short numbers', url: '/short-numbers' },
    ]},
    { title: 'Logs', url: '#', icon: Database, items: [
        { title: 'Audit Logs', url: '/audit-logs' },
        { title: 'MO Interceptor logs', url: '/mo-interceptor-logs' },
        { title: 'MT Interceptor Logs', url: '/mt-interceptor-logs' },
        { title: 'Spams', url: '/spams' },
    ]},
    { title: 'Categories', url: '#', icon: BarChart3, items: [
        { title: 'Category MT', url: '/category-mt' },
        { title: 'Category Statistics', url: '/category-statistics' },
    ]},
    { title: 'SM', url: '#', icon: MessageSquare, items: [
        { title: 'Deliver SM (DLR)', url: '/deliver-sm-dlr' },
        { title: 'Deliver SM (P2A)', url: '/deliver-sm-p2a' },
        { title: 'Submit SM', url: '/submit-sm' },
        { title: 'Submit SM Response', url: '/submit-sm-response' },
    ]},
    { title: 'System Settings', url: '#', icon: Settings, items: [
        { title: 'Groups', url: '/groups' },
        { title: 'CDR Settings', url: '/cdr-settings' },
        { title: 'Custom users', url: '/custom-users' },
        { title: 'Sites', url: '/sites' },
        { title: 'Regex Patterns', url: '/regex-patterns' },
    ]},
    { title: 'Periodic Tasks', url: '#', icon: Clock, items: [
        { title: 'Clocked', url: '/periodic-tasks/clocked' },
        { title: 'Crontabs', url: '/periodic-tasks/crontabs' },
        { title: 'Intervals', url: '/periodic-tasks/intervals' },
        { title: 'Periodic tasks', url: '/periodic-tasks/periodic-tasks' },
        { title: 'Solar events', url: '/periodic-tasks/solar-events' },
    ]},
    { title: 'Messages', url: '#', icon: MessageSquare, items: [
        { title: 'MO Messages', url: '/mo-messages' },
        { title: 'MT Messages', url: '/mt-messages' },
    ]},
  ]
}
</script>
<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
