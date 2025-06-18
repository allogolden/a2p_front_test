"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Database,
  FileText,
  Hash,
  Phone,
  Activity,
  Folder,
  Globe,
  Clock,
  Mail,
} from "lucide-react"

const menuItems = [
  {
    title: "Platform",
    icon: Database,
    children: [
      { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { title: "Partner Settings", href: "/partner-settings", icon: Settings },
      { title: "AI Patterns", href: "/ai-patterns", icon: Activity },
      { title: "CTNs", href: "/ctns", icon: Hash },
      { title: "Partners", href: "/partners", icon: Users },
      { title: "Partner Statistics", href: "/partner-statistics", icon: BarChart3 },
      { title: "SMS Patterns", href: "/sms-patterns", icon: MessageSquare },
      { title: "Short numbers", href: "/short-numbers", icon: Phone },
    ],
  },
  {
    title: "Logs",
    icon: FileText,
    children: [
      { title: "Audit Logs", href: "/audit-logs", icon: FileText },
      { title: "MO Interceptor logs", href: "/mo-interceptor-logs", icon: Activity },
      { title: "MT Interceptor Logs", href: "/mt-interceptor-logs", icon: Activity },
      { title: "Spans", href: "/spans", icon: Activity },
    ],
  },
  {
    title: "Categories",
    icon: Folder,
    children: [
      { title: "Category MT", href: "/reports/category", icon: MessageSquare },
      { title: "Category Statistics", href: "/category-statistics", icon: BarChart3 },
    ],
  },
  {
    title: "SM",
    icon: MessageSquare,
    children: [
      { title: "Deliver SM (DLR)", href: "/deliver-sm-dlr", icon: MessageSquare },
      { title: "Deliver SM (P2A)", href: "/deliver-sm-p2a", icon: MessageSquare },
      { title: "Submit SM", href: "/submit-sm", icon: MessageSquare },
      { title: "Submit SM Response", href: "/submit-sm-response", icon: MessageSquare },
    ],
  },
  {
    title: "System Settings",
    icon: Settings,
    children: [
      { title: "Groups", href: "/groups", icon: Users },
      { title: "CDR Settings", href: "/cdr-settings", icon: Settings },
      { title: "Custom users", href: "/custom-users", icon: Users },
    ],
  },
  {
    title: "Sites",
    icon: Globe,
    children: [{ title: "Regex Patterns", href: "/regex-patterns", icon: Activity }],
  },
  {
    title: "Periodic Tasks",
    icon: Clock,
    children: [
      { title: "Periodic", href: "/periodic", icon: Clock },
      { title: "Crontabs", href: "/crontabs", icon: Clock },
      { title: "Intervals", href: "/intervals", icon: Clock },
      { title: "Periodic tasks", href: "/periodic-tasks", icon: Clock },
      { title: "Solar events", href: "/solar-events", icon: Activity },
    ],
  },
  {
    title: "Messages",
    icon: Mail,
    children: [
      { title: "MO Messages", href: "/mo-messages", icon: Mail },
      { title: "MT Messages", href: "/mt-messages", icon: Mail },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Category Reports", href: "/reports/category", icon: BarChart3 },
      { title: "Partner Reports", href: "/reports/partner", icon: BarChart3 },
      { title: "Alphaname Reports", href: "/reports/alphaname", icon: BarChart3 },
      { title: "Short Number Reports", href: "/reports/short-number", icon: BarChart3 },
      { title: "Status Reports", href: "/reports/status", icon: BarChart3 },
      { title: "Template Reports", href: "/reports/template", icon: BarChart3 },
    ],
  },
]

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Platform", "Reports"])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className="w-64 bg-slate-900 text-white h-screen overflow-y-auto">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold">A2P Platform</h2>
        <p className="text-sm text-slate-400">Enterprise</p>
      </div>

      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isExpanded = expandedItems.includes(item.title)

          return (
            <div key={item.title} className="mb-1">
              <button
                onClick={() => toggleExpanded(item.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon
                    const isActive = pathname === child.href

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                          isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                        )}
                      >
                        <ChildIcon className="w-4 h-4" />
                        <span>{child.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">A</div>
          <div>
            <div>admin</div>
            <div className="text-xs">admin@a2p.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
