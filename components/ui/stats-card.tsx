"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  footer?: React.ReactNode
  iconClassName?: string
}

export function StatsCard({ title, value, icon: Icon, footer, iconClassName }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={iconClassName ?? "h-8 w-8 text-blue-600"} />
        </div>
        {footer && <div className="mt-2 text-xs text-muted-foreground flex items-center">{footer}</div>}
      </CardContent>
    </Card>
  )
}
