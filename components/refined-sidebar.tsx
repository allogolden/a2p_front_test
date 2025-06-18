"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
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
  Menu,
  X,
} from "lucide-react"

const menuItems = [
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { title: "Categories", href: "/reports/category", icon: Folder },
      { title: "Partners", href: "/reports/partner", icon: Users },
      { title: "Alphanames", href: "/reports/alphaname", icon: Hash },
      { title: "Short Numbers", href: "/reports/short-number", icon: Phone },
      { title: "Status", href: "/reports/status", icon: Activity },
      { title: "Templates", href: "/reports/template", icon: FileText },
    ],
  },
  {
    title: "Management",
    icon: Settings,
    children: [
      { title: "Partners", href: "/partners", icon: Users },
      { title: "Messages", href: "/messages", icon: MessageSquare },
      { title: "Templates", href: "/templates", icon: FileText },
    ],
  },
  {
    title: "System",
    icon: Database,
    children: [
      { title: "Logs", href: "/logs", icon: Activity },
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function RefinedSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Reports"])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-gray-50/95 backdrop-blur-xl border-r border-gray-200/50 h-screen overflow-y-auto transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={closeMobile}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-gray-200/50">
          <h1 className="text-xl font-semibold text-gray-900">SMS Platform</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.title)

            return (
              <div key={item.title}>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-white/60 hover:text-gray-900 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight
                    className={cn("w-4 h-4 transition-transform duration-200 flex-shrink-0", isExpanded && "rotate-90")}
                  />
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      const isActive = pathname === child.href

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobile}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-blue-500 text-white shadow-sm"
                              : "text-gray-600 hover:bg-white/60 hover:text-gray-900",
                          )}
                        >
                          <ChildIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{child.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}
