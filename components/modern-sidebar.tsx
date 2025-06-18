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
  Home,
  Bell,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const menuItems = [
  {
    title: "Overview",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
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

export function ModernSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Reports"])
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const closeMobile = () => setIsMobileOpen(false)

  const filteredMenuItems = menuItems.filter((item) => {
    if (!searchQuery) return true
    const matchesTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChildren = item.children?.some((child) =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    return matchesTitle || matchesChildren
  })

  return (
    <>
      {/* Mobile menu button */}
      <Button
        onClick={() => setIsMobileOpen(true)}
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50 hover:bg-white"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 h-screen overflow-y-auto transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">SMS Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Enterprise Dashboard</p>
            </div>
            <Button
              onClick={closeMobile}
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.title)
            const hasChildren = item.children && item.children.length > 0

            if (!hasChildren) {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.title}
                  href={item.href || "#"}
                  onClick={closeMobile}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900",
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            }

            return (
              <div key={item.title}>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100/80 hover:text-gray-900 transition-all duration-200"
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
                  <div className="mt-2 ml-8 space-y-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon
                      const isActive = pathname === child.href

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobile}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-100/60 hover:text-gray-900",
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

        {/* Footer */}
        
      </div>
    </>
  )
}
