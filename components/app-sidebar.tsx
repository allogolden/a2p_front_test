"use client"

import type * as React from "react"
import {
  Database,
  FileText,
  Settings,
  Users,
  MessageSquare,
  Shield,
  BarChart3,
  Clock,
  Globe,
  Hash,
  Phone,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "A2P Platform",
      logo: MessageSquare,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Partner Settings",
      url: "#",
      icon: Users,
      items: [
        { title: "AN Patterns", url: "/an-patterns" },
        { title: "Aplhanames", url: "/alphanames" },     // 2
        { title: "CTNs", url: "/ctns" },                   // 6
        { title: "Partners", url: "/partners" },           // 16
        { title: "Partners Statistics", url: "/partners-statistics" }, // 17
        { title: "Regex Patterns", url: "/regex-patterns" }, // 19
        { title: "SHN Patterns", url: "/shn-patterns" },
        { title: "Short numbers", url: "/short-numbers" },   // 20
      ],
    },
    {
      title: "Logs",
      url: "#",
      icon: Database,
      items: [
        { title: "Audit Logs", url: "/audit-logs" },               // 4
        { title: "MO Interceptor logs", url: "/mo-interceptor-logs" }, // 12
        { title: "MT Interceptor Logs", url: "/mt-interceptor-logs" }, // 14
        { title: "Spams", url: "/spams" },                         // 21
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Category MT", url: "/category-mt" },       // 7
        { title: "Category Statistics", url: "/category-statistics" }, // 8
      ],
    },
    {
      title: "SM",
      url: "#",
      icon: MessageSquare,
      items: [
        { title: "Deliver SM (DLR)", url: "/deliver-sm-dlr" },    // 10
        { title: "Deliver SM (P2A)", url: "/deliver-sm-p2a" },    // 11
        { title: "Submit SM", url: "/submit-sm" },                // 22
        { title: "Submit SM Response", url: "/submit-sm-response" }, // 23
      ],
    },
    {
      title: "System Settings",
      url: "#",
      icon: Settings,
      items: [
        { title: "Groups", url: "/groups" },                // 1 (уже выше, можно заменить на что-то уникальное или убрать дубликат)
        { title: "CDR Settings", url: "/cdr-settings" },    // 5
        { title: "Custom users", url: "/custom-users" },    // 9
        { title: "Sites", url: "/sites" },                  // 25
      ],
    },
    {
      title: "Periodic Tasks",
      url: "#",
      icon: Clock,
      items: [
        {
          title: "Clocked",
          url: "/periodic-tasks/clocked",
        },
        {
          title: "Crontabs",
          url: "/periodic-tasks/crontabs",
        },
        {
          title: "Intervals",
          url: "/periodic-tasks/intervals",
        },
        {
          title: "Periodic tasks",
          url: "/periodic-tasks/periodic-tasks",
        },
        {
          title: "Solar events",
          url: "/periodic-tasks/solar-events",
        },
      ],
    },
    {
      title: "Messages",
      url: "#",
      icon: MessageSquare,
      items: [
        { title: "MO Messages", url: "/mo-messages" },     // 13
        { title: "MT Messages", url: "/mt-messages" },     // 15
      ],
    },
  ]
  
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
