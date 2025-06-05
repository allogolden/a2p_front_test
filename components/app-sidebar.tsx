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
      title: "Groups",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Main",
          url: "/groups/main",
        },
      ],
    },
    {
      title: "AN Patterns",
      url: "/an-patterns",
      icon: Hash,
    },
    {
      title: "Alphanames",
      url: "/alphanames",
      icon: FileText,
    },
    {
      title: "Audit Logs",
      url: "/audit-logs",
      icon: Shield,
    },
    {
      title: "CDR Settings",
      url: "/cdr-settings",
      icon: Settings,
    },
    {
      title: "CTNs",
      url: "/ctns",
      icon: Phone,
    },
    {
      title: "Category MT",
      url: "/category-mt",
      icon: BarChart3,
    },
    {
      title: "Category Statistics",
      url: "/category-statistics",
      icon: BarChart3,
    },
    {
      title: "Custom users",
      url: "/custom-users",
      icon: Users,
    },
    {
      title: "Deliver SM (DLR)",
      url: "/deliver-sm-dlr",
      icon: MessageSquare,
    },
    {
      title: "Deliver SM (P2A)",
      url: "/deliver-sm-p2a",
      icon: MessageSquare,
    },
    {
      title: "MO Interceptor logs",
      url: "/mo-interceptor-logs",
      icon: Database,
    },
    {
      title: "MO Messages",
      url: "/mo-messages",
      icon: MessageSquare,
    },
    {
      title: "MT Interceptor Logs",
      url: "/mt-interceptor-logs",
      icon: Database,
    },
    {
      title: "MT Messages",
      url: "/mt-messages",
      icon: MessageSquare,
    },
    {
      title: "Partners",
      url: "/partners",
      icon: Users,
    },
    {
      title: "Partners Statistics",
      url: "/partners-statistics",
      icon: BarChart3,
    },
    {
      title: "Regex Patterns",
      url: "/regex-patterns",
      icon: Hash,
    },
    {
      title: "SHN Patterns",
      url: "/shn-patterns",
      icon: Hash,
    },
    {
      title: "Short numbers",
      url: "/short-numbers",
      icon: Phone,
    },
    {
      title: "Spams",
      url: "/spams",
      icon: Shield,
    },
    {
      title: "Submit SM",
      url: "/submit-sm",
      icon: MessageSquare,
    },
    {
      title: "Submit SM Response",
      url: "/submit-sm-response",
      icon: MessageSquare,
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
      title: "Sites",
      url: "#",
      icon: Globe,
      items: [
        {
          title: "Sites",
          url: "/sites/sites",
        },
      ],
    },
  ],
}

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
